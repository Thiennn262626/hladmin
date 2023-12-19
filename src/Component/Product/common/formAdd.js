import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { productServices } from '../../../services/productService'
import FormAddImg from './formImg'
import FormInfo from './formInfo'
import FormAttributes from './formAttributes'
import {
  Form,
} from 'antd';

const FormDisabledDemo = () => {




  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 1300 }}
      className='!mx-auto bg-white p-4 border border-gray-300 rounded-lg shadow-xl mt-[30px] mb-[30px]'
    >
      <FormAddImg />
      <FormInfo />
      <FormAttributes />
    </Form >

  );
};
export default FormDisabledDemo;