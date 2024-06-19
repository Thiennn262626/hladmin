import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
import { InputNumber, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  setSearch,
  setSortBy,
  setMin,
  setMax,
  setLoadProduct,
} from "../../counterProduct";

const App = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("inline");
  const [sortBy, setSortBy1] = useState(-1);

  const handleSubmit = () => {
    dispatch(setLoadProduct(true));
  };

  const handleSortBy = (e) => {
    setSortBy1(e.target.value);
    dispatch(setSortBy(e.target.value));
    dispatch(setLoadProduct(true));
  };

  return (
    <div className="transition-all duration-300 bg-[#FFFFFF] flex justify-center">
      <Form
        className="p-[25px] flex flex-wrap justify-between"
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        style={{
          maxWidth: formLayout === "inline" ? "none" : 600,
        }}
      >
        <Form.Item name="layout" className="w-full md:w-auto">
          <Radio.Group value={sortBy} onChange={handleSortBy}>
            <Radio.Button value={0}>Đang bán</Radio.Button>
            <Radio.Button value={1}>Đang khóa</Radio.Button>
            <Radio.Button value={2}>Giá tăng dần</Radio.Button>
            <Radio.Button value={3}>Giá giảm dần</Radio.Button>
            <Radio.Button value={4}>Tên A-Z</Radio.Button>
            <Radio.Button value={5}>Tên Z-A</Radio.Button>
            <Radio.Button value={6}>Mới nhất</Radio.Button>
            <Radio.Button value={7}>Cũ nhất</Radio.Button>
            <Radio.Button value={8}>Số lượng tồn kho tăng dần</Radio.Button>
            <Radio.Button value={9}>Số lượng tồn kho giảm dần</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};
//0: dang ban, 1: dang khoa, 2: gia tang dan, 3: gia giam dan,
//4: ten a-z, 5: ten z-a, 6: moi nhat, 7: cu nhat,
//8: so luong ton kho tang dan, 9: so luong ton kho giam dan
export default App;
