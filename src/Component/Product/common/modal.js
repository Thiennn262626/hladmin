import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    setModalSkus,
} from '../../slice/couterSlice';
import { productServices } from '../../../services/productService'
import { Table, Tag, Space } from 'antd';
import { LockOutlined, UnlockOutlined, EditOutlined } from '@ant-design/icons';
import { notify } from '../../../utils/notify';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Divider, theme } from 'antd';
const { useToken } = theme;

const App = () => {
    const dispatch = useDispatch();
    const [listSku, setListSku] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const modalSkus = useSelector(state => state.counter.modalSkus);
    const productID = useSelector(state => state.counter.productID);
    const handleCancel = () => {
        dispatch(setModalSkus(false));
    };
    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await productServices.getProductSku(productID);
            if (res) {
                setListSku(res.productSKU);
            };
        }
        if (modalSkus && productID !== "")
            fetchProduct();
        return () => {
            setListSku([]);
        }
    }, [modalSkus, productID]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const menuStyle = {
        boxShadow: 'none',
    };
    const { token } = useToken();
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const items = [
    ];
    const reStock = async(record) => {
      //nếu quantity <0 hoặc không phải số thì báo lỗi
        if (quantity <= 0 || isNaN(quantity)) {
            notify.notify1("Quantity must be greater than 0 and is number", "error");
            return;
        }
        let content = "Are you sure you want to restock this sku?";
        const check = await notify.notify2("Restock", "warning", content, "Yes", "No")
        if (check) {
            const res = await productServices.restockSku(record?.productSKUID, quantity);
            if (res) {
                let newListSku = [...listSku];
                let index = newListSku.findIndex(item => item.productSKUID === record.productSKUID);
                newListSku[index].quantity = quantity;
                setListSku(newListSku);
                setQuantity(0);
            }
        }

    }
    const columns = [
        {
            title: 'Img',
            dataIndex: 'name',
            render: (_, record) => (
                <img className='w-[50px] h-[50px]' src={record?.linkString}></img>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => (
                <p > {VND.format(record?.price)}</p>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (_, record) => (
                <div className='flex w-full justify-around'>
                    <p > {record?.quantity}</p>
                  
                    <Dropdown
                        menu={{
                            items,
                        }}
                        dropdownRender={(menu) => (
                            <div style={contentStyle}
                            className='w-[150px]'
                            >
                                {React.cloneElement(menu, {
                                    style: menuStyle,
                                })}

                                <Space
                                className='w-full'
                                    style={{
                                        padding: 8,
                                    }}
                                >
                                    <Input className='w-[100%]' value={quantity} onChange={handleQuantity} placeholder="Nhập số lượng" />
                                    <Button onClick={()=>reStock(record)} className='bg-[#4096FF]' type="primary">OK</Button>
                                </Space>
                            </div>
                        )}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Restock
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            ),
        },
        {
            title: 'Attribute',
            dataIndex: 'attribute',
            render: (_, record) => (
                <>
                    {record?.attribute.length === 1 ?
                        <p > {record?.attribute[0]?.locAttributeValueName}</p>
                        :
                        record?.attribute.length === 2 ?
                            <p > {`${record?.attribute[0]?.locAttributeValueName} - ${record?.attribute[1]?.locAttributeValueName}`} </p>
                            : null}

                </>

            ),
        },
        {
            title: 'Status',
            dataIndex: 'SkuEnable',
            render: (_, record) => (
                <>
                    {record?.SkuEnable === true ?
                        <Tag bordered={false} color="processing">
                            Enable
                        </Tag > :
                        <Tag bordered={false} color="error">
                            Disable
                        </Tag >}
                    {
                        record?.quantity === 0 &&
                        <Tag bordered={false} color="warning">
                            Sold out
                        </Tag >
                    }
                </>


            ),
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record?.SkuEnable ?
                        <Button onClick={() => handleOnCLickLock(record, 0)} icon={<LockOutlined />} />
                        :
                        <Button onClick={() => handleOnCLickLock(record, 1)} icon={<UnlockOutlined />} />
                    }
                </Space>
            ),
        },

    ];
    const handleOnCLickLock = async (record, enable) => {
        let content = enable === 0 ? "Are you sure you want to lock this sku?" : "Are you sure you want to unlock this sku?";
        const check = await notify.notify2("Lock/UnClock", "warning", content, "Yes", "No")
        if (check) {
            const res = await productServices.enableSku(record?.productSKUID, enable);
            if (res) {
                let newListSku = [...listSku];
                let index = newListSku.findIndex(item => item.productSKUID === record.productSKUID);
                if (enable === 0) {
                    newListSku[index].SkuEnable = false;
                } else {
                    newListSku[index].SkuEnable = true;
                }
                setListSku(newListSku);

            }
        }
    }
    return (

        <Modal
            open={modalSkus}
            title="SKU"
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
            ]}
            width={1000}
        >
            <Table className=' ' columns={columns} dataSource={listSku} />

        </Modal>

    );
};
export default App;