import useSWR from "swr";
import { useAppContext } from "../context/context";
import * as React from "react";
import { useTheme } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Flashcards() {
  // const myContext = useToken();
  // console.log(myContext);

  const URL = "http://localhost:8000/auth-token/";
  const theme = useTheme();
  // const mycontext = useAppContext();
  // mycontext.setUser("admin");
  // console.log(mycontext);
  // axios
  //   .post(URL, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     params: JSON.stringify({ username: "admin", password: "admin" }),
  //     body: JSON.stringify({ username: "admin", password: "admin" }),
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const { data, error } = useSWR("http://localhost:8000/flashcards", fetcher);
  // console.log(data, error);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box sx={{ color: theme.textDark.default }}>
      {data.map((item) => (
        <div key={item.id}>
          <Typography variant="h4">{item.deck}</Typography>
          <Typography variant="h6">{item.question}</Typography>
          <Typography variant="h6">{item.answer}</Typography>
          <Typography variant="h6">{item.catagory}</Typography>
        </div>
      ))}
    </Box>
  );
}
