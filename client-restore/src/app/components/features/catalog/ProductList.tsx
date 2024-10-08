import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../../models/productIModel";

interface Props {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
