import React, { useState, useEffect } from "react";
import { productServices } from "../../../../services/productService";
import { Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductName,
  setProductSlogan,
  setProductDescription,
  setProductMadeIn,
  setProductHeight,
  setProductWidth,
  setProductLength,
  setProductWeight,
  setProductCategoryID,
} from "../../counterProduct";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const FormEditInfo = ({ product }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [madeIn, setMadeIn] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [categoryID, setCategoryID] = useState("");

  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.productName || "");
      setSlogan(product.productSlogan || "");
      setDescription(product.productDescription || "");
      setMadeIn(product.productMadeIn || "");
      setHeight(product.productHeight || "");
      setWidth(product.productWidth || "");
      setLength(product.productLength || "");
      setWeight(product.productWeight || "");
      setCategoryID(product.productCategory?.productCategoryID || "");
    }
  }, [product]);

  useEffect(() => {
    dispatch(setProductName(name));
  }, [name]);

  useEffect(() => {
    dispatch(setProductSlogan(slogan));
  }, [slogan]);

  useEffect(() => {
    dispatch(setProductDescription(description));
  }, [description]);

  useEffect(() => {
    dispatch(setProductMadeIn(madeIn));
  }, [madeIn]);

  useEffect(() => {
    dispatch(setProductHeight(height));
  }, [height]);

  useEffect(() => {
    dispatch(setProductWidth(width));
  }, [width]);

  useEffect(() => {
    dispatch(setProductLength(length));
  }, [length]);

  useEffect(() => {
    dispatch(setProductWeight(weight));
  }, [weight]);

  useEffect(() => {
    dispatch(setProductCategoryID(categoryID));
  }, [categoryID]);

  useEffect(() => {
    const getCategory = async () => {
      const response = await productServices.getCategory();
      if (response) {
        setCategory(response.result);
      }
    };
    getCategory();
  }, []);

  const onChangeProductName = (e) => {
    setName(e.target.value);
  };

  const onChangeProductSlogan = (e) => {
    setSlogan(e.target.value);
  };

  const onChangeProductDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeProductMadeIn = (e) => {
    setMadeIn(e.target.value);
  };

  const onChangeProductHeight = (e) => {
    setHeight(e.target.value);
  };

  const onChangeProductWidth = (e) => {
    setWidth(e.target.value);
  };

  const onChangeProductLength = (e) => {
    setLength(e.target.value);
  };

  const onChangeProductWeight = (e) => {
    setWeight(e.target.value);
  };

  const onChangeProductCategoryID = (value) => {
    setCategoryID(value);
  };

  // Clear input fields
  const clearInputInfo = () => {
    setName("");
    setSlogan("");
    setDescription("");
    setMadeIn("");
    setCategoryID("");
  };

  const clearInputDelivery = () => {
    setHeight("");
    setWidth("");
    setLength("");
    setWeight("");
  };

  return (
    <>
      <div className="flex justify-start mb-3">
        <b className="!pb-[20px] !pr-[20px] font-bold text-lg">
          Thông tin sản phẩm
        </b>
        <Button type="text" icon={<DeleteOutlined />} onClick={clearInputInfo}>
          Làm sạch
        </Button>
        <Button type="text" icon={<SaveOutlined />} onClick={() => {}}>
          Lưu thay đổi
        </Button>
      </div>
      <Form.Item label="Tên sản phẩm" labelAlign="left">
        <Input maxLength={120} value={name} onChange={onChangeProductName} />
      </Form.Item>
      <Form.Item label="Mô tả ngắn" labelAlign="left">
        <TextArea
          rows={2}
          maxLength={500}
          value={slogan}
          onChange={onChangeProductSlogan}
        />
      </Form.Item>
      <Form.Item label="Mô tả" labelAlign="left">
        <TextArea
          rows={4}
          maxLength={1000}
          value={description}
          onChange={onChangeProductDescription}
        />
      </Form.Item>
      <Form.Item label="Danh mục" labelAlign="left">
        <Select
          value={categoryID}
          onChange={onChangeProductCategoryID}
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
        <Input maxLength={30} value={madeIn} onChange={onChangeProductMadeIn} />
      </Form.Item>
      <div className="flex justify-start mb-3">
        <b className="!pb-[20px] !pr-[20px] font-bold text-lg">
          Thông tin vận chuyển
        </b>
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={clearInputDelivery}
        >
          Làm sạch
        </Button>
        <Button type="text" icon={<SaveOutlined />} onClick={() => {}}>
          Lưu thay đổi
        </Button>
      </div>
      <Form.Item label="Chiều cao" labelAlign="left">
        <Input maxLength={30} value={height} onChange={onChangeProductHeight} />
      </Form.Item>
      <Form.Item label="Chiều rộng" labelAlign="left">
        <Input maxLength={30} value={width} onChange={onChangeProductWidth} />
      </Form.Item>
      <Form.Item label="Chiều dài" labelAlign="left">
        <Input maxLength={30} value={length} onChange={onChangeProductLength} />
      </Form.Item>
      <Form.Item label="Trọng lượng" labelAlign="left">
        <Input maxLength={30} value={weight} onChange={onChangeProductWeight} />
      </Form.Item>
    </>
  );
};

export default FormEditInfo;
