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
    // if (dataPost.productNotes === "") {
    //   notify.notify1("Vui lòng nhập ghi chú", "error");
    //   return;
    // }
    // if (dataPost.productUses === "") {
    //   notify.notify1("Vui lòng nhập công dụng", "error");
    //   return;
    // }
    // if (dataPost.productIngredient === "") {
    //   notify.notify1("Vui lòng nhập thành phần", "error");
    //   return;
    // }
    // if (dataPost.productObjectsOfUse === "") {
    //   notify.notify1("Vui lòng nhập đối tượng sử dụng", "error");
    //   return;
    // }
    // if (dataPost.productPreserve === "") {
    //   notify.notify1("Vui lòng nhập bảo quản", "error");
    //   return;
    // }
    // if (dataPost.productInstructionsForUse === "") {
    //   notify.notify1("Vui lòng nhập hướng dẫn sử dụng", "error");
    //   return;
    // }
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
    ImputInfoItem.setLoadings(true);
    const response = await productServices.addProduct(dataPost);
    if (response) {
      setLoadings(false);
    }
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 1300 }}
      className="!mx-auto bg-white p-4 border border-gray-300 rounded-lg shadow-xl mt-[30px] mb-[30px]"
    >
      <FormAddImg />
      <FormInfo />
      <ImputInfoItem />
      <Button
        type="primary"
        icon={<FolderAddOutlined />}
        loading={loadings}
        onClick={() => enterLoading(1)}
        className="!bg-blue-500 !text-white !hover:bg-green-600 !border-none !rounded-lg !shadow-xl  "
      >
        Thêm sản phẩm
      </Button>
    </Form>
  );
};
export default Index;
