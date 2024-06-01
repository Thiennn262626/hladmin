import React from 'react'
import { useState, useEffect } from 'react';
import { orderServices } from '../../../services/orderService'
import { Tabs } from 'antd';
import {BodyMain} from './index';
import { setReloadOrder, setOrderCountList } from '../../Order/counterOrder';
import { useDispatch, useSelector } from 'react-redux';
// import { keys, update } from 'lodash';
export const Tab = () => {
  const dispatch = useDispatch();
  const [orderCountListPrev, setOrderCountListPrev] = useState(useSelector((state) => state.counterOrder.orderCountList));
  const [counts, setCounts] = useState(orderCountListPrev);
  const [activeTab, setActiveTab] = useState('0');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await orderServices.getOrderCountList();
    setCounts(data);
    let keys = Object.keys(data);
    keys.forEach((key, index) => {
      dispatch(setOrderCountList({ status: index, value: data[key]}));
    }
    );
    compareCounts(data);
  };

  const compareCounts = (newCounts) => {
    let update = [orderCountListPrev];
    let keys = Object.keys(newCounts);
    keys.forEach((key, index) => {
      if (newCounts[key] !== orderCountListPrev[index]) {
        dispatch(setReloadOrder({ status: index, value: true }));
        update[index] = newCounts[key];
      }
    }
    );
    setOrderCountListPrev(update);
  };

  const onChange = (key) => {
    setActiveTab(key); // Update the active tab state
    fetchData();
  };
    const items = [  
    {
      key: '0',
      label: `Chờ xác nhận (${counts.countNew || 0})`,
      children: <BodyMain status={0} countList = {counts.countNew || 0}/>,
    },
    {
      key: '1',
      label: `Chờ đóng gói (${counts.countApproved || 0})`,
      children: <BodyMain status={1} countList = {counts.countApproved || 0}/>,
    },
    {
      key: '2',
      label: `Đang đóng gói (${counts.countPacking || 0})`,
      children: <BodyMain status={2} countList = {counts.countPacking || 0}/>,
    },
    {
      key: '3',
      label: `Đang giao hàng (${counts.countOnDelivering || 0})`,
      children: <BodyMain status={3} countList = {counts.countOnDelivering || 0}/>,
    },
    {
      key: '4',
      label: `Đã giao hàng (${counts.countDeliverySuccess || 0})`,
      children: <BodyMain status={4} countList = {counts.countDeliverySuccess || 0}/>,
    },
    {
      key: '5',
      label: `Khách hàng đã hủy (${counts.countCustomerCancelled || 0})`,
      children: <BodyMain status={5} countList = {counts.countCustomerCancelled || 0}/>,
    },
    {
      key: '6',
      label: `Người bán đã hủy (${counts.countSellerCancelled || 0})`,
      children: <BodyMain status={6} countList = {counts.countSellerCancelled || 0}/>,
    },
    {
      key: '7',
      label: `Đã trả hàng (${counts.countReturned || 0})`,
      children: <BodyMain status={7} countList = {counts.countReturned || 0}/>,
    }
    ];
  
  return (
    <Tabs className='bg-[#ffffff] p-[25px]' onChange={onChange}>
      {items.map((tab) => {
        const { key, label, children } = tab;
        return (
          <Tabs.TabPane 
          key={key} 
          tab={label}
          >
            {activeTab === key && children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  )
}
