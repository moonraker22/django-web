import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { initializeApollo } from "../../src/MyApolloClient";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import styles from "./index.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  USER_FRONTEND_FLASHCARDS,
  USER_FRONTEND_FLASHCARDS_BY_EMAIL,
  FRONTEND_FLASHCARDS,
  USER_DATA_BY_EMAIL,
  FLASHCARDS_BY_EMAIL,
  ALL_FLASHCARDS,
} from "../../src/ApolloQueries";
import { useAppContext } from "../../context/context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";
import useApollo from "../../src/useApollo";

export default function Test(props) {
  const [cards, setCards] = useState();
  const { data: session, status } = useSession();

  //   const [email, setEmail] = useState("");
  //   const [loading, setLoading] = useState(true);
  const client = initializeApollo();
  const mycontext = useAppContext();

  //   console.log(mycontext);
  //   const { data: session, status } = useSession();

  //   const useData = useApollo("query", ALL_FLASHCARDS);
  //   useData.then((res) => console.log(res));
  //   async function query(session) {
  // const res = await client.query({
  //   query: USER_FRONTEND_FLASHCARDS_BY_EMAIL,
  //   variables: { email: session.user.email },
  // });
  // console.log("ASYNC=====" + res);

  // const { data, loading, error } = useQuery(
  //   USER_FRONTEND_FLASHCARDS_BY_EMAIL,
  //   {
  //     variables: { email: session.user.email },
  //   }
  // );
  //     return res;
  //   }
  //
  //   if (status === "authenticated") {
  //     const data = query();
  //     // setLoading(false);
  //   }
  const email = session?.user.email;
  const [getData, { data, loading, error }] = useLazyQuery(
    FRONTEND_FLASHCARDS,
    {
      variables: { email: email },
      options: {
        connectToDevTools: true,
      },
    }
  );

  //   console.log(session);
  useEffect(() => {
    if (session) {
      getData();

      client
        .query({
          query: USER_FRONTEND_FLASHCARDS_BY_EMAIL,
          variables: { email: session?.user.email },
        })
        .then((res) => {
          console.log(res);
          setCards(res.data.userFrontendFlashcardsByEmail);
        });

      console.log(cards);
    }
  }, [session]);

  //   useEffect(() => {
  //     if (data) {
  //       setCards(data.data);

  //       console.log("DATA" + JSON.stringify(data));
  //     }

  //     return () => {
  //       console.log("UNMOUNT");
  //     };
  //   }, [data]);
  console.log(data);
  if (loading) {
    return (
      <div>
        <Skeleton variant="rect" width="100%" height={200} />
      </div>
    );
  }
  if (data) {
    // setCards(data.data);

    return (
      <div>
        <h1>{JSON.stringify(data)}</h1>
        {/* {data.flashcards.map((card, index) => (
          <div key={index}>
            {console.log(index)}

            <h1>{card.question}</h1>
            <h2>{card.answer}</h2>
          </div>
        ))} */}
      </div>
    );
  }

  return (
    <div>
      <h1>Test</h1>
      <button onClick={() => getData()}>Get Data</button>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <p>{JSON.stringify(loading)}</p>
      <p>{JSON.stringify(error)}</p>
      <p>{JSON.stringify(cards)}</p>
    </div>
  );
}
