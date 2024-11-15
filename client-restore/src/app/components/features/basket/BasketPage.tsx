/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../../util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addBasketItemAsync, removeBasketItemAsync } from "../../../store/slices/basketSlice";

type Props = {};

export default function BasketPage({}: Props) {
  const {basket} = useAppSelector(state => state.basketReducer);
  const dispatch = useAppDispatch();

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper} sx={{borderRadius: "24px"}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket && basket.basketItems.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                >
                  <TableCell component="th" scope="row">
                    <Box display='flex' alignItems='center'>
                      <img src={`${item.pictureUrl}`} alt={item.name} style={{width: 80, height: 110, marginRight: 20}}></img>
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{currencyFormat(item.price)}</TableCell>
                  <TableCell align="center">
                    <Button 
                      
                      onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} 
                      color="inherit"
                    >
                      <AddCircleIcon />
                    </Button>
                      {item.quantity}
                    <Button 
                      
                      onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1}))}
                      color="inherit" 
                    >
                      <RemoveCircleIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {((item.price / 100) * item.quantity)
                    .toLocaleString("th-TH", {style: "currency",currency: "THB"})}
                  </TableCell>
                  <TableCell align="center">
                    <Button  
                       
                      onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity}))} 
                      color="error"
                    >
                      <RemoveShoppingCartIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Grid container>
          <Grid item xs={12}>
            <BasketSummary />
          </Grid>
        </Grid>
      </TableContainer>
      <Box>
        <Button component={Link}
            to={`/checkout`}
            variant="contained"
            size="small"
            fullWidth
            color="success"
            sx={{borderRadius: "20px"}}
          >
            Checkout
          </Button>
      </Box> 
    </>
  );
}
