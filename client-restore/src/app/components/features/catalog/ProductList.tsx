import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../../models/productIModel";
import { useAppSelector } from "../../../hooks/hooks";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector(state => state.catalogReducer);
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );  
}
