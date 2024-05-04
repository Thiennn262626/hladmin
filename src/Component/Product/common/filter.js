import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { InputNumber, Space } from 'antd';
import { useDispatch } from 'react-redux';
import {
  setSearch,
  setSortBy,
  setMin,
  setMax,
  setLoadProduct
} from '../../slice/couterSlice';

const App = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('inline');
  const [sortBy, setSortBy1] = useState(-1);
  const [min, setMin1] = useState();
  const [max, setMax1] = useState();
  const [search, setSearch1] = useState('');

  const handleSubmit = () => {
    dispatch(setLoadProduct(true));
  }

  const handleSortBy = (e) => {
    setSortBy1(e.target.value)
    dispatch(setSortBy(e.target.value));
    dispatch(setLoadProduct(true));
  }
  const onChangeMin = (value) => {
    console.log(value)
    if (value !== null) {
      setMin1(value)
      dispatch(setMin(value));
    }
  };
  const onChangeMax = (value) => {
    console.log(value)
    if (value !== null) {
      setMax1(value)
      dispatch(setMax(value));
    }
  };
  const onSearch = (e) => {
    console.log(e.target.value)
    setSearch1(e.target.value)
    dispatch(setSearch(e.target.value));
  }

  return (
    <div className='border rounded-[12px] m-[10px] hover:shadow-lg transition-all duration-300 bg-[#FFFFFF] flex justify-center'>
      <Form
        className='p-[25px] flex flex-wrap justify-between'
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        style={{
          maxWidth: formLayout === 'inline' ? 'none' : 600,
        }}
      >
        {/* <Form.Item label="Search">
          <Input value={search} onChange={onSearch} placeholder="Sản phẩm A" />
        </Form.Item> */}
        <Form.Item name="layout" className='w-full md:w-auto' >
          <Radio.Group value={sortBy} onChange={handleSortBy}>
            <Radio.Button value={-1}>Tất cả</Radio.Button>
            <Radio.Button value={0}>Thấp đến cao</Radio.Button>
            <Radio.Button value={1}>Cao đến thấp</Radio.Button>
            <Radio.Button value={2}>Mới nhất</Radio.Button>
            <Radio.Button value={3}>Cũ nhất</Radio.Button>
            <Radio.Button value={4}>Phổ biến</Radio.Button>
            <Radio.Button value={5}>Bán chạy</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {/* <Form.Item label="Min">
          <InputNumber

            formatter={(value) => (value ? `${value}`.replace(/\D/g, '') : '')}
            parser={(value) => (value ? value.replace(/\D/g, '') : '')}
            onChange={onChangeMin}
            placeholder="Min value"
            value={min}
          />
        </Form.Item>

        <Form.Item label="Max">
          <InputNumber

            formatter={(value) => (value ? `${value}`.replace(/\D/g, '') : '')}
            parser={(value) => (value ? value.replace(/\D/g, '') : '')}
            onChange={onChangeMax}
            placeholder="Max value"
            value={max}
          />
        </Form.Item> */}
        {/* <Form.Item >
          <Button onClick={handleSubmit} className='bg-[#4096FF]' type="primary">Submit</Button>
        </Form.Item> */}
      </Form>
    </div>

  );
};
export default App;