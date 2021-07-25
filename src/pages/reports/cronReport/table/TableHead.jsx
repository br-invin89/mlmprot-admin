/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, StartEndDatePicker, Select } from '@/components';
import moment from 'moment';

export default function TableHead(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cronName, setCronName] = useState('');

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format().slice(0, 10)}|${moment(v[1]).format().slice(0, 10)}`;
    } else {
      setStartDate(moment().clone().startOf('month'));
      setEndDate(moment().clone());
      dateRange = `${moment().clone().startOf('month').format('YYYY-MM-DD')}|${moment()
        .clone()
        .format('YYYY-MM-DD')}`;
    }
    const searchParam = { ...props.searchParam, date_range: dateRange };
    const paginationParam = { ...props.paginationParam, currentPage: 1 };
    props.setSearchParam(searchParam);
    props.loadTable(paginationParam, searchParam);
  };

  const onChangeCron = (v) => {
    setCronName(v);
    const searchParam = { ...props.searchParam, cron_name: v };
    const paginationParam = { ...props.paginationParam, currentPage: 1 };
    props.setSearchParam(searchParam);
    props.loadTable(paginationParam, searchParam);
  };

  useEffect(() => {
    const dateRange = props.searchParam.date_range;
    setStartDate(moment(dateRange.split('|')[0]));
    setEndDate(moment(dateRange.split('|')[1]));
  }, []);

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
      <div className={`toolbar-sub-container`}>
        <Select
          value={cronName}
          options={[
            { label: 'All Cron Job', value: '' },
            { label: 'Qualification & Autoplace', value: 'Qualification & Autoplace' },
            { label: 'Autoship Check', value: 'Autoship Check' },
            { label: 'Calculate SalesDaily', value: 'Calculate SalesDaily' },
            { label: 'Calculate CountryPayout', value: 'Calculate CountryPayout' },
            { label: 'Broadcast Email', value: 'Broadcast Email' },
            { label: 'Check BankPayment', value: 'Check BankPayment' },
            { label: 'Genealogy Update', value: 'Genealogy Update' },
          ]}
          onChange={onChangeCron}
        />
      </div>
    </div>
  );
}
