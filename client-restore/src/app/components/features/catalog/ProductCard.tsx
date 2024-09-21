import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Product } from "../../../models/productIModel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Apis } from "../../../api/Apis";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../../context/StoreContext";
import { currencyFormat } from "../../../util/util";


interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    Apis.Basket.addItem(productId)
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }
  
  return (
    <Card
      sx={{ borderRadius: "20px;", width: 320, maxWidth: "100%", boxShadow: 3 }}
    >
      <CardActionArea component={Link} to={`/catalog/${product.id}`}>
        <CardMedia
          sx={{
            height: 200,
            backgroundColor: "#cfd8dc",
          }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
              {currencyFormat(product.price)}
            </Typography>
            <Chip
              label="Lowest price"
              size="small"
              color="success"
              variant="outlined"
            />
          </Box>
          {/* <Typography gutterBottom variant="h6">
            ${(product.price / 100).toFixed(2)}
            {product.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
          </Typography> */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            (Only <b>{product.quantityInStock}</b> left in stock!)
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions sx={{ padding: '20px;'}}>
        <Button variant="contained" color="error" fullWidth sx={{ fontWeight: 'bold' }}>
          Add to cart
        </Button>
      </CardActions> */}
      <Box>
        <LoadingButton 
          loading={loading}
          onClick={() => handleAddItem(product.id)} 
          variant="contained" color="error" fullWidth size="large">
            Add to cart
        </LoadingButton>
      </Box>
    </Card>
  );  
}
