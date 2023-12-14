import { Button, Input, Table, Typography, Image, message } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./TableCart.module.scss";
import classname from "classnames/bind";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Skeleton } from "antd";
function TableCart() {
  const navigate = useNavigate();
  const numeral = require("numeral");
  const cx = classname.bind(styles);
  const user = JSON.parse(localStorage.getItem("user"));
  const namecart = `myCart_${user.user.id}`;
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const product = localStorage.getItem(namecart)
    ? JSON.parse(localStorage.getItem(namecart)).items
    : [];
  const [data, setData] = useState([]);

  // const [messageApi, contextHolder] = message.useMessage();
  const info = (coupon) => {
    message.info({
      content: coupon,
      duration: 1.5,
    });
  };

  const coupon = [
    {
      code: "30thang4",
      discount: 10,
    },
    {
      code: "khuyenmaiT4",
      discount: 20,
    },
    {
      code: "DUCANH",
      discount: 30,
    },
  ];
  let api = localStorage.getItem(namecart)
    ? "https://backoffice.nodemy.vn/api/products?populate=*"
    : "";
  product.map((item, index) => {
    api += `&filters[slug][$contains]=${item.id}`;
  });

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  data.map((item, index) => {
    product.map((item2, index2) => {
      if (item.attributes.slug === item2.id) {
        item.key = item2.id;
        item.image = item.attributes.image?.data
          ? "https://backoffice.nodemy.vn" +
            item.attributes.image.data[0].attributes.url
          : "https://backoffice.nodemy.vn/uploads/r5_3050_1ca8d2e294ca4a3c8c875ac518beb714_large_4c8a4d705f.webp";
        item.name = item.attributes.name;
        item.price = item.attributes.price;
        item.count = item2.count;
        item.total = item2.count * item.attributes.price;
      }
    });
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (key) => {
    // Xóa trên UI
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    newData.splice(index, 1);
    setData(newData);

    // Xóa trên localStorage
    const myCart = JSON.parse(localStorage.getItem(namecart));
    const newCart = myCart.items.filter((item) => item.id !== key);
    myCart.items = newCart;
    localStorage.setItem(namecart, JSON.stringify(myCart));

    // Nêu giỏ hàng rỗng thì xóa luôn localStorage
    if (newCart.length === 0) {
      localStorage.removeItem(namecart);
    }
  };

  function TongThanhToan() {
    let tong = 0;
    selectedRowKeys.map((item, index) => {
      data.map((item2, index2) => {
        if (item === item2.key) {
          tong += item2.total;
        }
      });
    });
    return tong;
  }

  const columns = [
    {
      title: "Chọn tất cả sản phẩm",
      // chia độ rộng cột
      width: "45%",
      dataIndex: "name",
      onCell: (record) => ({
        style: { cursor: "pointer" },
        onClick: () => navigate(`/detail/${record.key}`),
      }),
      render: (_, record) => {
        return {
          children: (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <LazyLoadImage
                src={record.image}
                effect="blur"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />

              <div style={{ marginLeft: "20px" }}>
                <div
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  {record.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    margin: "5px 0px",
                  }}
                >
                  <Image
                    preview={false}
                    width={15}
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/91167e001db60b62d4f85c3e0ea919b6.png"
                  />
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    7 Ngày Miễn Phí Trả Hàng
                  </div>
                </div>
              </div>
            </div>
          ),
        };
      },
    },

    {
      title: "Giá",
      dataIndex: "price",

      render: (_) => {
        return {
          children: (
            <div
              style={{
                fontSize: "1.1rem",
              }}
            >
              {numeral(_).format("0,0")}đ
            </div>
          ),
        };
      },
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      render: (_, record) => {
        return {
          children: (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Button
                style={{
                  flex: 1,
                }}
                disabled={
                  record.count === 1 ||
                  rowSelection.selectedRowKeys.includes(record.key)
                }
                onClick={() => {
                  const newData = [...data];
                  newData.map((item, index) => {
                    if (item.key === record.key) {
                      item.count -= 1;
                      item.total = item.count * item.price;
                    }
                  });
                  setData(newData);

                  const myCart = JSON.parse(localStorage.getItem(namecart));
                  product.map((item, index) => {
                    if (item.id === record.key) {
                      item.count -= 1;
                    }
                  });
                  myCart.items = product;
                  localStorage.setItem(namecart, JSON.stringify(myCart));
                }}
                icon={
                  <MinusOutlined
                    style={{
                      display: "flex",
                      flex: 2,
                      justifyContent: "center",
                    }}
                  />
                }
              />
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                }}
              >
                {_}
              </div>
              <Button
                style={{
                  flex: 1,
                }}
                disabled={rowSelection.selectedRowKeys.includes(record.key)}
                onClick={() => {
                  const newData = [...data];
                  newData.map((item, index) => {
                    if (item.key === record.key) {
                      item.count += 1;
                      item.total = item.count * item.price;
                    }
                  });
                  setData(newData);

                  const myCart = JSON.parse(localStorage.getItem(namecart));
                  product.map((item, index) => {
                    if (item.id === record.key) {
                      item.count += 1;
                    }
                  });
                  myCart.items = product;
                  localStorage.setItem(namecart, JSON.stringify(myCart));
                }}
                icon={
                  <PlusOutlined
                    style={{
                      display: "flex",
                      flex: 2,
                      justifyContent: "center",
                    }}
                  />
                }
              />
            </div>
          ),
        };
      },
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      render: (_) => {
        return {
          children: (
            <div
              style={{
                color: "#ff4d4f",
                fontSize: "1.1rem",
              }}
            >
              {numeral(_).format("0,0")}đ
            </div>
          ),
        };
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_, record) => {
        return {
          children: (
            <Typography.Link onClick={() => handleDelete(record.key)}>
              <DeleteOutlined style={{ fontSize: "1.2rem", display: "flex" }} />
            </Typography.Link>
          ),
        };
      },
    },
  ];
  return (
    <div className={cx("content")}>
      <Table
        style={{
          flex: 7,
          margin: "0 1% 0 0",
        }}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
      <div className={cx("right")}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "5%",
            backgroundColor: "#fff",
            padding: "10% 5%",
            borderRadius: "5px",
          }}
        >
          <Input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            style={{
              width: "65%",
              marginRight: "1%",
              flex: 7,
            }}
            placeholder="Nhập mã giảm giá"
          />
          <Button
            onClick={() => {
              let flag = false;
              if (code === "") {
                info(`Vui lòng nhập mã giảm giá`);
                return;
              }
              coupon.map((item, index) => {
                if (item.code === code) {
                  setDiscount(item.discount / 100);
                  info(`Áp dụng mã giảm giá ${item.discount}% thành công`);
                  setCode("");
                  flag = true;
                }
              });
              if (!flag) {
                info(`Mã giảm giá không tồn tại`);
              }
            }}
            style={{
              width: "25%",
              marginLeft: "1%",
              fontSize: "0.7rem",
              textAlign: "center",
              flex: 3,
            }}
            className={cx("btn-apply")}
          >
            Áp dụng
          </Button>
        </div>
        <div className={cx("total")}>
          <div className={cx("total-price")}>
            <div className={cx("total-price-title")}>Thành tiền</div>
            <span></span>
            <div className={cx("total-price-contain")}>
              <div className={cx("total-price-total")}>
                <div className={cx("total-price-contain-title")}>Tạm tính</div>
                <div className={cx("total-price-contain-value")}>
                  {numeral(TongThanhToan()).format("0,0")}đ
                </div>
              </div>
              <div className={cx("total-price-total")}>
                <div className={cx("total-price-contain-title")}>Giảm giá</div>
                <div className={cx("total-price-contain-value")}>
                  -{numeral(TongThanhToan() * discount).format("0,0")}đ
                </div>
              </div>
              <span></span>
              <div className={cx("total-price-total-final")}>
                <div className={cx("total-price-contain-title-final")}>
                  Tổng cộng
                </div>
                <div className={cx("total-price-contain-value-final")}>
                  {numeral(TongThanhToan() - TongThanhToan() * discount).format(
                    "0,0"
                  )}
                  đ
                </div>
              </div>
            </div>
          </div>

          <Button className={cx("btn-checkout")}>Thanh toán</Button>
        </div>
      </div>
    </div>
  );
}
export default TableCart;
