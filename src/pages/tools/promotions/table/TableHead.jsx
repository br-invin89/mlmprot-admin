/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StartEndDatePicker, Select, Option } from '@/components';
import moment from 'moment';
import { varOptions } from '@/common/var';
import { t } from '@/utils/label';

const userTypeOptions = varOptions('user.type');
const promotionStatusOptions = varOptions('promotion.status');

export default function TableHead(props) {
  const { productList = [] } = props;

  const productOptions = productList.map((product) => {
    return {
      label: product.title,
      value: product.id,
    };
  });
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

  const onEligibleUserTypesChange = (value) => {
    const searchParam = { ...props.searchParam, eligible_user_types: value };
    props.setSearchParam(searchParam);
  };

  const OnStatusOptionChange = (value) => {
    const searchParam = { ...props.searchParam, status: value };
    props.setSearchParam(searchParam);
  };

  const onAdminDownDownChange = (value) => {
    const searchParam = { ...props.searchParam, admin_id: value };
    props.setSearchParam(searchParam);
  };

  const OnProductOptionChange = (value) => {
    const searchParam = { ...props.searchParam, product_id: value };
    props.setSearchParam(searchParam);
  };

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

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <Select
          placeholder={
            t('pages.news.allEligibilities','All Eligibilities')}
          size="medium"
          onChange={onEligibleUserTypesChange}
          options={[{ label: 'All Eligibilities', value: '' }, ...userTypeOptions]}
          allowClear
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          placeholder={
            t('pages.resources.allStatuses', 'All Statuses')}
          noMarginBottom
          size="medium"
          onChange={OnStatusOptionChange}
          options={[{ label: 'All Status', value: '' }, ...promotionStatusOptions]}
          allowClear
        />
      </div>
      <div className="toolbar-sub-container" style={{ width: '100%' }}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
