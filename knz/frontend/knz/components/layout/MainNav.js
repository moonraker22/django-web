import * as React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, createTheme } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LoginIcon from "@mui/icons-material/VpnKey";
import HomeIcon from "@mui/icons-material/Home";
import RegisterIcon from "@mui/icons-material/ContactMail";
import MenuItem from "@mui/material/MenuItem";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Link from "../../src/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const menuItems = [];

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  };

  const { data: session } = useSession();
  // if (session && session.user) {
  //   console.log(session);
  // }

  const routes = [
    {
      id: 1,
      label: session ? "Home" : "Login",
      path: session ? "/" : "/login",
      icon: session ? HomeIcon : LoginIcon,
    },

    {
      id: 2,
      label: session ? "Login" : "Register",
      path: session ? "/login" : "/register",
      icon: session ? LoginIcon : RegisterIcon,
    },
    {
      id: 3,
      label: "Register",
      path: "/register",
      icon: RegisterIcon,
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: open,
        // })}
        elevation={6}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.textLight.main,
          boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              marginRight: "auto",
              fontWeight: "bold",
            }}
          >
            KNZ Flashcards
          </Typography>

          {session && (
            <>
              <Button
                color="inherit"
                component={Link}
                href="/flashcards"
                sx={{
                  marginLeft: "auto",
                  marginRight: "1rem",
                  display: {
                    xs: "none",
                    sm: "block",
                    lg: "block",
                    xl: "block",
                  },
                }}
              >
                Flashcards
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/logout"
                sx={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  display: {
                    xs: "none",
                    sm: "block",
                    lg: "block",
                    xl: "block",
                  },
                }}
              >
                Snippets
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/logout"
                sx={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  display: {
                    xs: "none",
                    sm: "block",
                    lg: "block",
                    xl: "block",
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
          {!session && (
            <Button
              color="inherit"
              component={Link}
              href="/login"
              sx={{
                marginLeft: "auto",
                marginRight: "1rem",
                display: { xs: "none", sm: "block", lg: "block", xl: "block" },
              }}
            >
              Login
            </Button>
          )}
          {!session && (
            <Button
              color="inherit"
              component={Link}
              href="/register"
              sx={{
                marginLeft: "auto",
                marginRight: "1rem",
                display: { xs: "none", sm: "block", lg: "block", xl: "block" },
              }}
            >
              Register
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map((item, index) => (
            <Link
              href={item.path}
              style={{ textDecoration: "none", color: "black" }}
              key={index}
            >
              <MenuItem selected={activeRoute(item.path, router.pathname)}>
                <ListItem button key={index}>
                  <ListItemIcon>
                    {" "}
                    <item.icon />{" "}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </MenuItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container maxWidth="xl" onClick={handleDrawerClose}>
          {props.mainPage}
        </Container>
      </main>
    </div>
  );
}
