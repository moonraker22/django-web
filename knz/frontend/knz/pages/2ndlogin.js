import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppContext } from "../context/context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useTheme } from "@mui/styles";
import useSWR from "swr";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { Alert, AlertTitle } from "@mui/material";
import ErrorAlert from "../components/ErrorAlert";
import styles from "./login2.module.css";
import { setContext } from "@apollo/client/link/context";
import { setJwtToken, setRefreshToken } from "../lib/auth";

// import { useAtom } from "jotai";
// import { jotaiState, CSRFToken } from "../context/store";

import ClientOnly from "../components/ClientOnly";
import newApolloClient from "../lib/MyApolloClient";
import { LOGIN } from "../lib/ApolloMutations";
import { useQuery, useMutation } from "@apollo/client";

export default function SignIn(props) {
  const [mutateFunction, { res, loading, err }] = useMutation(LOGIN);

  //   console.log(LOGIN);
  const client = newApolloClient();
  const router = useRouter();
  //   const client = new ApolloClient({
  //     uri: "http://localhost:8000/graphql/",
  //     cache: new InMemoryCache(),
  //     credentials: "include",
  //   });

  //   const { data, error } = useSWR(LOGIN, (url) =>
  //     client.query({ query: LOGIN })
  //   );
  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     const data = new FormData(e.target);
  //     const username = data.get("username");
  //     const password = data.get("password");
  //     // const qry1 = client.mutate({
  //     //   mutation: LOGIN,
  //     //   variables: { username, password },
  //     // });
  //     const [mutateFunction, { res, loading, error }] = useMutation(LOGIN);
  //     if (loading) {
  //       console.log("loading");
  //     }
  //     if (error) {
  //       console.log("error");
  //     }
  //     if (res) {
  //       console.log(res);
  //     }
  //   }
  //   const { Qdata, Qloading, Qerror } = useQuery(ALL_CATEGORIES);
  //   console.log(Qdata);
  //   const [user, setUser] = useAtom(jotaiState);
  //   const [csrfToken, setCsrfToken] = useAtom(CSRFToken);

  //   const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //   const [login, { res, load, err }] = useMutation(LOGIN);

  const theme = useTheme();
  const mycontext = useAppContext();
  //   console.log(mycontext);

  const textInput = useRef();

  const BASE_URL = "http://localhost:8000/flashcards/user/get_csrf";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(BASE_URL, fetcher);
  console.log(data, error);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  //   document.cookie = `MYcsrftoken=${csrfToken}`;
  //   const parent = useRef(document.querySelector("#alert"));

  return (
    <>
      <ClientOnly>
        {/* <Header /> */}
        <Container component="main" maxWidth="xs">
          {/* <div id="alert"></div> */}
          {/* <Alert
            severity="error"
            ref={parent}
            id="alert__error"
            className="alert__remove"
            style={{ display: "none" }}
          ></Alert> */}
          <ErrorAlert error={errorMessage} />
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1C3144" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                setErrorMessage("");
                const data = new FormData(e.target);
                const username = data.get("username");
                const password = data.get("password");
                const { res, err } = client
                  .mutate({
                    mutation: LOGIN,
                    variables: { username, password },
                  })
                  .then((res) => {
                    // console.log(res.data.tokenAuth.payload.username);
                    // console.log(res.data.tokenAuth.token);
                    // console.log(res.data.tokenAuth.refreshToken);
                    document.cookie = `JWT=${res.data.tokenAuth.token}; max-age=60;`;
                    document.cookie = `JWT-refresh-token=${res.data.tokenAuth.refreshToken}; max-age=${res.data.tokenAuth.refreshExpiresIn};`;
                    // document.cookie = `JWT=${res.data.tokenAuth.token}; max-age=60; HttpOnly; SameSite=None;`;
                    // document.cookie = `JWT-refresh-token=${res.data.tokenAuth.refreshToken}; max-age=${res.data.tokenAuth.refreshExpiresIn}; HttpOnly; SameSite=None;`;
                    localStorage.setItem(
                      "JWTAccessToken",
                      res.data.tokenAuth.token
                    );
                    localStorage.setItem(
                      "JWTRefreshToken",
                      res.data.tokenAuth.refreshToken
                    );
                    localStorage.setItem(
                      "username",
                      res.data.tokenAuth.payload.username
                    );
                    // localStorage.setItem("user_id", res.data.login.user_id);
                    localStorage.setItem("isLoggedIn", true);
                    setJwtToken(res.data.tokenAuth.token);
                    setRefreshToken(res.data.tokenAuth.refreshToken);
                    router.push("/");
                    if (res.errors) {
                      console.log("errors");
                    }
                  })
                  .catch((err) => {
                    setErrorMessage(err.message);
                  });
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                autoComplete="current-username"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                autoFocus
                ref={textInput}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.btn__login}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "5px",
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
        <Footer />
      </ClientOnly>
    </>
  );
}
