import React from 'react';
import {  ShopOutlined ,FileDoneOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Order management', 'sub1', <FileDoneOutlined />, [
        getItem('Orders', '1'),
    ]),

    {
        type: 'divider',
    },
    getItem('Product management', 'sub4', <ShopOutlined />, [
        getItem('Products', '2'),
        getItem('Add Product', '3'),
        ,
    ]),

];
const App = () => {
    const navigate = useNavigate();
    const clickOrder = () => {
        navigate("/order");
    };
    const clickAddProduct = () => {
        navigate("/add-product");
    };
    const clickProduct = () => {
        navigate("/product");
    };
    const onClick = (e) => {
        if (e.key === '1') {
            clickOrder();
        }
        if (e.key === '2') {
            clickProduct();
        }
        if (e.key === '3') {
            clickAddProduct();
        }
    };
    return (
        <Menu
            className='!w-full'
            onClick={onClick}
            style={{
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default App;