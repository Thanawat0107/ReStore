import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../../models/productIModel";

interface Props {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader avatar={
        <Avatar>
          {product.name.charAt(0).toUpperCase()}
        </Avatar>
      }
      title={product.name}
      titleTypographyProps={{sx: {fontWeight: 'bold', color: 'primary.main'}}}
    />  
    <CardActionArea>
      <CardMedia 
        sx={{height: 140, backgroundSize: 'contain', backgroundColor: '#cfd8dc'}} 
        image={product.pictureUrl} 
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
        ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Add to Cart
      </Button>
    </CardActions>
  </Card>
  );
}
