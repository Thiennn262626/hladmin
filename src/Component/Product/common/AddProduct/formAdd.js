import React from "react";
import FormAddImg from "./formImg";
import FormInfo from "./formInfo";
import ImputInfoItem from "./ImputInfoItem.tsx";
import { Form } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { productServices } from "../../../../services/productService.js";
import { notify } from "../../../../utils/notify.js";

const Index = () => {
  const dataPost = useSelector((state) => state.counterProduct.dataPost);
  const [loadings, setLoadings] = useState(false);
  const enterLoading = async () => {
    //kiểm tra dữ liệu
    if (dataPost.productName === "") {
      notify.notify1("Vui lòng nhập tên sản phẩm", "error");
      return;
    }
    if (dataPost.productSlogan === "") {
      notify.notify1("Vui lòng nhập slogan", "error");
      return;
    }
    if (dataPost.productDescription === "") {
      notify.notify1("Vui lòng nhập mô tả", "error");
      return;
    }
    if (dataPost.productMadeIn === "") {
      notify.notify1("Vui lòng nhập xuất xứ", "error");
      return;
    }
    if (dataPost.productHeight === "") {
      notify.notify1("Vui lòng nhập chiều cao", "error");
      return;
    }
    if (dataPost.productWidth === "") {
      notify.notify1("Vui lòng nhập chiều rộng", "error");
      return;
    }
    if (dataPost.productLength === "") {
      notify.notify1("Vui lòng nhập chiều dài", "error");
      return;
    }
    if (dataPost.productWeight === "") {
      notify.notify1("Vui lòng nhập cân nặng", "error");
      return;
    }
    if (dataPost.productCategoryID === "") {
      notify.notify1("Vui lòng nhập danh mục", "error");
      return;
    }
    if (dataPost.productSKUs.length === 0) {
      notify.notify1("Vui lòng nhập SKU", "error");
      return;
    }
    setLoadings(true);
    const response = await productServices.addProduct(dataPost);
    if (response) {
      setLoadings(false);
    }
  };
  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      style={{ maxWidth: 1500, marginBottom: 200 }}
      className="bg-white p-4 m-[20px]"
    >
      <FormAddImg />
      <FormInfo />
      <ImputInfoItem />
      <Button
        type="primary"
        icon={<FolderAddOutlined />}
        loading={loadings}
        onClick={() => enterLoading(1)}
        className="!bg-blue-500 !text-white !hover:bg-green-600 !border-none !rounded-lg !shadow-xl h-[50px] w-[240px] mt-4"
      >
        Thêm sản phẩm
      </Button>
    </Form>
  );
};
export default Index;
