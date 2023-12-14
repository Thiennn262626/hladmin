import styles from "./similarproduct.module.scss";
import classname from "classnames/bind";
import { useSelector } from 'react-redux';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "animate.css";
import { Navigate } from "react-router-dom"
import { Carousel, Image, Progress } from "antd";


const numeral = require("numeral");
const cx = classname.bind(styles);
function SimilarProduct({ info }) {
  // console.log(info);
  var [hots, setHots] = useState([]);
  const navigate = useNavigate();
  //const info1 = useSelector(state => state.counter.info);
  //console.log("tt",info1);
  var url = (`https://backoffice.nodemy.vn/api/products?populate=*&filters[id][$ne]=${info?.id}&filters[ram][$contains]=${info?.ram}&filters[price][$lte]=${info?.pricemax}&filters[price][$gte]=${info?.pricemin}&filters[idCategories][slug][$contains]=${info?.idCategories}`)

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setHots(res.data.data);
        //console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);

      });
  }, [info]);

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

  function HotPromotion(props) {
    const { item, index } = props;
    const restAPI = "https://backoffice.nodemy.vn";
    return (

      <>
        <div className={cx("item-gift")}>
          <div
            key={index}
            onMouseEnter={(e) => {
              e.currentTarget.childNodes[0].style.transform = "scale(1.1)";
              e.currentTarget.childNodes[1].childNodes[0].style.color = "#288ad6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.childNodes[0].style.transform = "scale(1.0)";
              e.currentTarget.childNodes[1].childNodes[0].style.color = "#000";
            }}
            onClick={() => {
              navigate(`/detail/${item.attributes.slug}`);
              window.location.reload();
              // cuộn lên đầu trang
              window.scrollTo(0, 0);
            }}

          >
            <Image
              height="200px"
              style={{
                backgroundColor: "red",
                width: "98%",
                margin: "auto",
              }}
              transition="12s easing"
              preview={false}
              src={
                item.attributes.image?.data
                  ? restAPI + item.attributes.image.data[0].attributes.url
                  : "https://backoffice.nodemy.vn/uploads/laptop_gaming_acer_nitro_5_eagle_an515_57_5669_a1581d79b72e45239cf8ffaad2c866f4_large_a7ac93dab2.webp"
              }
            />
            <div className={cx("item-content")}>
              <div className={cx("item-content__title")}>
                {item.attributes.name}
              </div>
              <div className={cx("item-content__price")}>
                <div className={cx("price__new")}>
                  {numeral(item.attributes.price).format("0,0")}
                  <span>đ</span>
                </div>
                <div className={cx("price__old")}>
                  <div className={cx("price")}>
                    {numeral(item.attributes.oldPrice).format("0,0") + "đ"}
                  </div>
                  <div className={cx("sale")}>
                    {GetCoupon(item.attributes.price, item.attributes.oldPrice)}
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Link to={`/`}>So sánh</Link>
        </div>
      </>
    );
  }

  return (
    <>

      <div className={cx("hotpromotion")}>
        <p className={cx("SPTT")}>Sản phẩm tương tự:</p>
        <div className={cx("hotpromotion__content")}>
          <div className={cx("hotpromotion__wrapper")}>
            <Carousel autoplay>
              {GetListGift().map((item, index) => {
                return (
                  <>
                    <div key={index} className={cx("content")}>
                      {item.map((item, index) => {
                        return <HotPromotion item={item} index={index} />;
                      })}
                    </div>
                  </>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
export default SimilarProduct;