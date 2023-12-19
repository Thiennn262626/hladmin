import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { productServices } from '../../../services/productService'

import {
    Form,
    Input,
    Divider,
    Upload
} from 'antd';
import { Space, Button, Tag, Table } from 'antd';
import { InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { set } from 'nprogress';
import e from 'express';

const FormDisabledDemo = () => {

    // Phân loại hàng
    let index = 0;
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const onChange = (value) => {
    };

    const removeItem = (itemToRemove) => {
        setItems(items.filter((item) => item !== itemToRemove));
    };


    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [locAttributeValueName, setLocAttributeValueName] = useState('');
    const [totalStock, setTotalStock] = useState();
    const [price, setPrice] = useState();
    const [priceBefore, setPriceBefore] = useState();
    const [mediaID, setMemediaID] = useState('');


    const uploadImagePL = async (file) => {
        const data = new FormData();
        data.append("file", file);
        const response = await productServices.addImg(data);
        if (response) {
            setUrl(response?.url);
            setMemediaID(response?.mediaID);
        }
    }
    const onChangelocAttributeValueName = (event) => {
        setLocAttributeValueName(event.target.value);
    }
    const onChangetotalStock = (event) => {
        setTotalStock(event.target.value);
    }
    const onChangeprice = (event) => {
        setPrice(event.target.value);
    }
    const onChangepriceBefore = (event) => {
        setPriceBefore(event.target.value);
    }

    const handleAdd = (locAttributeName) => {
        if (locAttributeValueName === '') { 
            return;
        }
        if (totalStock < 0 || totalStock === '') {
            return;
        }
        if (price < 0 || price === '') { 
            return;
        }
        if (priceBefore < 0 || priceBefore === '') {
            return;
        }
        const newData = {
            key: data.length + 1,
            url: url,
            locAttributeValueName: locAttributeValueName,
            totalStock: totalStock,
            price: price,
            priceBefore: priceBefore,
            mediaID: mediaID,
            locAttributeName: locAttributeName
        };
        console.log(98, newData);
        setData([...data, newData]);
    }
    const columns = [
        {
            title: 'Img',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <img className='w-[20px] h-[20px]' src={record?.url}></img>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <p>{record?.locAttributeValueName}</p>
            ),
        },
        {
            title: 'TotalStock',
            dataIndex: 'totalStock',
            key: 'totalStock',
            render: (_, record) => (
                <p>{record?.totalStock}</p>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <p>{record?.price}</p>
            ),
        },
        {
            title: 'PriceBefore',
            dataIndex: 'priceBefore',
            key: 'priceBefore',
            render: (_, record) => (
                <p>{record?.priceBefore}</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.locAttributeValueName}</a>
                    <a>Delete</a>
                </Space>
            ),
        },

    ]
    
    return (

        <div>
            <Divider />
            <b className='!pb-[20px]'>Thông tin bán hàng:</b>
            <Divider />

            <div>
                <Form.Item label="Phân loại">
                    <Space>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Thêm
                        </Button>
                    </Space>
                </Form.Item>
                {
                    items.length > 0 &&
                    <Form.Item label="Danh sách:">
                        <Divider style={{ margin: '8px 0' }} />
                        <div>
                            {items.map((item) => (
                                <Tag
                                    key={item}
                                    closable
                                    onClose={() => removeItem(item)}
                                    style={{ marginBottom: 8 }}
                                >
                                    {item}
                                </Tag>
                            ))}
                        </div>
                    </Form.Item>

                }
                <Divider />

            </div>
            {items.length === 0 ? <div key={index}>
                <Form.Item label="Total" name="total" className='!w-full'>
                    <InputNumber defaultValue={100} onChange={onChangetotalStock} />
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <InputNumber
                        defaultValue={1000}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={onChangeprice}
                    />
                </Form.Item>

                <Form.Item label="Before" name="priceBefore" className='!w-full'>
                    <InputNumber
                        defaultValue={1000}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={onChangepriceBefore}
                    />
                </Form.Item>
            </div> :
                items.map((item, index) => (
                    <div className='flex justify-between' key={index}>
                        <div className='w-[50%]  border-r-4' key={index}>
                            <div>

                                <div className='flex justify-between p-[15px]'>
                                    <b className=''>{item}</b>
                                    <Button type="text" icon={<PlusOutlined />} onClick={handleAdd}>
                                        Thêm
                                    </Button>
                                </div>
                            </div>
                            <div className='' key={index}>
                                <Form.Item name="upload">
                                    <Upload
                                        listType="picture-card"
                                        beforeUpload={(file) => {
                                            uploadImagePL(file);
                                        }}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </div>
                                    </Upload>
                                </Form.Item>

                                <Form.Item label="Name" name="name" className='!w-full'>
                                    <Input maxLength={120} onChange={onChangelocAttributeValueName} />
                                </Form.Item>

                                <Form.Item label="Total" name="total" className='!w-full'>
                                    <InputNumber defaultValue={100} onChange={onChangetotalStock} />
                                </Form.Item>

                                <Form.Item label="Price" name="price">
                                    <InputNumber
                                        defaultValue={1000}
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChangeprice}
                                    />
                                </Form.Item>

                                <Form.Item label="Before" name="priceBefore" className='!w-full'>
                                    <InputNumber
                                        defaultValue={1000}
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChangepriceBefore}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='w-[50%]'>
                            <Table columns={columns} dataSource={data[index]} className='m-[5px]' />

                        </div>
                    </div>

                ))}

        </div>



    );
};
export default FormDisabledDemo;