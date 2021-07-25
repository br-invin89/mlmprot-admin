/* eslint-disable no-void */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Column } from '@ant-design/charts';

const ColumnChart = (props) => {
  // eslint-disable-next-line prefer-const
  let config = {
    height: props.height || 175,
    width: props.width || 240,
    autoFit: true,
    data: props.data,
    xField: props.xField,
    yField: props.yField,
    label: null,
    yAxis: {
      label: null,
      line: null,
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
    },
    xAxis: {
      label: null,
      line: null,
    },
    meta: {
      sales_amount: { alias: 'Sales Amount' },
      sales: { alias: 'Payout' },
    },
  };
  return <Column {...config} />;
};

export default ColumnChart;
