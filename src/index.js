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
  Cart,
  Order,
} from "./Component";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import counterReducer from "./Component/slice/couterSlice";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import Test from "./Test";
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
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
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

      {
        path: "cart/",
        element: (
          <CheckLogin>
            {" "}
            <Cart />
          </CheckLogin>
        ),
      },
      {
        path: "pay/",
        element: (
          <CheckLogin>
            {" "}
            <Outlet />
          </CheckLogin>
        ),
        children: [
          {
            path: ":id",
            element: <Pay />,
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
