import React from "react";
import FormAddImg from "./formImg";
import FormInfo from "./formInfo";
import FormAttributes from "./formAttributes";
import Test from "../../../Test.tsx";
import { Form } from "antd";

const Index = () => {
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
      <FormAttributes />
      <Test />
    </Form>
  );
};
export default Index;
