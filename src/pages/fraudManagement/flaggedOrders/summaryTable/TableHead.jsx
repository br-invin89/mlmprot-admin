/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { StartEndDatePicker, Input } from '@/components';
import moment from 'moment';
import styles from '../FlaggedOrdersPage.less';

export default function TableHead(props) {
  const intl = useIntl();
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [ipAddress, setIpAddress] = useState('');

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
    const searchParam = { ...props.searchParam, date_range: dateRange };
    props.setSearchParam(searchParam);
  };

  const onHandleChange = (e) => {
    setIpAddress(e.target.value);
    const searchParam = { ...props.searchParam, ip_address: e.target.value };
    props.setSearchParam(searchParam);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <Input
          placeholder={'IP Address'}
          size="medium"
          onChange={onHandleChange}
          name="ipAddress"
          value={ipAddress}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
