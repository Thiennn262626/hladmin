import styles from "./home.module.scss";
import classname from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BackgroundTop,
  GiftCurrent,
  ImageCenter,
  FeaturedProduct,
  HotPromotion,
  ForYou,
  Trademark,
  Blog,
} from "./component";

import { Carousel, Image } from "antd";

const cx = classname.bind(styles);
function Home() {
  var [dulieu, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://backoffice.nodemy.vn/api/products?populate=*")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var block = dulieu.map((item, index) => {
    return (
      <div className={cx("col-2")} key={item.id}>
        <div className={cx("card")}>
          <Link to={`/detail/${item.attributes.slug}`}>
            {/* <img
              src={`https://backoffice.nodemy.vn${item.attributes.image?.data[0].attributes.formats.thumbnail.url}`}
              className={cx("card-img-top")}
              alt="..."
            /> */}
          </Link>
          <div className={cx("card-body")}>
            <Link to={`/detail/${item.attributes.slug}`}>
              <h6 className={cx("text-truncate")}>{item.attributes.name}</h6>
              <p className={cx("badge badge-danger")}>
                {item.attributes.price}
              </p>
            </Link>
            <button
              className={cx("btn btn-primary")}
              onClick={() => navigate(`/pay/${item.id}`)}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={cx("wrapper")}>
        <BackgroundTop />
        <ImageCenter url="https://images.fpt.shop/unsafe/fit-in/1200x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/6/638163937174297349_F-H7_1200x100.png"/>
        <GiftCurrent />
        <FeaturedProduct />
        <HotPromotion />
        <ImageCenter url="https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/10/638167625985878860_F-H5_1200x200.png" />
        <ForYou />
        <Trademark />
        <Blog />
      </div>
    </>
  );
}

export default Home;
