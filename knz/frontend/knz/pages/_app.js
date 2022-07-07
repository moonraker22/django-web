import "../styles/globals.css";
// import Context from "../context/context";
import { useState, createContext } from "react";
// import { AppWrapper } from "../context/context";
import * as React from "react";
import { AppWrapper } from "../context/context";
import { ThemeProvider } from "@mui/styles";
import theme from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import newApolloClient from "../lib/MyApolloClient";
import MainNav from "../components/layout/MainNav";
import { Provider } from "jotai";
import { store } from "../context/store";
import { StylesProvider, createGenerateClassName } from "@mui/styles";
import { useHydrateAtoms } from "jotai/utils";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const { initialState } = pageProps;
  // useHydrateAtoms(
  //   initialState ? [[store, initialState.prefetchedPostData]] : []
  // );

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const generateClassName = createGenerateClassName({
    productionPrefix: "c",
  });

  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>KNZ Flashcards</title>
        <meta name="description" content="KNZ Flashcards and Snippets" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <SessionProvider session={session}>
        {/* <QueryClientProvider client={queryClient}> */}
        {/* The rest of your application */}

        <StylesProvider generateClassName={generateClassName}>
          {/* <Provider initialValues={initialState && [[store, initialState]]}> */}
          <AppWrapper>
            <CssBaseline />
            <ApolloProvider client={newApolloClient()}>
              {/* <Component {...pageProps} /> */}
              <ThemeProvider theme={theme}>
                <MainNav mainPage={<Component {...pageProps} />} />
              </ThemeProvider>
            </ApolloProvider>
          </AppWrapper>
          {/* </Provider> */}
        </StylesProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider> */}
      </SessionProvider>
    </>
  );
}

export default MyApp;
