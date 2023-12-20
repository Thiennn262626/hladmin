import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { productServices } from '../../../services/productService'

import {
  Form,
  Input,
  Upload,
  Space,
  Button,
  Table
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setDataAttribute } from '../../slice/couterSlice';

const Index = ({index}) => {
    const dispatch = useDispatch();
    const dataAttributes = useSelector(state => state.counter.dataAttribute);
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [locAttributeValueName, setLocAttributeValueName] = useState('');
    const [totalStock, setTotalStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceBefore, setPriceBefore] = useState(0);
    const [mediaID, setMemediaID] = useState('');
    const items = useSelector(state => state.counter.items);
    const uploadImagePL = async (file) => {
        const data = new FormData();
        data.append("file", file);
        const response = await productServices.addImg(data);
        if (response) {
            setUrl(response?.url);
            setMemediaID(response?.mediaID);
        }
    }
    const onChangelocAttributeValueName = (e) => {
        setLocAttributeValueName(e.target.value);
    }
    const onChangetotalStock = (value) => {
        setTotalStock(value);
    }
    const onChangeprice = (value) => {
        setPrice(value);
    }
    const onChangepriceBefore = (value) => {
        setPriceBefore(value);
    }

    const handleAdd = (locAttributeName) => {
        if (locAttributeValueName === '') {
            return;
        }
        if (totalStock < 0 || totalStock === null) {
            return;
        }
        if (price < 0 || price === null) {
            return;
        }
        if (priceBefore < 0 || priceBefore === null) {
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
        setData([...data, newData]);
        dispatch(setDataAttribute([...dataAttributes, newData]));
        setUrl('');
        setLocAttributeValueName('');
        setTotalStock(0);
        setPrice(0);
        setPriceBefore(0);

    }

    const handleRemove =  (record) => {
        const newData =  data.filter(item => item.key !== record.key);
         setData(newData);   
        const newDataAttribute = dataAttributes.filter(item => item.locAttributeValueName !== record.locAttributeValueName);
        dispatch(setDataAttribute(newDataAttribute));
        
    }
    const columns = [
        {
            title: 'Img',
            dataIndex: 'name',
            render: (_, record) => (
                <img className='w-[50px] h-[50px]' src={record?.url}></img>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',

            render: (_, record) => (
                <p>{record?.locAttributeValueName}</p>
            ),
        },
        {
            title: 'TotalStock',
            dataIndex: 'totalStock',

            render: (_, record) => (
                <p>{record?.totalStock}</p>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',

            render: (_, record) => (
                <p>{record?.price}</p>
            ),
        },
        {
            title: 'PriceBefore',
            dataIndex: 'priceBefore',
            render: (_, record) => (
                <p>{record?.priceBefore}</p>
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleRemove(record)}> <DeleteOutlined /></a>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <div className='flex justify-between'>
                <div className='w-[50%]   border rounded-[12px] m-[10px]'>
                    <div>

                        <div className='flex justify-between p-[15px]'>
                            <b className=''>{items[index]}</b>
                            <Button type="text" icon={<PlusOutlined />} onClick={() => handleAdd(items[index])}>
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

                        <Form.Item label="Name" className='!w-full'>
                            <Input value={locAttributeValueName} maxLength={120} onChange={onChangelocAttributeValueName} />
                        </Form.Item>

                        <Form.Item label="Total"  className='!w-full'>
                            <InputNumber value={totalStock}  onChange={onChangetotalStock} />
                        </Form.Item>

                        <Form.Item label="Price" >
                            <InputNumber
                               
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={onChangeprice}
                                value={price}
                            />
                        </Form.Item>

                        <Form.Item label="Before"  className='!w-full'>
                            <InputNumber
                                
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={onChangepriceBefore}
                                value={priceBefore}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='w-[50%]'>
                    <Table columns={columns} dataSource={data} className='m-[5px]' />
                </div>
            </div>

        </div>
    );
};
export default Index;