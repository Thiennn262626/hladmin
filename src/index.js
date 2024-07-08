import React from "react";
import ReactDOM from "react-dom/client";
// import Test from "./Test.tsx";
import reportWebVitals from "./reportWebVitals";
import {
  Layout,
  Login,
  Model,
  Order,
  AddProduct,
  ListProduct,
  EditProduct,
  Home,
} from "./Component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Component/slice/couterSlice";
import counterOrderReducer from "./Component/Order/counterOrder";
import counterProduct from "./Component/Product/counterProduct";
const storeNodemy = configureStore({
  reducer: {
    counter: counterReducer,
    counterOrder: counterOrderReducer,
    counterProduct: counterProduct,
  },
});

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/product",
        element: <ListProduct />,
      },
      {
        path: "/product/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "model/",
    element: <Model />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeNodemy}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
