import React from 'react'
import {orderServices} from '../../../services/orderService'
import { Space, Table } from 'antd';
import { useState, useEffect } from 'react';
import classname from "classnames/bind";
import styles from "./../order.module.scss";
 const Bodymain = () => {
    const handleClick = (e) => {
    console.log('handleClick: ', e);
    };
    const orderStatusList = [
  "ORDER_STATUS_NEW",
  "ORDER_STATUS_APPROVED",
  "ORDER_STATUS_PACKING",
  "ORDER_STATUS_ON_DELIVERING",
  "ORDER_STATUS_DELIVERY_SUCCESS",
  "ORDER_STATUS_CUSTOMER_CANCELLED",
  "ORDER_STATUS_SELLER_CANCELLED",
  "ORDER_STATUS_RETURNED"
]; 
const calculateTotalPrice = (dataOrder) => {
    const productTotal = dataOrder.dataOrderItem.reduce((total, item) => total + item.quantity * item.price, 0);
    const totalPriceWithShipping = productTotal + dataOrder.orderShippingFee.shippingFee;
    return totalPriceWithShipping;
  };
const handleDetailOrder = (orderID) => {
    console.log('handleDetailOrder: '+orderID);
}
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            const res = await orderServices.getListOrderByStatus(0);
            setOrder(res);
            console.log(99999,res); 
        }
        fetchOrder();
        
    }, []);
    
    const columns = [
    {
      //title so luong don hang
    //   title: ,
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: (orderCode, dataOrder) => (
      <div className={cx("orderContainer")} onClick={() => handleDetailOrder(dataOrder.orderID)}>
          <div className={cx("orderCode")}>Mã đơn hàng: {orderCode}</div>
          <div className={cx("orderContent")}>
              <div className={cx("orderItem")}>
                  {dataOrder.dataOrderItem.map((item, index) => (
                      <div key={index} className={cx("orderItemDetail")}>
                          <div className={cx("imgAndInfo")}>
                              <img className={cx("imgOrderItem")} src={item.medias[0]?.linkString} alt={item.productName} />
                              <div className={cx("productInfo")}>
                                  <p className={cx("productName")}>{item.productName}</p>
                                  <div className={cx("priceAndQuantity")}>
                                      <p>Quantity: {item.quantity}</p>
                                      <p>Price: {item.price}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
              <div className={cx("orderSummary")}>
                  <div className={cx("feeShipColumn")}>Phí vận chuyển: {dataOrder.orderShippingFee.shippingFee}</div>
                  <div className={cx("totalPriceColumn")}>Tổng giá: {calculateTotalPrice(dataOrder)}</div>
                  <div className={cx("actionColumn")}>
                      <Space size="middle">
                          <a onClick={() => handleClick(dataOrder.orderID)}>Duyệt</a>
                      </Space>
                  </div>
              </div>
          </div>
      </div>
      ),
    },
  ];

const cx = classname.bind(styles);
  return <>
    <Table className={cx("tableOrder")} columns={columns} dataSource={order} />
   </>
  
}

export default Bodymain
