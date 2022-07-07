import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // cubic bezier
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // quint bezier
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // quint bezier
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // quint bezier
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  palette: {
    textLight: {
      main: "#ceead0",
    },
    textDark: {
      main: "#5b657a",
    },
    primary: {
      main: "#1C3144",
    },
    secondary: {
      main: "#8D909B",
    },
    error: {
      main: "#DF3B57",
    },
    info: {
      main: "#D4F2DB",
    },
    warning: {
      main: "#FFD400",
    },
  },
  backgroundColor: {
    default: "#ede6e6",
  },
  textColor: {
    default: "#333",
  },
  textLight: {
    default: "#ceead0",
  },
  textDark: {
    default: "#5b657a",
  },
  primaryColor: {
    default: "#1C3144",
  },
});

// theme = responsiveFontSizes(theme);

export default theme;
