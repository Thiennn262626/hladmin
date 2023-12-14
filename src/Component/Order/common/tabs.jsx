import React from 'react'

import { Tabs } from 'antd';
import { useState } from 'react';
import {BodyMain} from './index';
import classname from "classnames/bind";
import styles from "./../order.module.scss";

export const Tab = () => {
    const [key, setKey] = useState('1');
    const onChange = (key) => {
    console.log(key);
    };
    const items = [  
    {
        key: '0',
        label: 'Tất cả',
        children: <BodyMain/>,
    },
    {
        key: '1',
        label: 'Chờ xác nhận',
        children: <BodyMain/>,
    },
    {
        key: '2',
        label: 'Chờ đống gói',
        children: <BodyMain/>,
    },
    {
        key: '3',
        label: 'Đang đống gói',
        children: <BodyMain/>,
    },
    {
        key: '4',
        label: 'Đang giao hàng',
        children: <BodyMain/>,
    },
    {
        key: '5',
        label: 'Đã giao hàng',
        children: <BodyMain/>,
    },
    {
      key: '6',
      label: 'Khách hàng đã hủy',
      children: <BodyMain/>,
    },
    {
      key: '7',
      label: 'Người bán đã hủy',
      children: <BodyMain/>,
    },
    {
      key: '8',
      label: 'Đã trả hàng',
      children: <BodyMain/>,
    },
    ];
    const cx = classname.bind(styles);
  return (
    //<Tabs className={cx("tabsDetail")} defaultActiveKey="1" items={items} onChange={onChange} />
    <Tabs className={cx("tabsDetail")} onChange={onChange}>
      {items.map((tab) => { 
        const { key, label, children } = tab;
        return (
          <Tabs.TabPane key={key} tab={label} className={cx("tabPane")}>
            {children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  )
}
