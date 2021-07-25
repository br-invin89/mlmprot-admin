/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { StartEndDatePicker, Select } from '@/components';
import moment from 'moment';
import { varOptions } from '@/common/var';
import { t } from '@/utils/label';

const userTypeOptions = varOptions('user.type')

export default function TableHead(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format()}|${moment(v[1]).format()}`;
    } else {
      setStartDate('');
      setEndDate('');
    }
    const searchParam = { ...props.searchParam, date_range: dateRange };
    props.setSearchParam(searchParam);
  };

  const onEligibleUserTypesChange = (value) => {
    const searchParam = { ...props.searchParam, eligible_user_types: value };
    props.setSearchParam(searchParam);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <Select
          placeholder={
            t('pages.news.allEligibilities', 'All Eligibilities')}
          size="medium"
          onChange={onEligibleUserTypesChange}
          options={[
            { label: 'All Eligibilities', value: '' },
            ...userTypeOptions
          ]}
          allowClear
        />
      </div>
      <div className="toolbar-sub-container">
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
