import React from 'react'

import { Tabs } from 'antd';
import {BodyMain} from './index';
import classname from "classnames/bind";
import styles from "./../order.module.scss";
import { setLoangding } from '../../slice/couterSlice';
import { useDispatch } from 'react-redux';
export const Tab = () => {
    const dispatch = useDispatch();
    const onChange = (key) => {
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
        label: 'Chờ đống gói',
        children: <BodyMain status={1}/>,
    },
    {
        key: '2',
        label: 'Đang đống gói',
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
    },
    ];
    const cx = classname.bind(styles);
  return (
    //<Tabs className={cx("tabsDetail")} defaultActiveKey="1" items={items} onChange={onChange} />
    <Tabs className={cx("tabsDetail")} onChange={onChange}>
      {items.map((tab) => { 
        const { key, label, children } = tab;
        return (
          <Tabs.TabPane  key={key} tab={label} className={cx("tabPane")}>
            {children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  )
}
