import React, { useState, useEffect } from 'react';
import { productServices } from '../../../services/productService'
import {
    Form,
    Input,
    Select,
    Divider,

} from 'antd';
import { useDispatch } from 'react-redux';
import {
    setName,
    setSlogan,
    setDescription,
    setNotes,
    setProductCategoryID,
    setMadeIn,
    setUses,
} from '../../slice/couterSlice';

const { TextArea } = Input;
const Index = () => {

    const dispatch = useDispatch();

    // danh sách ngành hàng
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            const response = await productServices.getCategory();
            if (response) {
                setCategory(response?.result);
            }
        }
        getCategory();
    }, []);

    return (
        <>
            <Divider />
            <b className='!pb-[20px]'>Thông tin sản phẩm:</b>
            <Divider />
            <Form.Item label="Name">
                <Input maxLength={120} />
            </Form.Item>

            <Form.Item label="Category">
                <Select>
                    {category.length > 0 &&
                        category.map((item) => (
                            <Select.Option key={item.productCategoryID} value={item.productCategoryID}>
                                {item.productCategoryName}
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} maxLength={1000} />
            </Form.Item>
            <Form.Item label="Slogan">
                <TextArea rows={2} maxLength={500} />
            </Form.Item>
            <Divider />
            <b className='!pb-[20px]'>Thông tin chi tiết:</b>
            <Divider />
            <Form.Item label="Note ">
                <TextArea rows={3} maxLength={1000} />
            </Form.Item>
            <Form.Item label="Made In">
                <Input maxLength={30} />
            </Form.Item>


            <Form.Item label="Ingredient">
                <TextArea rows={3} maxLength={500} />
            </Form.Item>
            <Form.Item label="Uses ">
                <TextArea rows={3} maxLength={500} />
            </Form.Item>
            <Form.Item label="ObjectsOfUse">
                <TextArea rows={3} maxLength={500} />
            </Form.Item>
           
            <Form.Item label="Instructions">
                <TextArea rows={3} maxLength={500} />
            </Form.Item>
            <Form.Item label="Preserve">
                <TextArea rows={3} maxLength={500} />
            </Form.Item>

        </>

    );
};
export default Index;