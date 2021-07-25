/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { StartEndDatePicker } from '@/components';
import moment from 'moment';
import styles from '../UsStatesRevenuePage.less';

export default function TableHead(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format().slice(0, 10)}|${moment(v[1]).format().slice(0, 10)}`;
    } else {
      setStartDate('');
      setEndDate('');
    }
    const searchParam = { date_range: dateRange };
    props.setSearchParam(searchParam);
  };

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker
          onChange={onDateChange}
          startDate={startDate}
          endDate={endDate}
          picker="month"
          format="YYYY/MM"
        />
      </div>
    </div>
  );
}
