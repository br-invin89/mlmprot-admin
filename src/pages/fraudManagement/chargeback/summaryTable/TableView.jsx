/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { TablePanel, StartEndDatePicker } from '@/components';
import { asPrice } from '@/utils/text';
import styles from '../ChargebackPage.less';
import TableHead from './TableHead';
import StatsCardView from '../summaryCards/StatsCardView';

export default function TableView(props) {
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

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

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (text, record) => {
        return (
          <span>
            <Link style={{ textDecoration: 'underline' }} to={`/user/detail/${text}`}>
              {record.user && record.user.uuid}
            </Link>
          </span>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <span>{`${record.user && record.user.first_name} ${
          record.user && record.user.last_name
        }`}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => <span>{record.user && record.user.phone}</span>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => <span>{record.user && record.user.username}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'order_total_amount',
      key: 'order_total_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Last CC 4',
      dataIndex: 'last_cc_4',
      key: 'last_cc_4',
      render: (text) => <span>{text === 'none' ? 'N/A' : text}</span>,
    },
  ];
  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={
        <div className={styles.titleDatepicker}>
          <StartEndDatePicker
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            className={styles.titleDatepicker}
          />
        </div>
      }
      toolbar={
        <TableHead
          tableData={props.tableData}
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
        />
      }
      statsCard={<StatsCardView isLoading={props.isLoadingStatsCard} statsData={props.statsData} />}
      applyPadding
      columns={columns}
      showSearchIcon
      onSearch={() => {
        const paginationParam = { ...props.paginationParam, currentPage: 1 };
        props.loadTable(paginationParam, props.searchParam);
      }}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
