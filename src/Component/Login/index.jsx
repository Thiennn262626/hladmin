import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../slice/couterSlice";
import { useState } from "react";
import { Col, Button, Input } from "antd";
import { Typography } from "antd";
import styles from "./Login.module.scss";
import classname from "classnames/bind";
import { loginService } from "../../services/loginService";
const cx = classname.bind(styles);
const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function login() {
    const data = {
   userLogin: userName,
  password: password,
}
  const res = await loginService.login(data)
  if(res){
    //load lại trang
    window.location.href = "/order";
    // navigate("/order");
  }
  }
  return (
  
    <div className={cx("body")}>
      <div className={cx("wrapper")}>
        <h1>Đăng Nhập</h1>
        <span>
        <Text style={{color: "red"}}>{err}</Text>
        </span>
        <div className={cx("form")}>
          <div className={cx("inputs")}>
            <div className={cx("input")}>
              <input
                name="username"
                type="text"
                placeholder="Tài khoản"
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className={cx("error-input")}></div>
              <span></span>
            </div>        
            <div className={cx("input")}>
              <input
                name="password"
                onPressEnter={login}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
              />
              <div className={cx("error-input")}></div>
              <span></span>
            </div>        
          </div>
          <button className={cx("loginbtn")}  onClick={login}>Đăng nhập</button>
         
        </div>
      </div>
    </div>
  );
}
