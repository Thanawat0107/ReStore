import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

// export const pathHome = "/cs66/react/s07/restore";

interface Props {
  themeMode: boolean;
  handleTheme: () => void;
}

const midLinks = [
  { title: "home", path: `/` },
  { title: "product", path: `/catalog` },
  // { title: "about", path: "/about" },
  { title: "contact", path: `/contact` },
];

const rightLinks = [
  { title: "register", path: `/register` },
  { title: "login", path: `/login` },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "ActiveBorder",
  },
};

export default function Header({ themeMode, handleTheme }: Props) {
  const {basket} = useAppSelector(state => state.basketReducer);
  const itemCount = basket?.basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="sticky" sx={{ mb: 4 }} color="warning">
      <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Box sx={{marginRight: '50px;'}}>
          <Typography
            variant="h6"
            component={NavLink}
            to={`/`}
            sx={{ color: "inherit", textDecoration: "none", typography: "h6" }}
          >
            E-COMMERCE
          </Typography>  
        </Box>
      
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{display: "flex", alignItems: "center"}}>
          <Switch checked={themeMode} onChange={handleTheme} />
          <IconButton component={Link} to={`/basket`} size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
