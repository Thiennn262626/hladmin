import { Button, notification, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "./Buybtn.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModeLogin } from "../../../Component/slice/couterSlice";
function Buybtn(pops) {
  const [api, contextHolder] = notification.useNotification();
  const { name, handleClick } = pops;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  function addCart() {
    navigate("/cart")
  }

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Xem sau
        </Button>
        <Button type="primary" size="nomarl" onClick={() => addCart()}>
          Đến giỏ hàng
        </Button>
      </Space>
    );
    api.open({
      message: `Đã thêm thành công ${name} vào giỏ hàng`,
      description: "Vui lòng vào giỏ hàng để tiếp tục thanh toán",
      btn,
      key,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      onClose: close,

      duration: 2, // Thời gian tồn tại của thông báo là 5 giây
    });
  };
  return (
    <>
      {contextHolder}
      <Button id="buybtn"
        style={{
          backgroundColor: "#fb6e2e",
          borderRadius: "6px",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
          padding: "7% 10px",
          width: "100%",
        }}
        onClick={() => {
          var userLocal = null;
          const userLocalCall = localStorage.getItem("user");
          userLocal = JSON.parse(userLocalCall);
          if (!userLocal) {
            dispatch(setModeLogin(true));
          } else {
            handleClick();
            openNotification();
          }
        }}
      >
        MUA NGAY
      </Button>
    </>
  );
}
export default Buybtn;
