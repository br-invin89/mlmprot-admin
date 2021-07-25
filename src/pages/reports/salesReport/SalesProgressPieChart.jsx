/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import React from 'react';
import { RingProgress } from '@ant-design/charts';

const SalesProgressPieChart = (props) => {
  var config = {
    autoFit: false,
    percent: props.value / 100,
    color: [props.fill, '#E8EDF3'],
    height: 100,
    width: 100,
    innerRadius: 0.6,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
        },
        formatter: function formatter() {
          // eslint-disable-next-line prefer-template
          return props.value + '%';
        },
      },
      content: false,
    },
  };

  return <RingProgress {...config} />;
};

export default SalesProgressPieChart;
