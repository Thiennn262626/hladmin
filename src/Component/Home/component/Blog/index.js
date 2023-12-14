import styles from "./Blog.module.scss";
import classname from "classnames/bind";
import { Carousel, Image } from "antd";
const cx = classname.bind(styles);
function Blog() {
  const SetImageTrademark = [
    {
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Files/2023/03/20/1519273/15-200323-213248-200x200.jpg",
      title:
        "Cách đóng nhanh tất cả các tab trên Bing AI iOS chỉ với vài cái chạm nhanh chóng...",
    },
    {
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Files/2023/04/15/1524998/th-150423-120032-200x200.jpg",
      title:
        "Vivo Pad 2 được tiết lộ hệ thống âm thanh và hỗ trợ viết lách cực kì hứa hẹn...",
    },
    {
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Files/2023/04/14/1524824/galaxys23ultrati%CC%81m-81-140423-103039-200x200.jpg",
      title: "Samsung tặng bạn ưu đãi giảm 8 triệu khi mua Galaxy S Ultra...",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("blog-current")}>
        <div className={cx("blog-current__title")}>
          <h2 className={cx("blog-current__text_1")}>24H CÔNG NGHỆ</h2>
        </div>
        <div className={cx("blog-current__content")}>
          {SetImageTrademark.map((item, index) => {
            return (
              <div key={index} className={cx("blog-current__content__item")}>
                <Image
                  width="100%"
                  className={cx("blog-current__content__item__img")}
                  src={item.url}
                  preview={false}
                />
                <div className={cx("blog-current__content__item__text")}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("blog-add")}>
        <Image
          height={400}
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2022/12/banner/HCCTGDDnew1-285x350.webp"
          preview={false}
        />
      </div>
    </div>
  );
}
export default Blog;
