import { Typography, AppBar, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useTheme } from "@mui/styles";
import * as React from "react";
import Paper from "@mui/material/Paper";
import ClientOnly from "../components/ClientOnly";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CardMedia } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  const theme = useTheme();
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: "sm",
              marginTop: "1rem",
              marginBottom: "1rem",
              padding: "1rem",
              height: "50vh",
              width: "50vw",
              borderRadius: "25px",
              backgroundColor: "#1C3144",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom color="white">
              KNZ Flashcards & Snippets
            </Typography>
            <Typography variant="body1" gutterBottom color="white">
              A collection of flashcards and snippets for learning and
              development.
            </Typography>

            <hr />
            <Typography variant="body1" gutterBottom color="white" mb={4}>
              To get started register or login.
            </Typography>

            <Box
              sx={{
                width: "50%",
                height: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.YbRZslqk9JnqCE0FFvPILwHaFj%26pid%3DApi&f=1"
                alt="Code"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  );
}
