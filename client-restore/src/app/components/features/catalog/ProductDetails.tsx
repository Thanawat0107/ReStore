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
import { Product } from "../../../models/productIModel";
import { Apis } from "../../../api/Apis";
import { NotFound } from "../../../errors";
import Loading from "../../layout/Loading";
import { useStoreContext } from "../../../context/StoreContext";
import { LoadingButton } from "@mui/lab";

type Props = {};

export default function ProductDetails({}: Props) {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = data ? basket?.basketItems.find((i) => i.productId === data.id) : null;

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    id && Apis.Catalog.details(parseInt(id))
        .then((response) => setData(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (value >= 0) {
      setQuantity(value);
    }
  }

  const handUpdateCart = () => {
    if (!data?.id) return; // ถ้าไม่มี data หรือ id ให้หยุดการทำงาน
    
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updateQuantity = item ?  quantity - item.quantity : quantity;
      Apis.Basket.addItem(data.id, updateQuantity)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false));
    } 
    else 
    {
      const updateQuantity = item.quantity - quantity;
      Apis.Basket.removeItem(data.id, updateQuantity)
      .then(() => removeItem(data.id, updateQuantity))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false));
    }
  }

  if (loading) return <Loading message="Loading product..." />;
  if (!data) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={data.pictureUrl} alt={data.name} style={{ width: "100%" }} />
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
              loading={submitting}
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