import { Line } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';

import { homeServices } from '../../../services/homeService';

const ChartSale = ({ month, year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch(month, year);
  }, [month, year]);

    const asyncFetch = (month, year) => {
    homeServices.getChartAnalySale(month, year)

        .then((response) => {
            if (response && response.data) {
            setData(response.data);
            }
        })
        .catch((error) => {
            console.error('fetch data failed', error);
        });
  };
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    axis: {
      y: {
        labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    scale: { color: { range: ['#30BF78', '#F4664A', '#FAAD14'] } },
    style: {
      lineWidth: 2,
      lineDash: (data) => {
        if (data[0].type === 'Đơn hàng') return [4, 4];
      },
      opacity: (data) => {
        if (data[0].type !== 'Đơn hàng') return 0.5;
      },
    },
  };

  return <Line {...config} />;
};

export default ChartSale;