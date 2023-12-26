import React, { useState, useEffect } from 'react'
import { productServices } from '../../../services/productService'
import { Table, Tag, Space } from 'antd';
import {
    setLoadProduct,
    setModalSkus,
    setProductID,
} from '../../slice/couterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../utils/notify';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
const Bodymain = () => {
    const dispatch = useDispatch();
    const [listProduct, setListProduct] = useState([]);
    const { search, sortBy, minAmount, maxAmount, loadListProduct } = useSelector(state => state.counter);

    const handleOnCLick = (record) => {
        dispatch(setModalSkus(true));
        dispatch(setProductID(record?.productID));
    }
    const handleOnCLickLock = async (record, enable) => {
        let content = enable === 0 ? "Are you sure you want to lock this product?" : "Are you sure you want to unlock this product?";
        const check = await notify.notify2("Lock/UnClock", "warning", content, "Yes", "No")
        if (check) {
            const res = await productServices.enableProduct(record?.productID, enable);
            if (res) {
                let newListProduct = [...listProduct];
                let index = newListProduct.findIndex(item => item.productID === record.productID);
                if (enable === 0) {
                    newListProduct[index].productEnable = false;
                } else {
                    newListProduct[index].productEnable = true;
                }
                setListProduct(newListProduct);
            }
        }
    }
    useEffect(() => {
        let data = {};
        if (search !== '') {
            data.search = search;
        }
        if (sortBy !== -1) {
            data.sortBy = sortBy;
        }
        if (minAmount !== -1) {
            data.minAmount = minAmount;
        }
        if (maxAmount !== -1) {
            data.maxAmount = maxAmount;
        }
        const fetchProduct = async () => {
            const res = await productServices.listProduct(data);
            if (res) {
                setListProduct(res.result);
                dispatch(setLoadProduct(false));
            };
        }
            fetchProduct();
    }, [search, sortBy, minAmount, maxAmount, loadListProduct]);

    const columns = [
        {
            title: 'Img',
            dataIndex: 'name',
            render: (_, record) => (
                <img className='w-[50px] h-[50px]' src={record?.medias[0]?.linkString}></img>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <p onClick={() => handleOnCLick(record)}> {record?.productName}</p>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'productEnable',
            render: (_, record) => (
                record?.productEnable === true ?
                    <Tag bordered={false} color="processing">
                        Enable
                    </Tag > :
                    <Tag bordered={false} color="error">
                        Disable
                    </Tag >
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                record?.productEnable === true ?
                    <Space size="middle">
                        <a onClick={() => handleOnCLickLock(record, 0)} > <LockOutlined /></a>
                    </Space> :
                    <Space size="middle">
                        <a onClick={() => handleOnCLickLock(record, 1)} > <UnlockOutlined /></a>
                    </Space>
            ),
        },
    ];
    return <>
        <Table className='p-[25px] border rounded-[12px] m-[10px] hover:shadow-lg transition-all duration-300 bg-[#FAFAFA]' columns={columns} dataSource={listProduct} />
    </>

}

export default Bodymain
