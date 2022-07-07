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
import styles from "../styles/login2.module.css";
import { setContext } from "@apollo/client/link/context";
import { setJwtToken, setRefreshToken } from "../lib/auth";
// import { providers, signIn, getSession,  } from "next-auth/client";
import { getProviders, signIn, useSession, getSession } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import ClientOnly from "../components/ClientOnly";
import newApolloClient from "../lib/MyApolloClient";
import { LOGIN } from "../lib/ApolloMutations";
import { useQuery, useMutation } from "@apollo/client";

export default function SignIn(providers) {
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const theme = useTheme();
  const textInput = useRef();
  const router = useRouter();
  console.log(providers);
  const githubSignin = providers.providers.github.signinUrl;
  console.log(githubSignin);

  return (
    <Container component="main" maxWidth="xs">
      <ErrorAlert error={error} />
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            id="email"
            autoComplete="current-email"
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

          {Object.values(providers.providers).map((provider) => (
            <div key={provider.name}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.btn__login}
                onClick={() => {
                  // signIn("github", {
                  //   callbackUrl: "http://localhost:3000/flashcards",
                  // });
                  signIn(provider.name, {
                    callbackUrl: "http://localhost:3000/flashcards",
                  });
                }}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "5px",
                  boxShadow: 2,
                }}
              >
                {provider.name === "GitHub" && (
                  <GitHubIcon style={{ marginRight: "10px" }} />
                )}
                Sign In with {provider.name}
              </Button>
            </div>
          ))}
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
    </Container>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const { req } = context;
  const session = await getSession({ req });

  // const csrfToken = await csrfToken(context);

  // if (session) {
  //   return {
  //     redirect: { destination: "/flashcards" },
  //   };
  // }
  return {
    props: { providers, session },
  };
}
