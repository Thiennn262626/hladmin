// import React from "react";
// import {
//   ShopOutlined,
//   FileDoneOutlined,
//   SnippetsOutlined,
// } from "@ant-design/icons";
// import { Menu } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";
// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
// const items = [
//   getItem("Quản lý đơn hàng", "sub1", <FileDoneOutlined />, [
//     getItem("Đơn hàng", "1"),
//   ]),

//   {
//     type: "divider",
//   },
//   getItem("Quản lý sản phẩm", "sub4", <ShopOutlined />, [
//     getItem("Sản phẩm", "2"),
//     getItem("Thêm sản phẩm", "3"),
//     ,
//   ]),
//   {
//     type: "divider",
//   },
//   // getItem('Thống kê', 'sub5', <SnippetsOutlined />, [
//   //     getItem('Thu nhập', '4'),
//   // ]),
// ];
// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openKeys, setOpenKeys] = useState([]);
//   const clickOrder = () => {
//     navigate("/order");
//   };
//   const clickAddProduct = () => {
//     navigate("/add-product");
//   };
//   const clickProduct = () => {
//     navigate("/product");
//   };
//   const getMenuKeyFromPath = (path) => {
//     switch (path) {
//       case "/order":
//         return "1";
//       case "/product":
//         return "2";
//       case "/add-product":
//         return "3";
//       default:
//         return "";
//     }
//   };
//   const onClick = (e) => {
//     if (e.key === "1") {
//       clickOrder();
//     }
//     if (e.key === "2") {
//       clickProduct();
//     }
//     if (e.key === "3") {
//       clickAddProduct();
//     }
//   };
//   return (
//     <Menu
//       className="!w-full"
//       onClick={onClick}
//       style={{}}
//       //   defaultSelectedKeys={["1"]}
//       defaultOpenKeys={["sub1"]}
//       selectedKeys={[getMenuKeyFromPath(location.pathname)]}
//       mode="inline"
//       items={items}
//     />
//   );
// };
// export default App;
import React, { useEffect, useState } from "react";
import { ShopOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Quản lý đơn hàng", "sub1", <FileDoneOutlined />, [
    getItem("Đơn hàng", "1"),
  ]),
  {
    type: "divider",
  },
  getItem("Quản lý sản phẩm", "sub4", <ShopOutlined />, [
    getItem("Sản phẩm", "2"),
    getItem("Thêm sản phẩm", "3"),
  ]),
  {
    type: "divider",
  },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/product" || path === "/add-product") {
      setOpenKeys(["sub4"]);
    } else if (path === "/order") {
      setOpenKeys(["sub1"]);
    } else {
      setOpenKeys([]);
    }
  }, [location.pathname]);

  const getMenuKeyFromPath = (path) => {
    switch (path) {
      case "/order":
        return "1";
      case "/product":
        return "2";
      case "/add-product":
        return "3";
      default:
        return "";
    }
  };

  const onClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/order");
        break;
      case "2":
        navigate("/product");
        break;
      case "3":
        navigate("/add-product");
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      className="menu-container"
      onClick={onClick}
      selectedKeys={[getMenuKeyFromPath(location.pathname)]}
      openKeys={openKeys}
      mode="inline"
      items={items}
      style={{
        width: "100%",
        padding: "10px",
      }}
      onOpenChange={(keys) => setOpenKeys(keys)}
    />
  );
};

export default App;
