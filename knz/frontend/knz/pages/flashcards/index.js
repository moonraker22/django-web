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
import { initializeApollo, addApolloState } from "../../src/MyApolloClient";
import {
  useQuery,
  useMutation,
  useLazyQuery,
  NetworkStatus,
} from "@apollo/client";
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
  ALL_FLASHCARDS_PAGINATE,
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
import newApolloClient from "../../lib/MyApolloClient";
import sortByDeck from "../../utils/sortByDeck";
import paginateDecks from "../../utils/paginateDecks";
import Pagination from "@mui/material/Pagination";
import NoteIcon from "@mui/icons-material/Note";
import Badge from "@mui/material/Badge";
import TopLinks from "../../components/TopLinks";
import Title from "../../components/Title";

export default function Index(props) {
  const decks = React.useCallback(
    sortByDeck(props.res.data.frontendUserFlashcards),
    [props.res.data.frontendUserFlashcards]
  );
  const totalPages = Math.ceil(decks.length / 6);
  const paginate = paginateDecks(decks, 1, 6);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(totalPages);
  const [decksOnPage, setDecksOnPage] = React.useState(paginate);

  const handlePageChange = (event, value) => {
    setPage(value);
    setDecksOnPage(paginateDecks(decks, value, 6));
  };
  console.log(paginate);

  console.log(page);
  console.log(pages);
  console.log(decksOnPage);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {}, []);
  // const test = props.testData.data.allFlashcardsPaginate;
  // console.log(props.testData);
  // console.log(test);
  // console.log(decks);
  //   console.log(theme);
  //   console.log(decks);
  //   console.log(NetworkStatus);

  // console.log(props);
  //   const { data: session, status } = useSession();
  const session = props.session;

  //   if (status === "authenticated") {
  //     const email = session?.user.email;
  //   }
  const [getData, { data, loading, error, fetchMore, networkStatus }] =
    useLazyQuery(FRONTEND_FLASHCARDS, {
      variables: { email: session?.user.email || null },
      notifyOnNetworkStatusChange: true,
      options: {},
    });
  useEffect(() => {
    if (session) {
      getData();
    }
  }, [session]);

  const handleClickDeck = (deck) => {
    router.push(`/flashcards/deck/${deck}`);
  };
  //   const loadingMore = networkStatus === NetworkStatus.fetchMore;
  //   console.log(loadingMore);
  //   console.log("Data", data);
  //   if (data) {
  //     const { frontendUserFlashcards } = data;
  //     console.log(frontendUserFlashcards);
  //   }
  //   if (status !== "authenticated") {
  //     return (
  //       <>
  //         <h1>Status...</h1>
  //       </>
  //     );
  //   }

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box component="main">
          <Title />
          <TopLinks
            number="3"
            buttonTitles={["create a new deck", "edit a deck", "delete a deck"]}
            title="Your Decks"
          />
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justify="center"
          alignItems="center"
          sx={{ justifyContent: "center" }}
        >
          {decksOnPage.map((flashcards, index) => (
            <Grid item key={index}>
              <Card>
                <CardMedia
                  component="img"
                  src={props.userData.data.userFrontend.avatarUrl}
                  title={flashcards.deck}
                  sx={{
                    height: 150,
                    width: 250,
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    {flashcards.deck}
                  </Typography>
                  <Box component="div" display="flex" justifyContent="center">
                    <Badge
                      badgeContent={flashcards.cards.length}
                      sx={{
                        color: theme.palette.primary.main,
                        marginRight: "auto",
                      }}
                    >
                      <NoteIcon fontSize="medium" />
                    </Badge>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {flashcards.cards.length} Cards
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    sx={{ marginRight: "auto" }}
                    onClick={() => handleClickDeck(flashcards.deck)}
                  >
                    Open Deck
                  </Button>
                  <Button size="small" color="primary">
                    Create More
                  </Button>
                  {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          mt={8}
          sx={{ textAlign: "center", alignItems: "center", mx: "auto" }}
        >
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={pages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              size="small"
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const client = initializeApollo();

  const user = session.user;
  //   console.log(session);

  const { res, err } = await client
    .query({
      query: FRONTEND_FLASHCARDS,
      variables: {
        email: user.email,
      },
    })
    .then((res) => {
      //   console.log(res);
      return { res, err: null };
    })
    .catch((err) => {
      console.log(err);
      return { res: null, err };
    });

  const { userData } = await client
    .query({
      query: USER_DATA_BY_EMAIL,
      variables: {
        email: user.email,
      },
    })
    .then((userData) => {
      //   console.log(userData);
      return { userData: userData, err: null };
    })
    .catch((err) => {
      console.log(err);
      return { userData: null, err };
    });

  //   console.log(client.cache.data);
  // const { testData } = await client
  //   .query({
  //     query: ALL_FLASHCARDS_PAGINATE,
  //     variables: {
  //       email: user.email,
  //       first: 1,
  //     },
  //   })
  //   .then((testData) => {
  //     //   console.log(userData);
  //     return { testData: testData, err: null };
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return { testData: null, err };
  //   });

  return addApolloState(client, {
    props: {
      session: await getSession(ctx),
      res,
      userData,
    },
  });
}
