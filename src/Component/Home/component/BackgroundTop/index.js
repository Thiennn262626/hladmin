import styles from "./backgroundtop.module.scss";
import classname from "classnames/bind";

import { Carousel, Image } from "antd";

const cx = classname.bind(styles);
function BackgroundTop() {
  const images = [
    {
      image1:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/720-220-pkt4-720x220.png",
      image2:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/a54-720-220-720x220-1.png",
    },
    {
      image1:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/ip14-720-220-720x220-6.png",
      image2:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/Redmi-watch3-720-220-720x220-3.png",
    },
    {
      image1:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/720-220-pkt4-720x220.png",
      image2:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/reno8t-720-220-720x220.png",
    },
    {
      image1:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/redmi-note12-GRQ-720-220-720x220-1.png",
      image2:
        "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/Realme-C55-GRQ-720-220-720x220-2.png",
    },
  ];
  return (
    <>
      <Image
        width="100%"
        preview={false}
        src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/TGDD--Desk--1920x450-1.png"
      />
      <div className={cx("carousel")}>
        <Carousel autoplay>
          {images.map((item, index) => {
            return (
              <div key={index} className={cx("contain")}>
                <div className={cx("image")}>
                  <Image
                    width="45%"
                    style={{
                      width: "98%",
                      borderRadius: "20px",
                    }}
                    preview={false}
                    className={cx("image-left")}
                    src={item.image1}
                  />
                  <Image
                    width="45%"
                    style={{
                      borderRadius: "20px",
                      width: "100%",
                      
                    }}
                    preview={false}                    
                    className={cx("image-right")}
                    src={item.image2}
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
export default BackgroundTop;
