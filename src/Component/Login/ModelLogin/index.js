import { Modal,   } from 'antd';
import { useState } from 'react';
import axios from "axios";
import { setUser } from "../../slice/couterSlice";
import { useDispatch } from "react-redux";
import styles from "./Model.module.scss";
import classname from "classnames/bind";
import { useSelector } from 'react-redux';
import { setModeLogin } from "../../slice/couterSlice";
import { margin } from '@mui/system';
const cx = classname.bind(styles);
const ModelLogin = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.counter.modelLogin);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    //const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        dispatch(setModeLogin(true));
    };
    const handleOk = () => {
        dispatch(setModeLogin(false));
    };
    const handleCancel = () => {
        dispatch(setModeLogin(false));
    };
    function login() {
        const data = JSON.stringify({
            identifier: userName,
            password: password,
        });
        var config = {
            method: "post",
            url: "https://backoffice.nodemy.vn/api/auth/local/",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjgwMTY0MzY1LCJleHAiOjE2ODI3NTYzNjV9.DNl-fEIwImrbsRvnmZZP5dP64k9MQPQmDuZfXJjHHjY",
                "Content-Type": "application/json",
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                const user = JSON.stringify(response.data);
                localStorage.setItem("user", user);
                dispatch(setUser(response.data.user));
                handleOk();
            })
            .catch(function (error) {
                console.log(error);
                setErr("Thông tin không chính xác!!!");
                showModal();
            });
    }
    return (
        <>
            <Modal className={cx("modelLogin")} title="Login" open={isOpen} onOk={login} onCancel={handleCancel}>
                <div className={cx("")}>
                    <div className={cx("")}>
                        <div className={cx("")}>
                            <div className={cx("inputs")}>
                                <div className={cx("input")}>                           
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Tài khoản"
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                                                    
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
                                    <div className={cx("error-input")}>{err}</div>                                   
                                </div>
                            </div>
                            {/* <button onClick={login}>Đăng nhập</button>  */}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModelLogin;