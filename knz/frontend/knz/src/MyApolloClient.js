import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

// export default function newApolloClient() {
//   const httpLink = createHttpLink({
//     uri: "http://localhost:8000/graphql/",
//     credentials: "include",
//     // ssrMode: "true",
//   });

//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       console.log("graphQLErrors", graphQLErrors);
//     }
//     if (networkError) {
//       console.log("networkError", networkError);
//     }
//   });

//   // const authLink = setContext((_, { headers }) => {
//   //   // get the authentication token from local storage if it exists
//   //   const token = sessionStorage.getItem("JWT");
//   //   // return the headers to the context so httpLink can read them
//   //   return {
//   //     headers: {
//   //       ...headers,
//   //       Authorization: token ? `JWT ${token}` : "",
//   //     },
//   //   };
//   // });

//   // const errorLink = onError(({ graphQLErrors, networkError }) => {
//   //   if (graphQLErrors)
//   //     graphQLErrors.forEach(({ message, locations, path }) =>
//   //       console.log(
//   //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//   //       )
//   //     );

//   //   if (networkError) console.log(`[Network error]: ${networkError}`);
//   // });

//   // const errorLink = onError(({ graphQLErrors, networkError }) => {
//   //   try {
//   //     if (graphQLErrors) {
//   //       graphQLErrors.map(({ message, locations, path }) =>
//   //         console.error(
//   //           `Graphql Error: ${message}, Locaiton: ${locations}, path: ${path}`
//   //         )
//   //       );
//   //     }
//   //     if (networkError) {
//   //       console.log(networkError.message);
//   //     }
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
//   // });
//   // const middlewareLink = setContext(() => ({
//   //   headers: {
//   //     "x-token": localStorage.getItem("token"),
//   //     "x-refresh-token": localStorage.getItem("refresh-token"),
//   //   },
//   // }));

//   // const afterwareLink = new ApolloLink((operation, forward) => {
//   //   const { headers } = operation.getContext();
//   //   if (headers) {
//   //     const token = headers.get("x-token");
//   //     const refreshToken = headers.get("x-refresh-token");
//   //     if (token) {
//   //       localStorage.setItem("token", token);
//   //     }
//   //     if (refreshToken) {
//   //       localStorage.setItem("refresh-token", refreshToken);
//   //     }
//   //   }
//   //   return forward(operation);
//   // });

//   // const authLink = setContext((_, { headers }) => {
//   //   // get the authentication token from local storage if it exists
//   //   const token = localStorage.getItem("token");
//   //   // return the headers to the context so httpLink can read them
//   //   return {
//   //     headers: {
//   //       ...headers,
//   //       authorization: token ? `Bearer ${token}` : "",
//   //     },
//   //   };
//   // });

//   const client = new ApolloClient({
//     link: from([errorLink, httpLink]),
//     cache: new InMemoryCache(),
//     credentials: "include",
//     connectToDevTools: true,
//     defaultOptions: {
//       watchQuery: {
//         // fetchPolicy: "cache-and-network",
//         errorPolicy: "all",
//       },
//       query: {
//         // fetchPolicy: "network-only",
//         errorPolicy: "all",
//       },
//       mutate: {
//         errorPolicy: "all",
//       },
//     },
//   });
//   return client;
// }

import { useMemo } from "react";
// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

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

function newApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    credentials: "include",
    connectToDevTools: true,
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

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? newApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
