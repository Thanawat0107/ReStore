import { Apis } from "../../../api/Apis";
import { useTitle } from "../../../hooks/useTitle";
import { Product } from "../../../models/productIModel";
import Loading from "../../layout/Loading";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

interface Props {

};

export default function Catalog({}: Props) {
  useTitle("Catalog");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    Apis.Catalog.list()
    .then(products => {
      setProducts(products)
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading products..."/>

  return (
    <>
      <ProductList products={products}/>
    </>
  );
}
