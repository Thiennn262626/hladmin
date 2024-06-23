import React, { useState, useEffect } from "react";
import { Button, Input, Table, Tag, Space, Dropdown, theme } from "antd";
import { LockOutlined, UnlockOutlined, DownOutlined } from "@ant-design/icons";
import { notify } from "../../../../utils/notify";
import { productServices } from "../../../../services/productService";
import { wrap } from "lodash";

const { useToken } = theme;

const App = ({ product }) => {
  const [listSku, setListSku] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await productServices.getProductSku(product.productID);
      if (res) {
        setListSku(res.productSKU);
      }
    };
    if (product.productID !== "") fetchProduct();
    return () => {
      setListSku([]);
    };
  }, [product]);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle = {
    boxShadow: "none",
  };

  const reStock = async (record, action) => {
    if (quantity < 0 || isNaN(quantity)) {
      notify.notify1(
        "Quantity must be greater than 0 and be a number",
        "error"
      );
      return;
    }

    const content =
      action === "update"
        ? "Are you sure you want to update this sku quantity?"
        : "Are you sure you want to add this quantity to the existing sku quantity?";

    const check = await notify.notify2(
      action === "update" ? "Update Quantity" : "Add Quantity",
      "warning",
      content,
      "Yes",
      "No"
    );

    if (check) {
      let currentQuantity = Number(record?.quantity) || 0;
      let inputQuantity = Number(quantity) || 0;
      let newQuantity =
        action === "update" ? inputQuantity : currentQuantity + inputQuantity;
      const res = await productServices.restockSku(
        record?.productSKUID,
        newQuantity
      );

      if (res) {
        let newListSku = [...listSku];
        let index = newListSku.findIndex(
          (item) => item.productSKUID === record.productSKUID
        );
        newListSku[index].quantity = newQuantity;
        setListSku(newListSku);
        setQuantity(0);
      }
    }
  };
  const updatePrice = async (record, key) => {
    if (price <= 0 || isNaN(price)) {
      notify.notify1("Price must be greater than 0 and be a number", "error");
      return;
    }

    const content = "Are you sure you want to update this sku price?";
    const check = await notify.notify2(
      "Update Price",
      "warning",
      content,
      "Yes",
      "No"
    );

    if (check) {
      let res = null;
      if (key === "price") {
        res = await productServices.updateSkuPrice(record?.productSKUID, price);
      } else if (key === "priceBefore") {
        res = await productServices.updateSkuPriceBefore(
          record?.productSKUID,
          price
        );
      }

      if (res) {
        let newListSku = [...listSku];
        let index = newListSku.findIndex(
          (item) => item.productSKUID === record.productSKUID
        );
        if (key === "price") {
          newListSku[index].price = price;
        } else if (key === "priceBefore") {
          newListSku[index].priceBefore = price;
        }
        setListSku(newListSku);
        setPrice(0);
      }
    }
  };

  const columns = [
    {
      title: "Hình ảnh",
      align: "center",
      dataIndex: "linkString",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-around">
          <img
            className="w-[60px] h-[60px]"
            src={record?.linkString}
            alt="Product Image"
          />
        </div>
      ),
    },
    {
      title: "Giá",
      align: "center",
      dataIndex: "price",
      render: (_, record) => (
        <div className="flex w-full justify-between pr-2">
          <div className="flex items-center w-3/4">
            <p className="w-3/4 text-center">{VND.format(record?.price)}</p>
          </div>
          <Dropdown
            overlay={
              <div style={contentStyle} className="w-[200px]">
                <Space className="w-full" style={{ padding: 8 }}>
                  <Input
                    className="w-[100%]"
                    type="number"
                    defaultValue={record?.price.toString()}
                    onChange={handlePrice}
                    placeholder="Nhập giá tiền"
                  />
                  <Button
                    onClick={() => updatePrice(record, "price")}
                    className="bg-[#4096FF]"
                    type="primary"
                  >
                    OK
                  </Button>
                </Space>
              </div>
            }
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Edit Price
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Giá trước khi giảm",
      align: "center",
      dataIndex: "priceBefore",
      render: (_, record) => (
        <div className="flex w-full justify-between pr-2">
          <div className="flex items-center w-3/4">
            <p className="w-3/4 text-center">
              {VND.format(record?.priceBefore)}
            </p>
          </div>
          <Dropdown
            overlay={
              <div style={contentStyle} className="w-[200px]">
                <Space className="w-full" style={{ padding: 8 }}>
                  <Input
                    className="w-[100%]"
                    type="number"
                    defaultValue={record?.priceBefore.toString()}
                    onChange={handlePrice}
                    placeholder="Nhập giá tiền"
                  />
                  <Button
                    onClick={() => updatePrice(record, "priceBefore")}
                    className="bg-[#4096FF]"
                    type="primary"
                  >
                    OK
                  </Button>
                </Space>
              </div>
            }
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Edit Price
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Số lượng tồn",
      align: "center",
      dataIndex: "quantity",
      render: (_, record) => (
        <div className="flex w-full justify-between pr-2">
          <div className="flex items-center w-3/4">
            <p className="w-3/4 text-center">{record?.quantity}</p>
          </div>
          <Dropdown
            overlay={
              <div style={contentStyle} className="w-[200px]">
                <Space className="w-full" style={{ padding: 8 }}>
                  <Input
                    className="w-[100%]"
                    value={quantity}
                    onChange={handleQuantity}
                    placeholder="Nhập số lượng"
                  />
                  <Button
                    onClick={() => reStock(record, "update")}
                    className="bg-[#4096FF]"
                    type="primary"
                  >
                    OK
                  </Button>
                  <Button
                    onClick={() => reStock(record, "add")}
                    className="bg-[#4096FF]"
                    type="primary"
                  >
                    +
                  </Button>
                </Space>
              </div>
            }
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Restock <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      align: "center",
      width: 200,
      dataIndex: "SkuEnable",
      render: (_, record) => (
        <div className="">
          {record?.SkuEnable ? (
            <Tag bordered={false} color="processing">
              Enable
            </Tag>
          ) : (
            <Tag bordered={false} color="error">
              Disable
            </Tag>
          )}
          {record?.quantity === 0 && (
            <Tag bordered={false} color="warning">
              Sold out
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Khóa/Mở",
      align: "center",
      width: 100,
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex w-full justify-around">
          <Space size="middle">
            {record?.SkuEnable ? (
              <Button
                onClick={() => handleOnCLickLock(record, 0)}
                icon={<LockOutlined />}
              />
            ) : (
              <Button
                onClick={() => handleOnCLickLock(record, 1)}
                icon={<UnlockOutlined />}
              />
            )}
          </Space>
        </div>
      ),
    },
  ];
  if (listSku.length > 1) {
    columns.splice(1, 0, {
      title: "Phân loại",
      align: "center",
      dataIndex: "attribute",
      render: (_, record) => (
        <div className="flex w-full justify-around">
          {record?.attribute.length === 1 ? (
            <p>{record?.attribute[0]?.locAttributeValueName}</p>
          ) : record?.attribute.length === 2 ? (
            <p>{`${record?.attribute[0]?.locAttributeValueName} - ${record?.attribute[1]?.locAttributeValueName}`}</p>
          ) : null}
        </div>
      ),
    });
  }

  const handleOnCLickLock = async (record, enable) => {
    const content =
      enable === 0
        ? "Are you sure you want to lock this sku?"
        : "Are you sure you want to unlock this sku?";

    const check = await notify.notify2(
      "Lock/Unlock",
      "warning",
      content,
      "Yes",
      "No"
    );
    if (check) {
      const res = await productServices.enableSku(record?.productSKUID, enable);
      if (res) {
        let newListSku = [...listSku];
        let index = newListSku.findIndex(
          (item) => item.productSKUID === record.productSKUID
        );
        newListSku[index].SkuEnable = enable === 1;
        setListSku(newListSku);
      }
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <b className="!pb-[20px] !pr-[20px] font-bold text-lg text-left">
          Thông tin bán hàng:
        </b>
      </div>
      <div className="flex justify-start">
        <Space
          direction="vertical"
          style={{
            width: "100%",
            marginLeft: "2%",
            marginRight: "2%",
            paddingBottom: "50px",
          }}
        >
          <Table
            className=""
            bordered={true}
            columns={columns}
            dataSource={listSku}
            pagination={false}
          />
        </Space>
      </div>
    </>
  );
};

export default App;
