import {
  Box,
  Button,
  Grid,
  IconButton,
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
import { useStoreContext } from "../../../context/StoreContext";
import { Apis } from "../../../api/Apis";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../../util/util";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

type Props = {};

export default function BasketPage({}: Props) {
  const {basket, setBasket, removeItem} = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });
  
  const handleAddItem = (productId: number, name: string) => {
    setStatus({loading: true, name});
    Apis.Basket.addItem(productId)
      .then(addItem => setBasket(addItem))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name: ''}));
  }

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    setStatus({loading: true, name});
    Apis.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name: ''}));
  }

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
                      <img src={item.pictureUrl} alt={item.name} style={{width: 80, height: 110, marginRight: 20}}></img>
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{currencyFormat(item.price)}</TableCell>
                  <TableCell align="center">
                    <LoadingButton 
                      loading={status.loading && status.name === 'add' + item.productId} 
                      onClick={() => handleAddItem(item.productId, 'add' + item.productId)} 
                      color="inherit"
                    >
                      <AddCircleIcon />
                    </LoadingButton>
                      {item.quantity}
                    <LoadingButton 
                      loading={status.loading && status.name === 'rem' + item.productId} 
                      onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}
                      color="inherit" 
                    >
                      <RemoveCircleIcon />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="center">
                    {((item.price / 100) * item.quantity)
                    .toLocaleString("th-TH", {style: "currency",currency: "THB"})}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton  
                      loading={status.loading && status.name === 'del' + item.productId} 
                      onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)} 
                      color="error"
                    >
                      <RemoveShoppingCartIcon />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={9} />
        <Grid item xs={3}>
          <BasketSummary />
          <Button component={Link} 
            to="/checkout"
            variant="contained"
            size="small"
            fullWidth
            color="success"
            sx={{borderRadius: "20px"}}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
