/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useIntl } from 'umi';
import moment from 'moment';
import { Select, Input, StartEndDatePicker } from '@/components';
import { varOptions } from '@/common/var';
import styles from '../SupportPage.less';

export default function TableHead(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const intl = useIntl();
  const [filter, setFilter] = useState({
    subject: '',
    type: '',
    priority: '',
    status: '',
    ticket_id: '',
    date_range: '',
  });

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
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
    const searchParam = { ...props.searchParam, [name]: value };
    props.setSearchParam(searchParam);
  };

  const onHandleSelect = (value, name) => {
    setFilter({
      ...filter,
      [name]: value,
    });
    const searchParam = { ...props.searchParam, [name]: value };
    props.setSearchParam(searchParam);
  };

  return (
    <div className="toolbar-container-for-md-filters">
      <div className="toolbar-sub-container">
        <Input
          placeholder={'Ticket Id'}
          size="medium"
          onChange={onHandleChange}
          name="ticket_id"
          value={filter.ticket_id}
        />
      </div>
      <div className="toolbar-sub-container">
        <Input
          placeholder={'Subject'}
          size="medium"
          onChange={onHandleChange}
          name="subject"
          value={filter.subject}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
      <div className="toolbar-sub-container">
        <Select
          className={styles.selectBox}
          size="medium"
          onChange={(value) => onHandleSelect(value, 'priority')}
          value={filter.priority}
          options={
            new Set([
              {
                label: 'All Priority',
                value: '',
              },
              ...varOptions('support.priority'),
            ])
          }
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          className={styles.selectBox}
          size="medium"
          onChange={(value) => onHandleSelect(value, 'type')}
          value={filter.type}
          options={
            new Set([
              {
                label: 'All Types',
                value: '',
              },
              ...varOptions('support.type'),
            ])
          }
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          className={styles.selectBox}
          size="medium"
          onChange={(value) => onHandleSelect(value, 'status')}
          value={filter.status}
          options={
            new Set([
              {
                label: 'All Statuses',
                value: '',
              },
              ...varOptions('support.status'),
            ])
          }
        />
      </div>
    </div>
  );
}
