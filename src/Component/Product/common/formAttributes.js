import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Add from './Add'

import {
    Form,
    Input,
    Divider,
} from 'antd';
import { Space, Button, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from '../../slice/couterSlice';

const Index = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.counter.items);

    // Phân loại hàng
    let index = 0;
   
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        dispatch(setItems([...items, name || `New item ${index++}`]));
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const removeItem = (itemToRemove) => {
        dispatch(setItems(items.filter((item) => item !== itemToRemove)));
    };

    return (

        <div>
            <Divider />
            <b className='!pb-[20px]'>Thông tin bán hàng:</b>
            <Divider />

            <div>
                <Form.Item label="Phân loại">
                    <Space>
                        <Input
                            placeholder="Tối đa 2 phân loại"
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
            {items.length === 0 ? null
             :
                items.map((item, index) => (
                    <div key={index}>
                        <Add index={index} />
                    </div>
                ))}
        </div>



    );
};
export default Index;