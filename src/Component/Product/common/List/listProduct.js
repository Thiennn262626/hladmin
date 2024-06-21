import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productServices } from "../../../../services/productService";
import { Table, Tag, Space } from "antd";
import {
  setLoadProduct,
  setModalSkus,
  setProductID,
} from "../../counterProduct";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/notify";
import { LockOutlined, UnlockOutlined, EditOutlined } from "@ant-design/icons";
const Bodymain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const sortBy = useSelector((state) => state.counterProduct.sortBy);
  const [countList, setCountList] = useState(100);

  const fetchProduct = async (offset, limit) => {
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
  };

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setPagination(pagination);
    const offset = (pagination.current - 1) * pagination.pageSize;
    const limit = pagination.pageSize;
    fetchProduct(offset, limit);
  };

  useEffect(() => {
    console.log("sortBy", sortBy);
    fetchProduct(0, pagination.pageSize);
  }, [sortBy]);

  const handleOnCLick = (record) => {
    dispatch(setModalSkus(true));
    dispatch(setProductID(record?.productID));
  };

  const handleOnCLickLock = async (record, enable) => {
    let content =
      enable === 0
        ? "Bạn có chắc muốn ẩn sản phẩm này không?"
        : "Bạn có chắc muốn hiển thị sản phẩm này không?";
    const check = await notify.notify2("", "warning", content, "Có", "Không");
    if (check) {
      const res = await productServices.enableProduct(
        record?.productID,
        enable
      );
      if (res) {
        let newListProduct = [...listProduct];
        let index = newListProduct.findIndex(
          (item) => item.productID === record.productID
        );
        if (enable === 0) {
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
        ></img>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (_, record) => (
        <p onClick={() => handleOnCLick(record)}> {record?.productName}</p>
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
          <a onClick={() => handleOnCLickLock(record, 0)}>
            {record?.productEnable === true ? (
              <LockOutlined />
            ) : (
              <UnlockOutlined />
            )}
          </a>
          <a onClick={() => handleOnCLickEdit(record, 0)}>
            {"   "}
            <EditOutlined />
          </a>
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
          total: countList, // Cập nhật lại total từ countList
          totalPage: Math.ceil(countList / pagination.pageSize),
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Bodymain;
