import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { productServices } from "../../../../services/productService";
import { Table, Tag, Space } from "antd";
import { useSelector } from "react-redux";
import { notify } from "../../../../utils/notify";
import { LockOutlined, UnlockOutlined, EditOutlined } from "@ant-design/icons";

const Bodymain = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const sortBy = useSelector((state) => state.counterProduct.sortBy);
  const [countList, setCountList] = useState(100);

  const fetchProduct = useCallback(
    async (offset, limit) => {
      try {
        console.log("fetchProduct", offset, limit, sortBy);
        const res = await productServices.listProduct(offset, limit, sortBy);
        if (res) {
          setListProduct(res.result || []);
          setPagination((prev) => ({ ...prev, total: res.total }));
          setCountList(res.total);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    [sortBy]
  );

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setPagination(pagination);
    const offset = (pagination.current - 1) * pagination.pageSize;
    const limit = pagination.pageSize;
    fetchProduct(offset, limit);
  };

  useEffect(() => {
    console.log("sortBy", sortBy);
    fetchProduct(0, pagination.pageSize);
  }, [fetchProduct, pagination.pageSize, sortBy]);

  const handleOnCLickLock = async (record, enable) => {
    let content =
      enable === true
        ? "Bạn có chắc muốn ẩn sản phẩm này không?"
        : "Bạn có chắc muốn hiển thị sản phẩm này không?";
    const check = await notify.notify2("", "warning", content, "Có", "Không");
    if (check) {
      const res = await productServices.enableProduct(
        record?.productID,
        enable === true ? 0 : 1
      );
      if (res) {
        let newListProduct = [...listProduct];
        let index = newListProduct.findIndex(
          (item) => item.productID === record.productID
        );
        if (enable === true) {
          newListProduct[index].productEnable = false;
        } else {
          newListProduct[index].productEnable = true;
        }
        setListProduct(newListProduct);
      }
    }
  };

  const handleOnCLickEdit = (record) => {
    navigate(`/product/edit/${record?.productID}`);
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "name",
      render: (_, record) => (
        <img
          className="w-[50px] h-[50px]"
          src={record?.medias[0]?.linkString}
          alt={record?.productName}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (_, record) => (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/product/edit/${record?.productID}`);
          }}
        >
          {" "}
          {record?.productName}
        </p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "productEnable",
      render: (_, record) =>
        record?.productEnable === true ? (
          <Tag bordered={false} color="processing">
            Hiển thị
          </Tag>
        ) : (
          <Tag bordered={false} color="error">
            Ẩn
          </Tag>
        ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            onClick={() => handleOnCLickLock(record, record?.productEnable)}
          >
            {record?.productEnable === true ? (
              <LockOutlined />
            ) : (
              <UnlockOutlined />
            )}
          </button>
          <button type="button" onClick={() => handleOnCLickEdit(record)}>
            <EditOutlined />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        className="p-[25px] transition-all duration-300 bg-[#FAFAFA]"
        columns={columns}
        dataSource={listProduct}
        pagination={{
          ...pagination,
          position: ["topCenter"],
          total: countList,
          totalPage: Math.ceil(countList / pagination.pageSize),
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Bodymain;
