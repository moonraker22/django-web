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
import newApolloClient from "../../lib/MyApolloClient";
import { useQuery, useMutation } from "@apollo/client";
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
  USER_DATA_BY_EMAIL,
  FLASHCARDS_BY_EMAIL,
} from "../../lib/ApolloQueries";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

export default function Flashcards(props) {
  //   const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [flashcards, setFlashcards] = useState({});
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const userData = props.userData.data.userFrontend;
  console.log(userData);
  const { data: session, status } = useSession();
  //   console.log(res.res.data.allFlashcards.edges);
  console.log(session);
  console.log(props.userData);
  // const client = newApolloClient();
  // const { flashcardsData, flashcardsError } = client
  //   .query({
  //     query: FLASHCARDS_BY_EMAIL,
  //     variables: {
  //       email: session.user.email,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     // setFlashcards(res.data.flashcardsByEmail);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // console.log(flashcardsData);
  // console.log(client.cache);

  //   console.log(flashcards);
  //   if (status === "authenticated") {
  //     console.log(session.user.email);
  //     setUser(session?.user);
  //     setEmail(session?.user?.email);
  //   }
  //   const { loading, error, data } = useQuery(USER_FRONTEND_FLASHCARDS, {
  //     email: email,
  //   });

  //   if (loading) {
  //     console.log("loading");
  //   } else if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(data);
  //     // setFlashcards(data.userFrontendFlashcards.edges);
  //   }

  useEffect(() => {
    setUser(session?.username);
  }, []);

  if (status === "authenticated" || status === "loading") {
    return (
      <Box className={styles.background} component="main">
        <Typography
          variant="h2"
          component="h1"
          display="block"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {" "}
          <DashboardCustomizeIcon fontSize="large" /> Flashcards
        </Typography>
        <Divider>
          <Avatar src={userData.avatarUrl} />
        </Divider>
        <Divider sx={{ marginBottom: 4 }}>Your Flashcards</Divider>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {props.res.data.allFlashcards.edges.map((flashcards) => (
            <Grid item key={flashcards.node.id}>
              <Card>
                <CardMedia
                  component="img"
                  className={styles.media}
                  src={userData.avatarUrl}
                  title={flashcards.deck}
                  sx={{
                    height: 150,
                    width: 250,
                  }}
                />
                <CardContent>
                  <Divider>category</Divider>
                  <Typography gutterBottom variant="h5" component="h2">
                    Category: {flashcards.node.category.name}
                  </Typography>

                  <hr />
                  <Typography gutterBottom variant="h5" component="h2">
                    Question:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {flashcards.node.question}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    sx={{ marginRight: "auto" }}
                  >
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Flip Card
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
      </Box>
    );
  } else {
    router.push("/login");
  }
}

export async function getServerSideProps(ctx) {
  // const httpLink = createHttpLink({
  //   uri: "http://localhost:8000/graphql/",
  //   credentials: "include",
  //   // ssrMode: "true",
  // });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors) {
  //     console.log("graphQLErrors", graphQLErrors);
  //   }
  //   if (networkError) {
  //     console.log("networkError", networkError);
  //   }
  // });

  // const client = new ApolloClient({
  //   link: from([errorLink, httpLink]),
  //   cache: new InMemoryCache(),
  //   credentials: "include",
  //   ssrMode: true,
  //   defaultOptions: {
  //     watchQuery: {
  //       // fetchPolicy: "cache-and-network",
  //       errorPolicy: "all",
  //     },
  //     query: {
  //       // fetchPolicy: "network-only",
  //       errorPolicy: "all",
  //     },
  //     mutate: {
  //       errorPolicy: "all",
  //     },
  //   },
  // });
  const client = newApolloClient();

  const session = await getSession(ctx);
  const user = session.user;

  const { res, err } = await client
    .query({
      query: USER_FRONTEND_FLASHCARDS_BY_EMAIL,
      variables: {
        userFrontend_Email: user.email,
      },
    })
    .then((res) => {
      console.log(res);
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
      console.log(userData);
      return { userData: userData, err: null };
    })
    .catch((err) => {
      console.log(err);
      return { userData: null, err };
    });

  console.log(client.cache.data);

  return {
    props: {
      session: await getSession(ctx),
      res,
      userData,
    },
  };
}

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
// async function getSession() {
//   const { data: session, status } = useSession();
//     if (status === "authenticated" || status === "loading") {
//         return session;
//         } else {
//         return null;
//         }
// }
