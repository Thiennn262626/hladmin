import styles from "./footer.module.scss";
import classname from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Image, QRCode } from "antd";
const cx = classname.bind(styles);
function Footer() {
  const navigate = useNavigate();
  const service = [
    "TalkDesk Blog",
    "TalkDesk Mall",
    "Hướng Dẫn Mua Hàng",
    "Hướng Dẫn Bán Hàng",
    "Thanh Toán",
    "TalkDesk Xu",
    "Vận Chuyển",
    "Trả Hàng & Hoàn Tiền",
    "Chăm Sóc Khách Hàng",
    "Chính Sách Bảo Hành",
  ];
  const myfeature = [
    "Giới Thiệu Về TalkDesk Việt Nam",
    "Tuyển Dụng",
    "Điều Khoản TalkDesk",
    "Chính Sách Bảo Mật",
    "Chính Hãng",
    "Kênh Người Bán",
    "Flash Sales",
    "Chương Trình Tiếp Thị Liên Kết TalkDesk",
    "Liên Hệ Với Truyền Thông",
  ];

  const contact = [
    {
      name: "ĐỨC ANH",
      url: "https://www.facebook.com/ducanh1811/",
      avatar:
        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/321973640_669676851559049_845131352945234939_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g1OFVlu-cPEAX_inKm2&_nc_oc=AQk8QIx-pwJ5tPQE2DEGJCze-AyLM6oBXuOSdu6GVc0NyrC4Tuo1fcO0S-rBfIYRYSY&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfACI97nTdoVzD4JhUGbIgGfje4xTFMnx325ejSZSdlPDg&oe=6440C13B",
    },
    {
      name: "CÔNG THÀNH",
      url: "https://www.facebook.com/profile.php?id=100011055702857",
      avatar:
        "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/83883330_1021753201536527_9077199666818318336_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Irn0dD0lM3gAX-Fdmn8&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBOpjNIWAna-PUcbQYrj6AWu1sf1tN6NDWNWTQGxNdDgw&oe=646301AE",
    },
  ];

  const payment = [
    "https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8",
    "https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16",
    "https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08",
    "https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c",
    "https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06",
    "https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492",
  ];
  return (
    <>
      <div className={cx("footer")}>
        <div className={cx("footer__content")}>
          <div className={cx("footer__content_col")}>
            <div className={cx("title")}>CHĂM SÓC KHÁCH HÀNG</div>
            <div className={cx("content")}>
              {service.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
          </div>
          <div className={cx("footer__content_col")}>
            <div className={cx("title")}>VỀ TALKDESK</div>
            <div className={cx("content")}>
              {myfeature.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
          </div>
          <div className={cx("footer__content__contact")}>
            <div className={cx("title")}>LIÊN HỆ</div>
            <div className={cx("content")}>
              {contact.map((item, index) => {
                return (
                  <div className={cx("man")} key={index}>
                    <QRCode errorLevel="H" value={item.url} icon={item.avatar} />

                    <div
                      onClick={() => {
                        // chuyển trang
                        window.location.href = item.url;
                      }}
                      className={cx("name")}
                    >
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cx("footer__content__payment")}>
            <div className={cx("title")}>THANH TOÁN</div>
            <div className={cx("content")}>
              {payment.map((item, index) => {
                return (
                  <Image
                    style={{ margin: "20px", width: "3rem" }}
                    key={index}
                    src={item}
                    preview={false}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
