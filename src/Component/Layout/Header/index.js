import styles from "./header.module.scss";
import classname from "classnames/bind";
import logo from "../../../images/app_logo_name.svg";


import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Avatar, Space, Dropdown } from 'antd';


const cx = classname.bind(styles);
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const handleMenuClick = (e) => {
    console.log('click', e);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("./login");
  };
  const items = [
    {
      label: 'Đăng xuất',
      key: '1',
      icon: <UserOutlined />,
      danger: true,
    },

  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
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

        <div className={cx("actions")}>
          <div className={cx("account")}>
            {user ? (

              <span
              >
                <div className={cx("profile")} >
                  <Dropdown.Button menu={menuProps} placement="bottom" icon={
                    <UserOutlined />  
                  }>
                    {user?.userAvatar ?
                      <Avatar className=" !pb-[4px]  !w-[25px] !h-[25px]" src={<img src={user?.userAvatar} alt="avatar" />} /> :
                      <Avatar icon={<UserOutlined />} />}
                    {user?.contactFullName}
                  </Dropdown.Button>
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
