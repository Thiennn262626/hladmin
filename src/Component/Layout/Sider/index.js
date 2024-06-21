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
    } else if (path.match(/^\/product\/edit\/[a-zA-Z0-9-]+$/)) {
      setOpenKeys(["sub4"]);
    } else if (path === "/order") {
      setOpenKeys(["sub1"]);
    } else {
      setOpenKeys([]);
    }
  }, [location.pathname]);

  const getMenuKeyFromPath = (path) => {
    if (path.match(/^\/product\/edit\/[a-zA-Z0-9-]+$/)) {
      return "2";
    }
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
