import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Detail.module.scss";
import classname from "classnames/bind";
import Divider from "../Divider/index";
import { Rate } from "antd";
import BoxRight from "./BoxRight/BoxRight";
import Carousels from "./BoxLeft/Carousels";
import BoxLeft from "./BoxLeft/BoxLeft";
import SimilarProduct from "./SimilarProduct";
import { useDispatch } from "react-redux";
import { Tab123 } from "./tabs";
const cx = classname.bind(styles);
const Rates = (rate) => (
  <Rate
    disabled
    defaultValue={rate}
    character={<span style={{ fontSize: "15px" }}>★</span>}
  />
);
export default function Details() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { slug } = useParams();

  var [dulieu, setData] = useState([]);
  //var [infoSPTT, setInfo] = useState();
  var [info, setInfo] = useState({});
  useEffect(() => {
    axios
      .get("https://backoffice.nodemy.vn/api/products/" + slug + "?populate=*")
      .then((res) => {
        setInfo({
          id: res.data.data?.id,
          ram: res.data.data?.attributes?.ram,
          pricemin: parseInt(
            parseInt(res.data.data?.attributes?.price) - 1000000
          ),
          pricemax: parseInt(
            parseInt(res.data.data?.attributes?.price) + 1000000
          ),
          idCategories:
            res.data.data?.attributes?.idCategories?.data[0].attributes?.slug,
        });
        setData(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var mycates = JSON.parse(localStorage.getItem("mycategory")) || [];
  const cate = dulieu?.idCategories?.data[0].attributes?.slug;

  if (mycates.length > 3) {
    mycates.shift();
  }

  if (!mycates.includes(cate) && cate != null) {
    mycates.push(cate);
  }
  localStorage.setItem("mycategory", JSON.stringify(mycates));
  // var mota = dulieu?.description?.split(".");
  // blockMota = mota?.map((item, index) => { return <p>{item}.</p> })
  const devider = {
    link: "/",
    previousPlace: dulieu?.idCategories?.data[0].attributes?.name,
    currentPlace: slug,
  };
  return (
    <>
      <Tab123 />
      {/* <div className={cx("box_main")}>
        {<Divider devider={devider} />}
        <div>
          <h1 className={cx("productName")}>
            {" "}
            {dulieu?.name} {Rates(4)}
          </h1>
        </div>
        <div className={cx("box_left")}>
          <div className={cx("box_left_top")}>
            {<Carousels data={dulieu} />}
          </div>
          <div className={cx("box_left_bottom")}>
            {<BoxLeft data={dulieu} />}
          </div>
        </div>
        <div className={cx("box_right")}>{<BoxRight data={dulieu} />}</div>
        <div>
          <SimilarProduct info={info} />
        </div>
      </div> */}
    </>
  );
}
