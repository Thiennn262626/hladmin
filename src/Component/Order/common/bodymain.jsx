import React, { useState, useEffect } from 'react'
import { orderServices } from '../../../services/orderService'
import { Table, Button } from 'antd';
import classname from "classnames/bind";
import styles from "./../order.module.scss";
import { setOpenDrawerApply, setIdOrder, setLoangding } from '../../slice/couterSlice';
import { useDispatch, useSelector } from 'react-redux';
import DrawerApply from './drawer';
import { notify } from '../../../utils/notify';
const Bodymain = ({ status }) => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState([]);
    const isLoading = useSelector(state => state.counter.isLoading);
    const openDrawerApply = () => {
        dispatch(setOpenDrawerApply(true));
    }
    useEffect(() => {
        setOrder([]);
    }, [status])

    const handleDetailOrder = (orderID) => {
        dispatch(setIdOrder(orderID));
        openDrawerApply();
    }

    useEffect(() => {
        if (isLoading === false) {
            return;
        }
        const fetchOrder = async () => {
            const res = await orderServices.getListOrderByStatus(status);
            dispatch(setLoangding(false));
            setOrder(res);
        }
        fetchOrder();

    }, [status, isLoading]);

    const calculateTotalPrice = (dataOrder) => {
        const productTotal = dataOrder.dataOrderItem.reduce((total, item) => total + item.quantity * item.price, 0);
        const totalPriceWithShipping = productTotal + dataOrder.orderShippingFee.shippingFee;
        return totalPriceWithShipping;
    };

    function checkExpiredOrder(actionDate) {
        const currentDate = new Date();
        const actionDateDate = new Date(actionDate);
        const timeDifference = currentDate - actionDateDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        console.log("daysDifference: " + daysDifference);
        return daysDifference >= 10;
    }

    const handleSetStatus = async (orderId, statusId) => {
        const check = await notify.notify2('Change status', 'info', 'Are you sure?');
        if (check === false) {
            return;
        }
        const rs = await orderServices.setStateOrder(orderId, statusId);
        if (rs) {
            const newListOrder = order.filter(item => item.orderID !== orderId);
            setOrder(newListOrder);
        }

    }


    const columns = [
        {
            //title so luong don hang
            //   title: ,
            dataIndex: 'orderCode',
            key: 'orderCode',
            render: (orderCode, dataOrder) => (
                <div className={cx("orderContainer")}>
                    <div className={cx("actionColumn")}>
                        <div>
                        <p className='mb-[20px]'> Mã đơn hàng: {orderCode}  </p>
                        <div className={cx("feeShipColumn")}>Phí vận chuyển: {dataOrder.orderShippingFee.shippingFee}</div>
                        <div className={cx("totalPriceColumn")}>Tổng giá: {calculateTotalPrice(dataOrder)}</div>
                        </div>
                        <div className={cx("")}>
                            {status === 0 && (dataOrder?.paymentMethod === 0 || (dataOrder?.finishPay === true && dataOrder?.paymentMethod === 1)) ?
                                <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-sky-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 2)} type="primary">Xác nhận</Button>
                                    <Button className='!bg-red-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 6)} type="primary">Hủy đơn hàng</Button>
                                </div>
                                : status === 0 && (dataOrder?.finishPay === false && dataOrder?.paymentMethod === 1) &&
                                <div className='flex flex-col pr-[7px]'>
                                    <p className='!text-red-500'> Khách chưa thanh toán    </p>
                                    <Button className='!bg-red-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 6)} type="primary">Hủy đơn hàng</Button>

                                </div>
                            }
                            {status === 1 &&
                                <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-green-500  mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 2)} type="primary">Đóng gói</Button>
                                    <Button className='!bg-red-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 6)} type="primary">Hủy đơn hàng</Button>

                                </div>

                            }
                            {status === 2 &&
                                <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-yellow-500' onClick={() => handleSetStatus(dataOrder.orderID, 3)} type="primary">Giao hàng</Button>
                                </div>
                            }
                            {status === 3 && checkExpiredOrder(dataOrder?.actionDateNewest?.actionDate) === true ?
                                <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-blue-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 4)} type="primary">Giao thành công</Button>
                                </div> : status === 3 && <p className='!text-red-500'> Đang giao hàng </p>
                            }
                            {status === 4 &&
                                <p className='!text-green-500'> Đã giao hàng </p>
                            }
                            {status === 5 &&
                                <p className='!text-red-500'> Khách hàng hủy đơn </p>
                            }
                            {status === 6 &&
                                <p className='!text-red-500'> Người bán hủy đơn </p>
                            }
                            {status === 7 &&
                                <p className='!text-red-500'> Đã trả hàng </p>
                            }
                        </div></div>
                    <div className={cx("orderContent")}>
                        <div className={cx("orderItem")} onClick={() => handleDetailOrder(dataOrder.orderID)}>
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

                    </div>
                </div>
            ),
        },
    ];

    const cx = classname.bind(styles);
    return <>
        <Table className={cx("tableOrder")} columns={columns} dataSource={order} />
        <DrawerApply />
    </>

}

export default Bodymain
