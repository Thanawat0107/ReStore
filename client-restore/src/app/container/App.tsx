import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import "./App.css";
import { useState } from "react";
import AllRoutes from "../routes/AllRoutes";
import { Header } from "../components/layout";

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
      <CssBaseline />
      <Header themeMode={themeMode} handleTheme={handleTheme} />
      <Container>
        <AllRoutes/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
