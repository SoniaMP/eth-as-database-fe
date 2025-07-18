import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import "./index.css";
import App from "./App";
import SnackbarProviderWrapper from "./providers/snackbar/SnackbarProvider";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProviderWrapper>
        <App />
      </SnackbarProviderWrapper>
    </ThemeProvider>
  </React.StrictMode>
);
