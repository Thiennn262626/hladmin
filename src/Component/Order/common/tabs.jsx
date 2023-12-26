import React from 'react'

import { Tabs } from 'antd';
import {BodyMain} from './index';
import { setLoangding } from '../../slice/couterSlice';
import { useDispatch } from 'react-redux';
export const Tab = () => {
    const dispatch = useDispatch();
    const onChange = () => {
      dispatch(setLoangding(true))
    };
    const items = [  
    {
        key: '0',
        label: 'Chờ xác nhận',
        children: <BodyMain status={0}/>,
    },
    {
        key: '1',
        label: 'Chờ đóng gói',
        children: <BodyMain status={1}/>,
    },
    {
        key: '2',
        label: 'Đang đóng gói',
        children: <BodyMain status={2}/>,
    },
    {
        key: '3',
        label: 'Đang giao hàng',
        children: <BodyMain status={3}/>,
    },
    {
        key: '4',
        label: 'Đã giao hàng',
        children: <BodyMain status={4}/>,
    },
    {
      key: '5',
      label: 'Khách hàng đã hủy',
      children: <BodyMain status={5}/>,
    },
    {
      key: '6',
      label: 'Người bán đã hủy',
      children: <BodyMain status={6}/>,
    },
    {
      key: '7',
      label: 'Đã trả hàng',
      children: <BodyMain status={7}/>,
    }
    ];
  
  return (
    <Tabs className='bg-[#ffffff] p-[25px]' onChange={onChange}>
      {items.map((tab) => { 
        const { key, label, children } = tab;
        return (
          <Tabs.TabPane key={key} tab={label} >
            {children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  )
}
