import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  Home,
  Pay,
  CheckLogin,
  Layout,
  Login,
  Details,
  Model,
  Order,
  AddProduct
} from "./Component";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import counterReducer from "./Component/slice/couterSlice";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import Test from "./Test.tsx";
const storeNodemy = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Order />,
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
        path: "detail/",
        element: <Outlet />,
        children: [
          {
            path: ":slug",
            element: <Details />,
          },
        ],
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
  {
    path: "test/",
    element: <Test />,
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
