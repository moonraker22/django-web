import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    me {
      username
    }
  }
`;

export const ALL_CATEGORIES = gql`
  query {
    categoryList {
      name
    }
  }
`;

export const USER_FRONTEND = gql`
  query userFrontend($email: String!) {
    userFrontend(email: $email) {
      id
      name
      email
      avatarUrl
    }
  }
`;

export const USER_FRONTEND_SNIPPETS = gql`
  query userFrontend($email: String!) {
    userFrontendSnippets(email: $email) {
      name
      email
      avatarUrl
      userFrontendSnippets {
        edges {
          node {
            snippet
            created
            modified
            category {
              name
            }
          }
        }
      }
    }
  }
`;

export const USER_FRONTEND_FLASHCARDS = gql`
  query frontendUserFlashcards($email: String!) {
    frontendUserFlashcards(email: $email) {
      deck
      question
      answer
      category {
        name
      }
    }
  }
`;

export const USER_FRONTEND_FLASHCARDS_BY_EMAIL = gql`
  query allFlashcards($email: String!) {
    allFlashcards(userFrontend_Email: $email, first: 25) {
      edges {
        node {
          id
          deck {
            name
          }
          question
          answer
          category {
            name
          }
          created
          modified
        }
      }
    }
  }
`;

export const USER_FRONTEND_SNIPPETS_BY_EMAIL = gql`
  query allSnippets($email: String!) {
    allSnippets(userFrontend_Email: $email, first: 25) {
      edges {
        node {
          snippet
          published
          created
          modified
          category {
            name
          }
        }
      }
    }
  }
`;

export const ALL_FLASHCARDS = gql`
  query {
    flashcards {
      question
      answer
    }
  }
`;

export const FRONTEND_FLASHCARDS = gql`
  query frontendUserFlashcards($email: String!) {
    frontendUserFlashcards(email: $email) {
      deck {
        name
      }
      question
      answer
      category {
        name
      }
    }
  }
`;

export const USER_DATA_BY_EMAIL = gql`
  query userFrontend($email: String!) {
    userFrontend(email: $email) {
      email
      avatarUrl
      name
      userFrontendSnippets(first: 25) {
        edges {
          node {
            snippet
            created
            modified
            category {
              name
            }
          }
          cursor
        }
      }
      userFrontendFlashcards(first: 25) {
        edges {
          node {
            deck {
              name
            }
            question
            answer
            published
            created
            modified
            category {
              name
            }
          }
          cursor
        }
      }
    }
  }
`;

export const FRONTEND_FLASHCARDS_BY_DECK = gql`
  query frontendFlashcardsByDeck($deck: String!, $email: String!) {
    frontendFlashcardsByDeck(deck: $deck, email: $email) {
      question
      answer
      category {
        name
      }
    }
  }
`;

export const ALL_FLASHCARDS_PAGINATE = gql`
  query allFlashcardsPaginate(
    $email: String
    $first: Int
    $after: String
    $before: String
  ) {
    allFlashcardsPaginate(
      userFrontend_Email: $email
      first: $first
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          published
          deck {
            name
          }
          question
          answer
          created
          modified
          userFrontend {
            id
            name
            email
          }
        }
        cursor
      }
    }
  }
`;
