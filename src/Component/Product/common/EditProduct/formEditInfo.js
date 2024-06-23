import React, { useState, useEffect } from "react";
import { productServices } from "../../../../services/productService";
import { Form, Input, Select, Button } from "antd";
import { ClearOutlined, SaveOutlined } from "@ant-design/icons";
import { notify } from "../../../../utils/notify";
const { TextArea } = Input;

const FormEditInfo = ({ product }) => {
  const [dataEditProductInfo, setDataEditProductInfo] = useState({
    productID: product.productID,
    productName: "",
    productSlogan: "",
    productDescription: "",
    productMadeIn: "",
    productCategoryID: "",
  });

  const [dataEditProductDelivery, setDataEditProductDelivery] = useState({
    productID: product.productID,
    productHeight: "",
    productWidth: "",
    productLength: "",
    productWeight: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (product) {
      setDataEditProductInfo({
        productID: product.productID,
        productName: product.productName || "",
        productSlogan: product.productSlogan || "",
        productDescription: product.productDescription || "",
        productMadeIn: product.productMadeIn || "",
        productCategoryID: product.productCategory?.productCategoryID || "",
      });

      setDataEditProductDelivery({
        productID: product.productID,
        productHeight: product.productHeight || "",
        productWidth: product.productWidth || "",
        productLength: product.productLength || "",
        productWeight: product.productWeight || "",
      });
    }
  }, [product]);

  useEffect(() => {
    const getCategory = async () => {
      const response = await productServices.getCategory();
      if (response) {
        setCategory(response.result);
      }
    };
    getCategory();
  }, []);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setDataEditProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDataEditProductDelivery((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  const handleSelectChange = (value) => {
    setDataEditProductInfo((prev) => ({
      ...prev,
      productCategoryID: value,
    }));
  };

  const clearInputInfo = () => {
    setDataEditProductInfo({
      productName: "",
      productSlogan: "",
      productDescription: "",
      productMadeIn: "",
      productCategoryID: "",
    });
  };

  const clearInputDelivery = () => {
    setDataEditProductDelivery({
      productHeight: "",
      productWidth: "",
      productLength: "",
      productWeight: "",
    });
  };

  const saveProductInfo = async () => {
    try {
      // Kiểm tra null cho dataEditProductInfo
      const {
        productName,
        productSlogan,
        productDescription,
        productMadeIn,
        productCategoryID,
      } = dataEditProductInfo;

      if (
        !productName ||
        !productSlogan ||
        !productDescription ||
        !productMadeIn ||
        !productCategoryID
      ) {
        notify.notify1("Vui lòng nhập đầy đủ thông tin sản phẩm.", "error");
        return;
      }

      const content = `
      Bạn có chắc chắn muốn cập nhật thông tin sản phẩm với các thông tin sau?
    `;

      const check = await notify.notify2(
        "Cập nhật thông tin sản phẩm",
        "warning",
        content,
        "Có",
        "Không"
      );

      if (check) {
        await productServices.updateProductInfo(dataEditProductInfo);
      }
    } catch (error) {
      notify.notify1("Cập nhật thông tin sản phẩm thất bại.", "error");
    }
  };

  const saveDeliveryInfo = async () => {
    try {
      // Kiểm tra null và là số cho dataEditProductDelivery
      const { productHeight, productWidth, productLength, productWeight } =
        dataEditProductDelivery;

      if (
        isNaN(productHeight) ||
        productHeight <= 0 ||
        isNaN(productWidth) ||
        productWidth <= 0 ||
        isNaN(productLength) ||
        productLength <= 0 ||
        isNaN(productWeight) ||
        productWeight <= 0
      ) {
        notify.notify1(
          "Vui lòng nhập đúng thông tin vận chuyển sản phẩm.",
          "error"
        );
        return;
      }

      const content = `
      Bạn có chắc chắn muốn cập nhật thông tin vận chuyển sản phẩm với các thông tin sau?
      - Height: ${productHeight} cm
      - Width: ${productWidth} cm
      - Length: ${productLength} cm
      - Weight: ${productWeight} g
    `;

      const check = await notify.notify2(
        "Cập nhật thông tin vận chuyển sản phẩm",
        "warning",
        content,
        "Có",
        "Không"
      );

      if (check) {
        await productServices.updateProductDelivery(dataEditProductDelivery);
      }
    } catch (error) {
      notify.notify1(
        "Cập nhật thông tin vận chuyển sản phẩm thất bại.",
        "error"
      );
    }
  };

  return (
    <>
      <div className="flex justify-start mb-3">
        <b className="!pb-[20px] !pr-[20px] font-bold text-lg">
          Thông tin sản phẩm
        </b>
        <Button type="text" icon={<ClearOutlined />} onClick={clearInputInfo}>
          ---
        </Button>
        <Button type="text" icon={<SaveOutlined />} onClick={saveProductInfo}>
          Lưu thay đổi
        </Button>
      </div>
      <Form.Item label="Tên sản phẩm" labelAlign="left">
        <Input
          maxLength={120}
          name="productName"
          value={dataEditProductInfo.productName}
          onChange={handleInfoChange}
        />
      </Form.Item>
      <Form.Item label="Mô tả ngắn" labelAlign="left">
        <TextArea
          rows={2}
          maxLength={500}
          name="productSlogan"
          value={dataEditProductInfo.productSlogan}
          onChange={handleInfoChange}
        />
      </Form.Item>
      <Form.Item label="Mô tả" labelAlign="left">
        <TextArea
          rows={4}
          maxLength={3000}
          name="productDescription"
          value={dataEditProductInfo.productDescription}
          onChange={handleInfoChange}
        />
      </Form.Item>
      <Form.Item label="Danh mục" labelAlign="left">
        <Select
          value={dataEditProductInfo.productCategoryID}
          onChange={handleSelectChange}
          style={{ textAlign: "left" }}
        >
          {category.length > 0 &&
            category.map((item) => (
              <Select.Option
                key={item.productCategoryID}
                value={item.productCategoryID}
              >
                {item.productCategoryName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Xuất xứ" labelAlign="left">
        <Input
          maxLength={30}
          name="productMadeIn"
          value={dataEditProductInfo.productMadeIn}
          onChange={handleInfoChange}
        />
      </Form.Item>
      <div className="flex justify-start mb-3">
        <b className="!pb-[20px] !pr-[20px] font-bold text-lg">
          Thông tin vận chuyển
        </b>
        <Button
          type="text"
          icon={<ClearOutlined />}
          onClick={clearInputDelivery}
        >
          ---
        </Button>
        <Button type="text" icon={<SaveOutlined />} onClick={saveDeliveryInfo}>
          Lưu thay đổi
        </Button>
      </div>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 3 }}>
        <Form.Item label="Chiều cao" labelAlign="left">
          <Input
            maxLength={30}
            name="productHeight"
            value={dataEditProductDelivery.productHeight}
            onChange={handleDeliveryChange}
            addonAfter="cm"
          />
        </Form.Item>
        <Form.Item label="Chiều rộng" labelAlign="left">
          <Input
            maxLength={30}
            name="productWidth"
            value={dataEditProductDelivery.productWidth}
            onChange={handleDeliveryChange}
            addonAfter="cm"
          />
        </Form.Item>
        <Form.Item label="Chiều dài" labelAlign="left">
          <Input
            maxLength={30}
            name="productLength"
            value={dataEditProductDelivery.productLength}
            onChange={handleDeliveryChange}
            addonAfter="cm"
          />
        </Form.Item>
        <Form.Item label="Trọng lượng" labelAlign="left">
          <Input
            maxLength={30}
            name="productWeight"
            value={dataEditProductDelivery.productWeight}
            onChange={handleDeliveryChange}
            addonAfter="g"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default FormEditInfo;
