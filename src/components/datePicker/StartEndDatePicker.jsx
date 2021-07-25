/* eslint-disable react/prop-types */
import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const StartEndDatePicker = ({ startDate, endDate, height, width, ...props }) => {
  return (
    <RangePicker
      value={startDate && endDate ? [moment(startDate), moment(endDate)] : ''}
      style={{
        height: height || '34px',
        width: width || 'auto',
      }}
      {...props}
    />
  );
};

export default StartEndDatePicker;
