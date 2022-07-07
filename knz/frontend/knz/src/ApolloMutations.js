import { gql } from "@apollo/client";

export const CREATE_SNIPPET = gql`
  mutation createSnippet(
    $snippet: String!
    $published: Boolean!
    $category: String!
  ) {
    snippetsCreateMutation(
      snippet: $snippet
      published: $published
      category: $category
    ) {
      __typename
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshToken
      refreshExpiresIn
    }
  }
`;

export const AUTH_USER = gql`
  query authUser($username: String!, $password: String!) {
    singleUser(username: $username, password: $password) {
      username
      id
      email
    }
  }
`;

// export const REFRESH_TOKEN = gql`
//   mutation refreshToken($refreshToken: String!) {
//     refreshToken(refreshToken: $refreshToken) {
//       payload
//       token
//       refreshToken
//       refreshExpiresIn
//     }
//   }
// `;

export const VERIFY_TOKEN = gql`
  #   mutation verifyToken($token: String!) {
  #     verifyToken(token: $token) {
  #       payload
  #     }
  #   }
  mutation {
    verifyToken {
      payload
    }
  }
`;

export const REFRESH_COOKIE_TOKEN = gql`
  mutation {
    refreshToken {
      token
    }
  }
`;

export const NEW_USER = gql`
  mutation newUser(
    $name: String!
    $password: String!
    $email: String!
    $avatarUrl: String!
  ) {
    newUserMutation(
      name: $name
      email: $email
      password: $password
      avatarUrl: $avatarUrl
    ) {
      __typename
    }
  }
`;
