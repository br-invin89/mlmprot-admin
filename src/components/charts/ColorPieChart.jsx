/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
import React from 'react';
import { Pie } from '@ant-design/charts';
import { asPrice } from '@/utils/text';

const ColorPieChart = (props) => {
  let config = {
    appendPadding: 2,
    data: props.data,
    angleField: props.angleField,
    colorField: props.colorField,
    color: props.colors,
    radius: 1,
    innerRadius: 0.54,
    legend: false,
    meta: {
      value: null,
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        formatter: function formatter() {
          return '';
        },
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      // content: '{value}',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
    ],
    tooltip: {
      formatter: (data) => {
        for (let i = 0; i < props.data.length; i ++) {
          if (props.data[i].name == data.name) {
            return { name: props.data[i].name, value: asPrice(props.data[i].amount) };
          }
        }
      },
    },
  };
  return <Pie {...config} />;
};
export default ColorPieChart;