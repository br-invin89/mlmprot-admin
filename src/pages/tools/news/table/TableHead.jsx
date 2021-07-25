/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { StartEndDatePicker, Select } from '@/components';
import moment from 'moment';
import { varOptions } from '@/common/var';
import { t } from '@/utils/label';
const userTypeOptions = varOptions('user.type');

export default function TableHead(props) {

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
    </div>
  );
}
