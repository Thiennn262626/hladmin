import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { homeServices } from "../../../services/homeService";

const NeedWork = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homeServices.getNetWork();
        if (res && res.data) {
          setTasks(res.data);
        }
      } catch (error) {
        // Xử lý lỗi khi gọi API không thành công
        console.error("Error fetching network data:", error);
      }
    };
    fetchData();
  }, []);

  // Cấu trúc các cột
  const cols1 = tasks.map((task, index) => (
    <Col key={index.toString()} span={24 / tasks.length}>
      <div className="p-4 bg-gray-50 text-center">
        <h1 className="text-blue-500 text-2xl m-2">{task.count}</h1>
        <h2 className="text-black text-x text-x">{task.desc}</h2>
      </div>
    </Col>
  ));

  return (
    <div className="bg-white h-auto p-4 mb-4">
      <div className="flex flex-col items-start ">
        <h1 className="text-black text-xl font-bold py-1">Danh sách cần làm</h1>
        <h2 className="text-black text-x opacity-50 pb-3">Những việc bạn sẽ phải làm</h2>
      </div>
      <Row gutter={[15, 15]}>{cols1}</Row>
    </div>
  );
};

export default NeedWork;
