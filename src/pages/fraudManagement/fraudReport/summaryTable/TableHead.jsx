/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Select, Input, InputRange } from '@/components';
import { countryOptions } from '@/utils/country';
import styles from '../FraudReportPage.less';

export default function TableHead(props) {
  const intl = useIntl();
  const [filter, setFilter] = useState({
    first_name: '',
    last_name: '',
    username: '',
    country: ''
  })

  const onHandleChange = (e) => {
    const { name, value } = e.target
    setFilter({
      ...filter,
      [name]: value
    });
    const searchParam = { ...props.searchParam, [name]: value };
    props.setSearchParam(searchParam);
  };

  const onHandleSelect = (value) => {
    setFilter({
      ...filter,
      country: value
    });
    const searchParam = { ...props.searchParam, country: value };
    props.setSearchParam(searchParam);
  }

  return (
    <div className="toolbar-container-for-md-filters">
      <div className="toolbar-sub-container">
        <Input
          placeholder={'First Name'}
          size="medium"
          onChange={onHandleChange}
          name="first_name"
          value={filter.first_name}
        />
      </div>
      <div className="toolbar-sub-container">
        <Input
          placeholder={'Last Name'}
          size="medium"
          onChange={onHandleChange}
          name="last_name"
          value={filter.last_name}
        />
      </div>
      <div className="toolbar-sub-container">
        <Input
          placeholder={'Username'}
          size="medium"
          onChange={onHandleChange}
          name="username"
          value={filter.username}
        />
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '187px'}}>
          <InputRange
            type="number"
            startValue={filter.risk_score_min}
            endValue={filter.risk_score_max}
            onStartChange={(e) => {
              setFilter({
                ...filter,
                risk_score_min: e.target.value
              });
              const searchParam = { ...props.searchParam, risk_score_min: e.target.value };
              props.setSearchParam(searchParam);
            }}
            onEndChange={(e) => {
              setFilter({
                ...filter,
                risk_score_max: e.target.value
              });
              const searchParam = { ...props.searchParam, risk_score_max: e.target.value };
              props.setSearchParam(searchParam);

            }}
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <Select
          className={styles.selectBox}
          size="medium"
          onChange={onHandleSelect}
          value={filter.country}
          options={
            new Set([
              {
                label: 'All Countries',
                value: '',
              },
              ...countryOptions(),
            ])
          }
        />
      </div>
    </div>
  );
}
