import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../components/features/home";
import { Catalog, ProductDetails } from "../components/features/catalog";
import { AboutPage } from "../components/features/about";
import { ContactPage } from "../components/features/contact";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="catalog" element={<Catalog />}></Route>
      <Route path="catalog/:id" element={<ProductDetails />}></Route>
      <Route path="about" element={<AboutPage />}></Route>
      <Route path="contact" element={<ContactPage />}></Route>
    </Routes>
  );
}
