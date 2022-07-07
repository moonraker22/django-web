import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../context/context";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.error) {
      setError(props.error);
    }
  }, [props.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // props.onSubmit({ email, password });
    setPassword(password);
    setUsername(username);
    axios
      .get("http://localhost:8000/flashcards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const myContext = useToken();
  console.log(myContext);
  return (
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
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.email}
                // error={errors.email && touched.email}
                // helperText={errors.email}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoFocus
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.password}
                // error={errors.password && touched.password}
                // helperText={errors.password}
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#1C3144", color: "white" }}
                // color="primary"
                // disabled={!values.email || !values.password}
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
