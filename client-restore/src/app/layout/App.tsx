import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";

function App() {
  const [themeMode, setThemeMode] = useState(false);
  const paletteType = themeMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaeaea' : '#000'
      }
    }
  });

  const handleTheme = () => {
    setThemeMode(!themeMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header themeMode={themeMode} handleTheme={handleTheme}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
