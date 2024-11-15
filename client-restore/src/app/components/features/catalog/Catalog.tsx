import {
  Grid,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useTitle } from "../../../hooks/useTitle";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelecters,
  setPageNumber,
  setProductParams,
} from "../../../store/slices/catalogSlice";
import Loading from "../../layout/Loading";

import { useEffect } from "react";
import Search from "../../layout/Search";
import ProductList from "./ProductList";
import RadioButtonGroup from "../../layout/RadioButtonGroup";
import CheckBox from "../../layout/CheckBox";
import AppPagination from "../../layout/AppPagination";

interface Props {}

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog({}: Props) {
  useTitle("Catalog");
  const products = useAppSelector(productSelecters.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, params, metaData } = useAppSelector(
    (state) => state.catalogReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <Loading message="Loading products..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>

        <Paper sx={{ mb: 2 }}>
          <Search />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup 
            selectValue={params.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch((setProductParams({orderBy: e.target.value})))}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckBox items={types} checked={params.types} 
            onChange={(items: string[]) => dispatch(setProductParams({types: items}))} 
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBox items={brands} checked={params.brands} 
            onChange={(items: string[]) => dispatch(setProductParams({brands: items}))} 
          />
        </Paper>

      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{mb: 2}}>
        {metaData && 
        <AppPagination
          metaData={metaData}
          onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
        />}
      </Grid>
    </Grid>
  );
}
