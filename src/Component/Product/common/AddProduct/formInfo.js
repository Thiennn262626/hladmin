import React, { useState, useEffect } from "react";
import { productServices } from "../../../../services/productService";
import { Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductName,
  setProductSlogan,
  setProductDescription,
  setProductNotes,
  setProductMadeIn,
  setProductUses,
  setProductIngredient,
  setProductObjectsOfUse,
  setProductPreserve,
  setProductInstructionsForUse,
  setProductHeight,
  setProductWidth,
  setProductLength,
  setProductWeight,
  setProductCategoryID,
} from "../../counterProduct";
import { DeleteOutlined } from "@ant-design/icons";
import { set } from "nprogress";
const { TextArea } = Input;
const Index = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [madeIn, setMadeIn] = useState("");
  // const [notes, setNotes] = useState("");
  // const [uses, setUses] = useState("");
  // const [ingredient, setIngredient] = useState("");
  // const [objectsOfUse, setObjectsOfUse] = useState("");
  // const [preserve, setPreserve] = useState("");
  // const [instructionsForUse, setInstructionsForUse] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [categoryID, setCategoryID] = useState("");

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
  // useEffect(() => {
  //   dispatch(setProductNotes(notes));
  // }, [notes]);
  // useEffect(() => {
  //   dispatch(setProductUses(uses));
  // }, [uses]);
  // useEffect(() => {
  //   dispatch(setProductIngredient(ingredient));
  // }, [ingredient]);
  // useEffect(() => {
  //   dispatch(setProductObjectsOfUse(objectsOfUse));
  // }, [objectsOfUse]);
  // useEffect(() => {
  //   dispatch(setProductPreserve(preserve));
  // }, [preserve]);
  // useEffect(() => {
  //   dispatch(setProductInstructionsForUse(instructionsForUse));
  // }, [instructionsForUse]);
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
  // const onChangeProductNotes = (e) => {
  //   setNotes(e.target.value);
  // };
  // const onChangeProductUses = (e) => {
  //   setUses(e.target.value);
  // };
  // const onChangeProductIngredient = (e) => {
  //   setIngredient(e.target.value);
  // };
  // const onChangeProductObjectsOfUse = (e) => {
  //   setObjectsOfUse(e.target.value);
  // };
  // const onChangeProductPreserve = (e) => {
  //   setPreserve(e.target.value);
  // };
  // const onChangeProductInstructionsForUse = (e) => {
  //   setInstructionsForUse(e.target.value);
  // };
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

  //hàm xóa các thuộc tính input
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
      {/* <Form.Item label="Ghi chú">
      <TextArea rows={3} maxLength={1000} value={notes} onChange={onChangeProductNotes} />
    </Form.Item>
    <Form.Item label="Công dụng">
      <TextArea rows={3} maxLength={500} value={uses} onChange={onChangeProductUses} />
    </Form.Item>
    <Form.Item label="Thành phần">
      <TextArea rows={3} maxLength={500} value={ingredient} onChange={onChangeProductIngredient} />
    </Form.Item> */}
      {/* <Form.Item label="Đối tượng sử dụng">
      <TextArea rows={3} maxLength={500} value={objectsOfUse} onChange={onChangeProductObjectsOfUse} />
    </Form.Item>
    <Form.Item label="Bảo quản">
      <TextArea rows={3} maxLength={500} value={preserve} onChange={onChangeProductPreserve} />
    </Form.Item> */}
      {/* <Form.Item label="Hướng dẫn sử dụng">
      <TextArea rows={3} maxLength={500} value={instructionsForUse} onChange={onChangeProductInstructionsForUse} />
    </Form.Item> */}
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
