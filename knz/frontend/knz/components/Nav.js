import * as React from "react";
import { styled } from "@mui/system";
import { Link } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const Navbar = styled("nav")({
//   color: "white",
//   backgroundColor: "#1C3144",
//   padding: 8,
//   display: "flex",
//   flexGrow: 1,
// });
const Li = styled("li")({
  display: "inline-block",
  marginRight: "1rem",
  color: "white",
  textDecoration: "none",
});

const A = styled("a")({
  display: "inline-block",
  marginRight: "1rem",
  color: "white",
  textDecoration: "none",
});

const Nav = styled("nav")({
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem",
  backgroundColor: "#1C3144",
  color: "ede6e6",
  fontSize: "1.2rem",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontStretch: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "center",
});
// const useStyles = makeStyles({
//   li: {
//     color: "white",
//     textDecoration: "none",
//   },
// });

export default function Navbar() {
  //   const classes = useStyles();
  return (
    <Nav>
      <h1>KNZ Flashcards</h1>
      <ul>
        <Li>
          <Link
            href="/"
            underline="none"
            sx={{
              color: "red",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
          >
            Home
          </Link>
        </Li>
        <Li>
          <Link href="#">
            <A>Flashcards</A>
          </Link>
          <Link href="#" underline="none">
            {'underline="none"'}
          </Link>
        </Li>
      </ul>
    </Nav>
  );
}
