import { ThemeOptions } from "@mui/material";

const darkBlue: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#8baabb",
      light: "#a18d09",
      dark: "#0e333f"
    },
    secondary: {
      main: "#d63838"
    },
    error: {
      main: "#c62828"
    },
    background: {
      default: "#838383"
    }
  }
};

const lightBlue: ThemeOptions = {
  palette: {
    mode: "light",
    info: {
      main: "#1e1e1e",
      light: "#204165",
      dark: "#efefef"
    }
  }
};

const BlueTheme = {
  light: lightBlue,
  dark: darkBlue
};

export default BlueTheme;
