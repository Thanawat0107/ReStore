import { Grid } from "@mui/material";
import { Product } from "../../app/models/productIModel";
import ProductCart from "./ProductCard";

interface Props {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCart product={product}  />
        </Grid>
      ))}
    </Grid>
  );
}
