import React from 'react'

import { Tabs } from 'antd';
import { useState } from 'react';

export const Tab123 = () => {
    const [key, setKey] = useState('1');
    const [children, setChildren] = useState('Children ');
    const onChange = (key) => {
    console.log(key);
    };
    const items = [  
    {
        key: '1',
        label: 'Tất cả',
        children: children,
    },
    {
        key: '2',
        label: 'Chờ xác nhận',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: 'Tab 4',
        children: 'Content of Tab Pane 4',
    },
    {
        key: '5',
        label: 'Tab 5',
        children: 'Content of Tab Pane 5',
    },
    {
        key: '6',
        label: 'Tab 6',
        children: 'Content of Tab Pane 6',
    },
    {
      key: '7',
      label: 'Tab 7',
      children: 'Content of Tab Pane 7',
    },
    {
      key: '8',
      label: 'Tab 8',
      children: 'Content of Tab Pane 8',
    }
    ];
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}
