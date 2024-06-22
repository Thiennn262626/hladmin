import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEditImg from "./common/EditProduct/formEditImg";
import FormEditInfo from "./common/EditProduct/formEditInfo";
import FormEditSku from "./common/EditProduct/formEditSku";
import { Form } from "antd";
import { productServices } from "../../services/productService";

const Index = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productServices.getProductById(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      style={{ maxWidth: 1500, marginBottom: 200 }}
      className="bg-white p-4 m-[20px]"
      initialValues={product}
    >
      <FormEditImg product={product} />
      <FormEditInfo product={product} />
      <FormEditSku product={product} />
    </Form>
  );
};

export default Index;
