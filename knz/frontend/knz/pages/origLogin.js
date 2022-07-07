import Container from "@mui/material/Container";
import Header from "../components/Header";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styles from "../styles/login.module.css";
import Divider from "@mui/material/Divider";
import LoginForm from "../components/LoginForm";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppContext } from "../context/context";

export default function Login(props) {
  const [csrfToken, setCsrfToken] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  //   const router = useRouter();
  const BASE_URL = "http://localhost:8000/flashcards/user/get_csrf";

  useEffect(() => {
    axios.get(BASE_URL, {}).then((res) => {
      let csrf = res.headers["x-csrftoken"];
      console.log(csrf);
      setCsrfToken(csrf);
    });
  }, []);

  const mycontext = useAppContext();
  mycontext.setToken(csrfToken);
  // mycontext.setTest(123);
  // console.log(mycontext.token);
  console.log(mycontext.token);
  // console.log(csrfToken);
  // console.log(csrfToken);
  let user = "admin";
  let pass = "admin";
  let email = "admin@admin.com";
  let token = JSON.stringify(csrfToken);
  // const { token, setToken } = useToken();
  // useEffect(() => {
  //   setToken(csrfToken);
  // }, [csrfToken]);
  // console.log(` setToken: ${setToken} TokenContext: ${token}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    // e.preventDefault();
    // props.onSubmit({ email, password });
    // setPassword(password);
    // setUsername(username);
    // const URL = "http://localhost:8000/users/dj-rest-auth/login/";
    // fetch(URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": token,
    //   },
    //   // credentials: "include",
    //   body: JSON.stringify({ username: user, password: pass, email: email }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => {
    //     console.log(error);
    //     throw new Error("Connecting problem");
    //   });

    // axios
    //   .post(URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": mycontext.token,
    //     },
    //     credentials: "include",
    //     body: JSON.stringify({ username: user, password: pass, email: email }),
    //   })

    //   .then((res) => {
    //     console.log(res);
    //     if (!res.status === 200) {
    //       console.log(res.data.message);
    //       throw new Error("Connecting problem");
    // }
    //     console.log(res);
    //     console.log(res.data);
    //     // Router.push('/dashboard');
    // });

    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "ede6e6",
          color: "#333",
          fontSize: "1.2rem",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}
      >
        <h1>Login</h1>
        <Divider />
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: "1rem" }}>
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    // onChange={(e) => setUsername(e.target.value)}
                    // value={username}
                    // helperText={error}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    // onChange={(e) => setPassword(e.target.value)}
                    // value={password}
                    autoFocus
                    // helperText={error}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: "#1C3144", color: "white" }}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}
