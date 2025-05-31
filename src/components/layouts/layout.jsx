import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import Log from "/src/pages/logIn/log"
import AddProduct from "/src/pages/addProduct/addProduct";

function Layout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Log />,
      children: [ 
        {
          inedx: true,
          element: <Log />,
        }
      ],
    },
    {
      path: "/dash",
      element: <Dashbord />,
      children: [ 
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "other",
          element: <Other />,
        },
        {
          path: "addProduct",
          element: <AddProduct />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Layout;
