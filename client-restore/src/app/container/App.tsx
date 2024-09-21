import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "../components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"
import { Outlet } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import { Apis } from "../api/Apis";
import Loading from "../components/layout/Loading";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      Apis.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

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

  if(loading) return <Loading message="Initialising app..." />
  

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
