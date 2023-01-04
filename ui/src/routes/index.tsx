import { createBrowserRouter } from "react-router-dom";
import { WithAppBar } from "../components/Appbar";
import Home from "../pages/Home";
import ProductPage from "../pages/Product";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <WithAppBar>
                <Home />
            </WithAppBar>
        ),
    },
    {
        path: "/product/:id",
        element: (
            <WithAppBar>
                <ProductPage />
            </WithAppBar>
        ),
    },
]);
