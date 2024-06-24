import React, { useState, useEffect } from "react";
import { productServices } from "../../../../services/productService";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
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
import { ClearOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const Index = () => {
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

  useEffect(() => {
    dispatch(setProductName(name));
  }, [name, dispatch]);
  useEffect(() => {
    dispatch(setProductSlogan(slogan));
  }, [slogan, dispatch]);
  useEffect(() => {
    dispatch(setProductDescription(description));
  }, [description, dispatch]);
  useEffect(() => {
    dispatch(setProductMadeIn(madeIn));
  }, [madeIn, dispatch]);
  useEffect(() => {
    dispatch(setProductHeight(height));
  }, [height, dispatch]);
  useEffect(() => {
    dispatch(setProductWidth(width));
  }, [width, dispatch]);
  useEffect(() => {
    dispatch(setProductLength(length));
  }, [length, dispatch]);
  useEffect(() => {
    dispatch(setProductWeight(weight));
  }, [weight, dispatch]);
  useEffect(() => {
    dispatch(setProductCategoryID(categoryID));
  }, [categoryID, dispatch]);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const response = await productServices.getCategory();
      if (response) {
        setCategory(response?.result);
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

  // Hàm xóa các thuộc tính input
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
        <Button type="text" icon={<ClearOutlined />} onClick={clearInputInfo}>
          ---
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
          rows={6}
          maxLength={3000}
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
          Kích thước & Trọng lượng
        </b>
        <Button
          type="text"
          icon={<ClearOutlined />}
          onClick={clearInputDelivery}
        >
          ---
        </Button>
      </div>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 3 }}>
        <Form.Item label="Chiều cao" labelAlign="left">
          <Input
            maxLength={30}
            value={height}
            onChange={onChangeProductHeight}
            addonAfter="cm"
          />
        </Form.Item>
        <Form.Item label="Chiều rộng" labelAlign="left">
          <Input
            maxLength={30}
            value={width}
            onChange={onChangeProductWidth}
            addonAfter="cm"
          />
        </Form.Item>
        <Form.Item label="Chiều dài" labelAlign="left">
          <Input
            maxLength={30}
            value={length}
            onChange={onChangeProductLength}
            addonAfter="cm"
          />
        </Form.Item>
        <Form.Item label="Trọng lượng" labelAlign="left">
          <Input
            maxLength={30}
            value={weight}
            onChange={onChangeProductWeight}
            addonAfter="g"
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default Index;
