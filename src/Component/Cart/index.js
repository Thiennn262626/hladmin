import styles from "./cart.module.scss";
import classname from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ForYou, TableCart } from "./component";

import { Carousel, Image } from "antd";

const cx = classname.bind(styles);

function Cart() {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <TableCart />
          <ForYou />
        </div>
      </div>
    </>
  );
}

export default Cart;
