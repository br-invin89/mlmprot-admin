import React from 'react';
import { Line } from '@ant-design/charts';

const LineChart = (props) => {
  
  // eslint-disable-next-line prefer-const
  let config = {
    data: props.data,
    height: props.height || 360,
    xField: props.xField,
    yField: props.yField,
    seriesField: props.seriesField,
    yAxis: {
      label: null,
      line: null,
      grid: {
        line: {
          style: {
            lineWidth: 0
          }
        }
      }
    },
    xAxis: {
        label: null,
        line: null
      },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return <Line {...config} />;
};

export default LineChart;
