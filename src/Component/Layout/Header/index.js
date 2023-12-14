import styles from "./header.module.scss";
import classname from "classnames/bind";

import axios from "axios";
import logo from "../../../images/logo.svg";
import avatar from "../../../images/newcv.jpg";
import { useState, useEffect, useCallback } from "react";
import Tippy from "@tippyjs/react";
import CheckLogin from "../../Login/CheckLogin/index";
import { useDispatch } from "react-redux";

import ModelLogin from "../../Login/ModelLogin";

import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Space, message, Popconfirm, Select, AutoComplete } from "antd";
import { useNavigate, Link, useHistory } from "react-router-dom";
import _debounce from "lodash/debounce";
import { setModeLogin } from "../../slice/couterSlice";
import { Search } from "./components";
const cx = classname.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = "Bạn có muốn đăng xuất?";
  const confirm = () => {
    localStorage.removeItem("user");
    navigate("./login");
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div
            className={cx("logo")}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src={logo} alt="talkdaesk" />
          </div>
          <div className={cx("menu")}>
            <ul>Điện thoại</ul>
            <ul>Laptop</ul>
            <ul>Tablet</ul>
            <ul>Đồng hồ</ul>
            <ul>Phụ kiện</ul>
          </div>
          <div className={cx("actions")}>
            <Search />

            <div
              onClick={() => {
                var userLocal = null;
                const userLocalCall = localStorage.getItem("user");
                userLocal = JSON.parse(userLocalCall);
                if (!userLocal) {
                  dispatch(setModeLogin(true));
                } else {
                  navigate("./cart");
                }
              }}
              className={cx("cart")}
            >
              <ShoppingCartOutlined
                style={{ margin: "0px 3%", fontSize: "1rem" }}
              />
              <span>Giỏ hàng</span>
            </div>
            <div className={cx("account")}>
              <UserOutlined style={{ margin: "0px 3%", fontSize: "1rem" }} />
              {localStorage.getItem("user") ? (
                <span
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("./login");
                  }}
                >
                  {JSON.parse(localStorage.getItem("user")).user.username}
                </span>
              ) : (
                <span
                  onClick={() => {
                    navigate("./login");
                  }}
                >
                  Đăng nhập
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
