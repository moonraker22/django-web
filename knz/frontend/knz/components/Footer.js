import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="#fff">
      {"Copyright © "}
      <Link color="#fff" href="/">
        KNZ Flashcards
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "25vh",
        textAlign: "center",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            // theme.palette.mode === "light"
            //   ? theme.palette.grey[200]
            //   : theme.palette.grey[800],
            theme.palette.primary.main,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            // variant="body1"
            // sx={{ color: (theme) => theme.palette.textLight.main }}
            // color={(theme) => theme.palette.info.main}
            color="white"
          >
            {/* My sticky footer can be found here. */}
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
