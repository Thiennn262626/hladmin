import styles from "./featuredproduct.module.scss";
import classname from "classnames/bind";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "animate.css";

import { Carousel, Image, Progress } from "antd";
import { render } from "@testing-library/react";

const numeral = require("numeral");
const cx = classname.bind(styles);
function FeaturedProduct() {
  const featuredproduct = [
    {
      name: "Laptop",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Laptop-129x129.png",
    },
    {
      name: "Tablet",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Tablet-128x129.png",
    },
    {
      name: "Đồng hồ thông minh",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Donghothongminh-128x129.png",
    },
    {
      name: "Điện thoại độc quyền",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg",
    },
    {
      name: "Đồng hồ thời trang",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Donghothoitrang-128x129.png",
    },
    {
      name: "Máy cũ giá rẻ",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-may-cu-60x60.png",
    },
    {
      name: "Ốp lưng",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Oplung-128x128.png",
    },
    {
      name: "Chuột máy tính",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/chuot-128x129.png",
    },
    {
      name: "Bàn phím",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/ban-phim-128x129.png",
    },
    {
      name: "Sim, thẻ cào",
      url: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Simthecao-129x129.png",
    },
  ];
  return (
    <>
      <div className={cx("featured_product")}>
        <div className={cx("featured_product__title")}>DANH MỤC NỔI BẬC</div>
        <div className={cx("featured_product__content")}>
          {featuredproduct.map((item, index) => {
            return (
              <div key={index} className={cx("featured_product__content__item")}>
                <Image
                  className={cx("featured_product__content__item__img")}
                  src={item.url}
                  preview={false}
                  width="5vw"
                />
                <div
                  className={cx("featured_product__content__item__name")}
                >{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default FeaturedProduct;
