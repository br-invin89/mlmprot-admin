/* eslint-disable prefer-const */
import React from 'react';
import { Area } from '@ant-design/charts';

const AreaChart = (props) => {
  let config = {
    data: props.data,
    xField: props.xField,
    yField: props.yField,
    xAxis: { tickCount: 5 },
  };
  return <Area {...config} {...props} />;
};
export default AreaChart;
