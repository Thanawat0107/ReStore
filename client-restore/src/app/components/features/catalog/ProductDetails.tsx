/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../../errors";
import Loading from "../../layout/Loading";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addBasketItemAsync, removeBasketItemAsync } from "../../../store/slices/basketSlice";
import { fetchProductByAsync, productSelecters } from "../../../store/slices/catalogSlice";

type Props = {};

export default function ProductDetails({}: Props) {
  const { basket, status } = useAppSelector(state => state.basketReducer);
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const data = useAppSelector(state => id ? productSelecters.selectById(state, parseInt(id)) : null);
  // const data = useAppSelector(state => productSelecters.selectById(state, parseInt(id!)));
  const {status: productStatus} = useAppSelector(state => state.catalogReducer);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.basketItems.find((i) => i.productId === data?.id);

  useEffect(() => {
    if (!data && id) dispatch(fetchProductByAsync(parseInt(id)));
    
  }, [id, dispatch, data]);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  }

  const handUpdateCart = () => {
    if (!data?.id) return;

    const updateQuantity = item ?  quantity - item.quantity : quantity;

    if (updateQuantity > 0) {
      dispatch(addBasketItemAsync({productId: data.id, quantity: updateQuantity}))
    } 
    else if (updateQuantity < 0)
    {
      dispatch(removeBasketItemAsync({ productId: data.id, quantity: Math.abs(updateQuantity) }));
    }
  }

  if (productStatus.includes('pending')) return <Loading message="Loading product..." />;
  if (!data) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={`${data.pictureUrl}`} alt={data.name} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{data.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4">
          {data.price.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
          })}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{data.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{data.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{data.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{data.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{marginTop: '10px', marginLeft: '260px'}}>
          <Grid item xs={2.8}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={3.4}>
            <LoadingButton
              disabled={item?.quantity === quantity || !item && quantity === 0}
              loading={status.includes('pending')}
              onClick={handUpdateCart}
              sx={{height: '55px'}}
              color='error'
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}