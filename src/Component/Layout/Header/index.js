import styles from "./header.module.scss";
import classname from "classnames/bind";
import logo from "../../../images/app_logo_name.svg";
import CheckLogin from "../../Login/CheckLogin/index";
import ModelLogin from "../../Login/ModelLogin";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import _debounce from "lodash/debounce";
import { setModeLogin } from "../../slice/couterSlice";
import React from 'react';
import { Avatar, Space } from 'antd';
const cx = classname.bind(styles);
function Header() {
  const navigate = useNavigate();
  const clickOrder = () => {
    navigate("/order");
  };
  const clickCart = () => {
    navigate("/add-product");
  };

  return (
    <div className='w-full h-100'>
      <div className={cx("inner")}>
        <div
          className={cx("logo")}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img className={cx("avt")} src={logo} alt="" />
        </div>
        <div className={cx("menu")}>
          <ul onClick={clickOrder} className="hover:text-blue-600">Order</ul>
          <ul onClick={clickCart}  className="hover:text-blue-600">Product</ul>
        </div>
        <div className={cx("actions")}>
          <div className={cx("account")}>
            {localStorage.getItem("user") ? (
              <span
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("./login");
                }}
              >
                <div className={cx("profile")} >
                  <Space className={cx("profileATV")} size={24} wrap>
                    {JSON.parse(localStorage.getItem("user"))?.userAvatar ? 
                      <Avatar src={<img src={JSON.parse(localStorage.getItem("user"))?.userAvatar} alt="avatar" />} /> : 
                       <Avatar icon={ <UserOutlined />} />}                 
                  </Space>
                    {JSON.parse(localStorage.getItem("user"))?.contactFullName}                  
                </div>
              </span>
            ) : (
              <>
                <UserOutlined style={{ margin: "0px 3%", fontSize: "1rem" }} />
                <span
                  onClick={() => {
                    navigate("./login");
                  }}
                >
                  Đăng nhập
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
export default Header;
