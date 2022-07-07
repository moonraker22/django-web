import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import { Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import { useAppContext } from "../context/context";
import Footer from "../components/Footer";
import Flashcards from "../components/Flashcards";
import ClientOnly from "../components/ClientOnly";
import { ALL_CATEGORIES } from "../lib/ApolloQueries";
import { REFRESH_TOKEN } from "../lib/ApolloMutations";
import { useAtom } from "jotai";
import { jotaiState } from "../context/store";
import newApolloClient from "../lib/MyApolloClient";
import { useQuery, useMutation } from "@apollo/client";
import {
  tokenRefresh,
  fetchProtectedData,
  mutateProtectedData,
} from "../lib/auth";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [JWTAccessToken, setJWTAccessToken] = useState("");
  const [JWTRefreshToken, setJWTRefreshToken] = useState("");
  const [JWTTokenExpiry, setJWTTokenExpiry] = useState(false);

  const myContext = useAppContext();
  myContext.setJWTAccesstoken("eeee");
  console.log(myContext);
  const client = newApolloClient();
  let list = [];
  let categories = [];
  if (typeof window !== "undefined") {
    let r_token = localStorage.getItem("JWTRefreshToken");
  }
  // const [func, { res, loading, err }] = useMutation(REFRESH_TOKEN);

  // function tokenRefresh(client) {
  //   console.log("JWTRefreshToken", JWTRefreshToken);

  //   client
  //     .mutate({
  //       mutation: REFRESH_TOKEN,
  //       credentials: "include",
  //       // context: {
  //       //   headers: {
  //       //     Authorization: `JWT ${JWTRefreshToken}`,
  //       //   },
  //       // },
  //       variables: {
  //         refreshToken: `${localStorage.getItem("JWTRefreshToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setJWTAccessToken(res.data.refreshToken.token);
  //       setJWTRefreshToken(res.data.refreshToken.refreshToken);
  //       console.log(res.data.refreshToken.token);
  //       console.log(res.data.refreshToken);
  //       console.log(res.data.refreshToken.refreshToken);
  //       setJWTTokenExpiry(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  useEffect(() => {
    setJWTAccessToken(localStorage.getItem("JWTAccessToken"));
    setJWTRefreshToken(localStorage.getItem("JWTRefreshToken"));
    let token_local = localStorage.getItem("JWTAccessToken");

    const { res, err } = client
      .query({
        query: ALL_CATEGORIES,
        // fetchPolicy: "no-cache",
        credentials: "include",
        context: {
          headers: {
            Authorization: `JWT ${token_local}`,
          },
        },
      })
      .then((res) => {
        console.log(res);
        list = res.data.categoryList;
      })
      .catch((err) => {
        if (
          err.graphQLErrors[0].message === "Signature has expired" ||
          err.message === "Signature has expired"
        ) {
          tokenRefresh(client);

          // func({
          //   credentials: "include",
          //   variables: {
          //     refreshToken: JSON.stringify(r_token),
          //   },
          // });
        }
        console.log(err.message);
      })
      .finally(() => {
        for (let obj in list) {
          let tmp = Object.values(list[obj]);
          categories = [...categories, tmp[1]];
        }
        console.log(categories);
        setCategoryList((state) => [...state, ...categories]);
      });
  }, []);
  const theme = useTheme();
  // useEffect(() => {
  //   if (JWTTokenExpiry) {
  //     client.mutate({
  //       REFRESH_TOKEN,
  //       variables: { refreshToken: JWTRefreshToken },
  //     });
  //     setJWTTokenExpiry(false);
  //   }
  // }, [JWTTokenExpiry]);
  const { response, error } = fetchProtectedData(client, ALL_CATEGORIES);
  console.log(`response: ${response}, error: ${error}`);

  return (
    <div>
      <Header />
      <ClientOnly>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color={theme.palette.primary.main}
          sx={{
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          Flashcards
        </Typography>
        <Flashcards />
      </ClientOnly>
      <Footer />
    </div>
  );
}
