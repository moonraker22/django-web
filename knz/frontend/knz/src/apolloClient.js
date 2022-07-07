import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const isServer = typeof window === "undefined";
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

export default function newApolloClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql/",
    credentials: "include",
    // ssrMode: "true",
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log("graphQLErrors", graphQLErrors);
    }
    if (networkError) {
      console.log("networkError", networkError);
    }
  });

  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache().restore(windowApolloState || {}),
    // cache: new InMemoryCache(),
    ssrMode: isServer,
    // credentials: "include",
    defaultOptions: {
      watchQuery: {
        // fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
      query: {
        // fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
}
