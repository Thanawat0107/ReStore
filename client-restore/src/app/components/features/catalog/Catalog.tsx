import { baseUrlAPI } from "../../../common/SD";
import { useTitle } from "../../../hooks/useTitle";
import { Product } from "../../../models/productIModel";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

interface Props {

};

export default function Catalog({ }: Props) {
  useTitle("Catalog");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${baseUrlAPI}Product`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products}/>
    </>
  );
}
