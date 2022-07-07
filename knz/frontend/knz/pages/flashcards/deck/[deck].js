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
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { initializeApollo, addApolloState } from "../../../src/MyApolloClient";
import {
  useQuery,
  useMutation,
  useLazyQuery,
  NetworkStatus,
} from "@apollo/client";
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
  FRONTEND_FLASHCARDS_BY_DECK,
} from "../../../src/ApolloQueries";
import { useAppContext } from "../../../context/context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";
import useApollo from "../../../src/useApollo";
import newApolloClient from "../../../lib/MyApolloClient";
import { default as MUILink } from "@mui/material/Link";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import NoteIcon from "@mui/icons-material/Note";
import Badge from "@mui/material/Badge";
import TopLinks from "../../../components/TopLinks";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Title from "../../../components/Title";
import sortByDeck from "../../../utils/sortByDeck";
import paginateDecks from "../../../utils/paginateDecks";

const Deck = (props) => {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(totalPages);
  const [decksOnPage, setDecksOnPage] = React.useState(paginate);

  const handlePageChange = (event, value) => {
    setPage(value);
    setDecksOnPage(paginateDecks(data.frontendFlashcardsByDeck, value, 6));
  };

  const session = useSession();
  const router = useRouter();
  const { deck } = router.query;
  const avatar = deck.charAt(0).toUpperCase();
  console.log(deck);
  console.log(props);
  const [getData, { data, loading, error, fetchMore, networkStatus }] =
    useLazyQuery(FRONTEND_FLASHCARDS_BY_DECK, {});
  const [getUserData, { data: userData, loading: isLoading, error: err }] =
    useLazyQuery(USER_DATA_BY_EMAIL, {});

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    if (session) {
      getData({
        variables: { email: session?.data.email, deck: deck },
      });
      getUserData({
        variables: { email: session?.data.email },
      });
    }
  }, [session]);

  const paginate = {};
  const totalPages = 1;
  React.useEffect(() => {
    if (data?.frontendFlashcardsByDeck) {
      paginate = paginateDecks(data.frontendFlashcardsByDeck, 1, 6);
      console.log(paginate);
      totalPages = Math.ceil(data.frontendFlashcardsByDeck.length / 6);
      console.log(totalPages);
      // setPages(totalPages);
      // setDecksOnPage(paginate);
    }
  }),
    [];

  console.log(pages);
  console.log(page);
  console.log(decksOnPage);

  return (
    <>
      <Container maxWidth="lg">
        <Box component="main">
          <Title />

          <TopLinks
            number="3"
            buttonTitles={["create a deck", "edit a deck", "delete a deck"]}
            title={`${deck} Deck`}
          />
        </Box>
        {data && userData ? (
          <>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justify="center"
              alignItems="center"
              sx={{ justifyContent: "center" }}
            >
              {data.frontendFlashcardsByDeck.map((flashcards, index) => (
                <Grid item key={index}>
                  <Card>
                    <CardHeader
                      avatar={<Avatar aria-label="header">{avatar}</Avatar>}
                      title={`${deck}`}
                      subheader="Your Question"
                    />
                    <Divider />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        align="center"
                        sx={{
                          marginBottom: 1,
                        }}
                      >
                        {flashcards.question}
                      </Typography>
                      <Divider>Answer</Divider>
                      <Box
                        component="div"
                        display="flex"
                        justifyContent="center"
                      >
                        <textarea rows="4"></textarea>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        sx={{ marginRight: "auto" }}
                        onClick={handleExpandClick}
                        // disabled="true"
                      >
                        {"Open Answers ->"}
                      </Button>

                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                        >
                          {flashcards.answer}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box
              mt={8}
              sx={{ textAlign: "center", alignItems: "center", mx: "auto" }}
            >
              <Stack spacing={2} alignItems="center" mb={3}>
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
              <Link href="/flashcards">Back To All Flashcards</Link>
            </Box>
          </>
        ) : (
          <>
            <h1>...Loading...</h1>
          </>
        )}
      </Container>
    </>
  );
};

export default Deck;

export async function getServerSideProps(ctx) {
  const { deck } = ctx.query;

  return {
    props: {
      deck,
    },
  };
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
