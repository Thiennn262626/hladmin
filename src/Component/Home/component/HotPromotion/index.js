import styles from "./hotpromotion.module.scss";
import classname from "classnames/bind";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "animate.css";

import { Carousel, Image, Skeleton } from "antd";
import { render } from "@testing-library/react";
import { Item } from "../../../index";
const numeral = require("numeral");
const cx = classname.bind(styles);
function HotPromotion() {
  var [hots, setHots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://backoffice.nodemy.vn/api/products?populate=*")
      .then((res) => {
        setHots(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function GetListGift() {
    //const { hots } = props;
    var listGift = [];
    var listGiftTemp = [];
    hots.map((item, index) => {
      if (index % 4 === 0 && index !== 0) {
        listGift.push(listGiftTemp);
        listGiftTemp = [];
      }
      listGiftTemp.push(item);
    });
    listGift.push(listGiftTemp);
    return listGift;
  }

  function GetCoupon(price, priceSale) {
    var coupon = 100 - Math.floor((price / priceSale) * 100);
    return coupon < 0 ? `+${Math.abs(coupon)}%` : `-${Math.abs(coupon)}%`;
  }

  return (
    <>
      <div className={cx("hotpromotion")}>
        <Image
          preview={false}
          style={{
            width: "89vw",
          }}
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/TGDD--Desk--deal-ngon-1200x120.png"
        />
        <div className={cx("hotpromotion__content")}>
          <div className={cx("hotpromotion__wrapper")}>
            {hots.length === 0 ? (
              <div className={cx("content")}>
                {[1, 2, 3, 4].map((item, index) => {
                  return (
                    <div className={cx("item-gift")}>
                      <Skeleton.Image style={{ width: "100" }} active={true} />
                      <Skeleton
                        style={{ width: "100%", margin: "20% 0 0 0" }}
                        size="2rem"
                        active={true}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <Carousel autoplay>
                {GetListGift().map((item, index) => {
                  return (
                    <>
                      <div key={index} className={cx("content")}>
                        {item.map((item, index) => {
                          return <Item item={item} index={index} />;
                        })}
                      </div>
                    </>
                  );
                })}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default HotPromotion;
