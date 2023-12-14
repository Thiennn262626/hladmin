import React from "react";
import styles from "./order.module.scss";
import classname from "classnames/bind";
import { Tab } from "./common/tabs";

const cx = classname.bind(styles);

const Index = () => {
  return (
    <>
      <div className={cx("tab")}>
        <Tab />
      </div>
    </>
  );
};

export default Index;
