import styles from "./Trademarkhot.module.scss";
import classname from "classnames/bind";
import { Carousel, Image } from "antd";
const cx = classname.bind(styles);
function Trademark() {
  const SetImageTrademark = [
    "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/samsung-390-210-390x210-2.png",
    "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/01/banner/4138F801-4823-44D5-B626-32025C4D329C-390x210.png",
    "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/chuyen-trang-lenovo-390x210.png",
    "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/chuyentrang-HP-390x210-1.png",
  ];
  return (
    <>
      <div className={cx("trademark-current")}>
        <div className={cx("trademark-current__title")}>
          <h2 className={cx("trademark-current__text_1")}>
            THƯƠNG HIỆU NỔI BẬC 2023
          </h2>
        </div>
        <div className={cx("trademark-current__content")}>
          {" "}
          {SetImageTrademark.map((item, index) => {
            return (
              <div key={index} className={cx("trademark-current__content__item")}>
                <Image
                  className={cx("trademark-current__content__item__img")}
                  src={item}
                  preview={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Trademark;
