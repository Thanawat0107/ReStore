import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../container/App";
import { HomePage } from "../components/features/home";
import { Catalog, ProductDetails } from "../components/features/catalog";
import { AboutPage } from "../components/features/about";
import { ContactPage } from "../components/features/contact";
import { NotFound, ServerError } from "../errors";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "catalog", element: <Catalog /> },
            { path: "catalog/:id", element: <ProductDetails /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="/not-found" /> },
        ]
    }
])