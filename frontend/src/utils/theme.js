import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#102332",
      main: "#2d4b65",
    },
    secondary: {
      main: "#ff6d02",
      contrastText: "#FFF",
    },
    background: {
      default: "#FFF",
    },
  },
});

export default theme;