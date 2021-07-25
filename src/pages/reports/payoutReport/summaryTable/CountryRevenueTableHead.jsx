/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { StartEndDatePicker } from '@/components';
import moment from 'moment';
import styles from '../PayoutReportPage.less';

export default function CountryRevenueTableHead(props) {
  const [startDate, setStartDate] = useState(moment().subtract(1, 'months').startOf('month'));
  const [endDate, setEndDate] = useState(moment().add(0, 'months').endOf('month'));

  const onDateChange = (v) => {
    const month_end_date = []
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      let start_date = moment(v[0]).startOf('month').format("YYYY-MM-DD");
      let end_date = moment(v[1]).endOf('month').format("YYYY-MM-DD");
      dateRange = `${start_date}|${end_date}`;

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
