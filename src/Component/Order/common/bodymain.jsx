import React, { useState, useEffect } from 'react'
import { orderServices } from '../../../services/orderService'
import { Table, Button } from 'antd';
import classname from "classnames/bind";
import styles from "./../order.module.scss";
import { setOpenDrawerApply, setIdOrder, setOrderData, setReloadOrder, setOrderCountList } from '../../Order/counterOrder';
import { useDispatch, useSelector } from 'react-redux';
import DrawerApply from './drawer';
import { notify } from '../../../utils/notify';

const Bodymain = ({ status, countList}) => {
    console.log('countList:', countList);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.countOrder.isReloadOrder[status]);
    const [order, setOrder] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: countList });

    const fetchOrder = async (offset, limit) => {
        try {
            dispatch(setReloadOrder({ status: status, isLoading: true }));
            const res = await orderServices.getListOrderByStatus(status, offset, limit);
            if (res) {
                setOrder(res || []);
                setPagination(prev => ({ ...prev, total: countList }));
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            dispatch(setReloadOrder({ status: status, isLoading:false}));
        }
    }

    const handleTableChange = (pagination, filters, sorter, extra) => {
        setPagination(pagination);
        const offset = (pagination.current - 1) * pagination.pageSize;
        const limit = pagination.pageSize;
        fetchOrder(offset, limit);
    }

    useEffect(() => {
        fetchOrder(0, pagination.pageSize);
        // return () => {
        //     setOrder([]);
        // }
    }, []);

    const openDrawerApply = () => {
        dispatch(setOpenDrawerApply(true));
    }

    const handleDetailOrder = (orderID) => {
        dispatch(setIdOrder(orderID));
        openDrawerApply();
    }

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
        return daysDifference >= 10;
    }

    function getExpiredOrder(actionDate) {
        const currentDate = new Date();
        const actionDateDate = new Date(actionDate);
        const timeDifference = currentDate - actionDateDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        const countdown = Math.floor(10 - daysDifference);
        if (countdown > 0) {
            return countdown + ' ngày';
        } else {
            const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            return `${hoursDifference} giờ ${minutesDifference} phút`;
        }
    }

    const handleSetStatus = async (orderId, statusId) => {
        const check = await notify.notify2('Cập nhật trạng thái', 'info', 'Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng này không?','có' ,'không');
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
                            <div className={cx("feeShipColumn")}>
                                Phí vận chuyển: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataOrder.orderShippingFee.shippingFee)}
                            </div>

                            <div className={cx("totalPriceColumn")}>
                                Tổng giá:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice(dataOrder))}
                            </div>


                        </div>
                        <div className={cx("")}>
                            {status === 0 && (dataOrder?.paymentMethod === 0 || (dataOrder?.finishPay === true && dataOrder?.paymentMethod === 1)) ?
                                <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-sky-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 1)} type="primary">Xác nhận</Button>
                                    {/* <Button className='!bg-red-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 6)} type="primary">Hủy đơn hàng</Button> */}
                                </div>
                                : status === 0 && (dataOrder?.finishPay === false && dataOrder?.paymentMethod === 1) &&
                                <div className='flex flex-col pr-[7px]'>
                                    <p className='!text-red-500'> Khách chưa thanh toán    </p>
                                    {/* <Button className='!bg-red-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 6)} type="primary">Hủy đơn hàng</Button> */}

                                </div>
                            }
                            {status === 1 && checkExpiredOrder(dataOrder?.actionDateNewest?.actionDate) === true ?
                                <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-green-500  mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 2)} type="primary">Đóng gói</Button>
                                    <Button className='!bg-red-500 mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 6)} type="primary">Hủy đơn hàng</Button>
                                </div> : status === 1 && <div className='flex flex-col pr-[7px]'>
                                    <Button className='!bg-green-500  mb-[3px]' onClick={() => handleSetStatus(dataOrder.orderID, 2)} type="primary">Đóng gói</Button>
                                    <p className='!text-red-500'> Có thể hủy sau {getExpiredOrder(dataOrder?.actionDateNewest?.actionDate)} </p>
                                </div>
                                // {checkExpiredOrder(dataOrder?.actionDateNewest?.actionDate) === true ?
                                //          

                                //     }

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
                                                <p>Số lượng: {item.quantity}</p>
                                                <p>Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
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
        <Table  className={cx("tableOrder")} 
                columns={columns} 
                dataSource={order}
                showHeader={false}
                pagination={{
                ...pagination,
                position: ['topCenter'],
                total: countList, // Cập nhật lại total từ countList
                totalPage: Math.ceil(countList / pagination.pageSize) // Tính tổng số trang
            }}
            // loading={isLoadingg}
            onChange={handleTableChange}
                />
        <DrawerApply />
    </>

}



export default Bodymain
