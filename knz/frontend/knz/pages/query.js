import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { request, gql, GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:8000/graphql/";
const graphQLClient = new GraphQLClient(endpoint, {});

async function fetchFlashcards() {
  const query = gql`
    query {
      flashcards {
        question
        answer
      }
    }
  `;

  const response = await graphQLClient.request(query);
  return response;
}

export default function Query() {
  //   const endpoint = "http://localhost:8000/graphql/";

  //   const query = gql`
  //     query {
  //       flashcards {
  //         question
  //         answer
  //       }
  //     }
  //   `;

  //   const graphQLClient = new GraphQLClient(endpoint, {});

  function usePosts() {
    return useQuery("flashcards", async () => {
      const { response } = await graphQLClient.request(endpoint, query);
      return data;
    });
  }

  const { status, data, error, isFetching } = fetchFlashcards();
  console.log(status);
  console.log(data);
  console.log(error);
  console.log(isFetching);

  if (isFetching) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("flashcards", {
    query: gql`
      query {
        flashcards {
          question
          answer
        }
      }
    `,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
