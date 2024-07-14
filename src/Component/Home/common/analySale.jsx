import React, { useState, useEffect } from 'react';
import { Col, Row, DatePicker} from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { homeServices } from '../../../services/homeService';
import ChartSale from './chartAnalySale';
import { DateTime } from 'luxon';
import dayjs from 'dayjs';
import { get } from 'lodash';

const AnalySale = () => {
  const [tasks, setTasks] = useState([]);
  const [lastMonthTasks, setLastMonthTasks] = useState([]);
const [selectedMonth, setSelectedMonth] = useState(DateTime.now().month); // Default to current month
  const [selectedYear, setSelectedYear] = useState(DateTime.now().year); // Default to current year

  const fetchData = async (month, year) => {
      try {
        // Simulate fetching data from an API
        const data = await homeServices.getTotalAnalySale(month, year);
        const dataLastMonth = await getTotalAnalySaleLastMonth(month, year);
        setTasks(data);
        setLastMonthTasks(dataLastMonth);
      } catch (error) {
        // Handle API call error
        console.error("Error fetching network data:", error);
      }
    };

    useEffect(() => {
    fetchData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  
    const getTotalAnalySaleLastMonth = async (month, year) => {
        try {
            const lastMonth = month === 1 ? 12 : month - 1;
            const lastYear = month === 1 ? year - 1 : year;
            const data = await homeServices.getTotalAnalySale(lastMonth, lastYear);
            return data;
        } catch (error) {
            console.error("Error fetching network data:", error);
        }
    };

   const handleMonthYearChange = (value) => {
    if (value) {
        console.log(value);
      setSelectedMonth(value.month() + 1);
      setSelectedYear(value.year());
    }
  };
  // Render columns based on tasks data
  const cols1 = tasks.slice(0, 2).map((task, index) => { 
    const lastMonthData = get(lastMonthTasks, `[${index}]`, { count: 0 }).count;
    const percentChange = ((task.count - lastMonthData) / lastMonthData) * 100;
    return(
    <Col key={index} span={12}>
      <div className="flex flex-col p-2 bg-blue-50 text-start h-auto w-60 mb-3">
        <h2 className="text-black text-sm pb-2">{task.desc}</h2>
        {/* <div className="flex flex-row justify-between"> */}
            <h1 className="text-black text-xl font-bold py-1">
            {task.desc === "Tổng doanh thu" ? `${task.count.toLocaleString()} VNĐ` : task.count}
            </h1>
            <h1 className="text-black text-xs opacity-50">
            {task.count >= lastMonthData ? <RiseOutlined style={{fontSize: '20px', color: 'green' }}/> : <FallOutlined style={{fontSize: '20px', color: 'red' }}/>} {percentChange.toFixed(2)}% so với tháng trước
          </h1>
        {/* </div> */}
      </div>
    </Col>
  )});

  const cols2 = tasks.slice(2, 4).map((task, index) => { 
    const lastMonthTask = lastMonthTasks.slice(2, 4);
    const lastMonthData = get(lastMonthTask, `[${index}]`, { count: 0 }).count;
    const percentChange = ((task.count - lastMonthData) / lastMonthData) * 100;
    return(
    <Col key={index} span={12}>
      <div className="flex flex-col p-2 bg-blue-50 text-start h-auto w-60 mb-3">
        <h2 className="text-black text-sm pb-2">{task.desc}</h2>
        {/* <div className="flex flex-row justify-between"> */}
            <h1 className="text-black text-xl font-bold py-1">
            {task.desc === "Tổng doanh thu" ? `${task.count.toLocaleString()} VNĐ` : task.count}
            </h1>
            <h1 className="text-black text-xs opacity-50">
            {task.count >= lastMonthData ? <RiseOutlined style={{fontSize: '20px', color: 'green' }}/> : <FallOutlined style={{fontSize: '20px', color: 'red' }}/>} {percentChange.toFixed(2)}% so với tháng trước
          </h1>
        {/* </div> */}
      </div>
    </Col>
  )});

  return (
    <div className="bg-white h-auto p-4 mb-4">
      <div className="flex flex-col items-start">
        <h1 className="text-black text-2xl font-bold py-1">Phân Tích Bán Hàng</h1>
           <div className="flex flex-row justify-between w-1/2">
                <h2 className="text-black text-sm opacity-50 pb-3">Tổng quan dữ liệu của shop đối với đơn hàng đã giao thành công</h2>
                <DatePicker picker="month" onChange={handleMonthYearChange} defaultValue={dayjs()} />
            </div>
      </div>
      <div className="flex mt-3">
        <div className="w-1/2 bg-gray-50">
          <ChartSale month={selectedMonth} year={selectedYear}/>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <Row gutter={[25, 25]}>{cols1}</Row>
          <Row gutter={[25, 25]}>{cols2}</Row>
        </div>
      </div>
    </div>
  );
}

export default AnalySale;
