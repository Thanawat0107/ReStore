import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import "./App.css";
import { useState } from "react";
import { Header } from "../components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"
import { Outlet } from "react-router-dom";

function App() {
  const [themeMode, setThemeMode] = useState(false);
  const paletteType = themeMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaeaea" : "#121212",
      },
    },
  });

  const handleTheme = () => {
    setThemeMode(!themeMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header themeMode={themeMode} handleTheme={handleTheme} />
      <Container>
        <Outlet/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
