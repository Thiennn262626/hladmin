import React, { useState, useEffect } from 'react';
import { Col, Row, DatePicker, Table } from 'antd';
import { homeServices } from '../../../services/homeService';

const ProductListSale = () => {
  const [productListSale, setProductListSale] = useState([]);

  useEffect(() => {
    homeServices.getProductListSale().then((res) => {
        console.log(res);
      setProductListSale(res.result);
    });
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
 const cols1 = productListSale.map((task, index) => (
    <Col key={index.toString()} span={3}>
      <div className="p-4 bg-gray-50 text-center h-auto rounded shadow-sm">
        <img
          className="object-cover mx-auto mb-2 rounded-lg h-auto w-36"
          src={task?.medias[0]?.linkString}
          alt={task?.productName}
        />
        <div className="ml-2">
          <h2 className="text-black text-lg truncate-text overflow-hidden whitespace-nowrap">{task?.productName}</h2>
          <p className="text-gray-500 text-sm">{VND.format(task?.productSKU[0]?.price)}</p>
        </div>
      </div>
    </Col>
  ));

  return (
    <div className="bg-white h-auto p-4 mb-4">
      <div className="flex flex-col items-start ">
        <h1 className="text-black text-xl font-bold pb-4">Danh sách sản phẩm đang bán chạy</h1>
      </div>
      <Row gutter={[10, 10]}>{cols1}</Row>
    </div>
  );
}

export default ProductListSale;
