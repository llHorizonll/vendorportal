import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#434656;",
    },
  },
  typography: {
    body1: {
      color: "rgba(0, 0, 0, 0.87)",
    },
    button: {
      textTransform: "none",
    },
  },
});
