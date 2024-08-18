import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../../models/productIModel";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card sx={{borderRadius: '20px;' }}>
      <CardActionArea component={Link} to={`/catalog/${product.id}`}>
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
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
          <Typography gutterBottom variant="h6">
            ${(product.price / 100).toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ padding: '20px;'}}>
      <Button variant="contained" color="error" size="small">
        Add to cart
      </Button>
      </CardActions>
    </Card>
  );
}
