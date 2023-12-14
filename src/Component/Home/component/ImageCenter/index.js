import styles from "./imagecenter.module.scss";
import classname from "classnames/bind";

import { Carousel, Image } from "antd";

const cx = classname.bind(styles);
function ImageCenter(pops) {
  const { url } = pops;
  return (
    <div className={cx("image-center")}>
      <Image
        width="90%"
        style={{
          objectFit: "cover",
          borderRadius: "10px",
          margin: "0.5% 0",
        }}
        preview={false}
        src={url}
      />
    </div>
  );
}
export default ImageCenter;
