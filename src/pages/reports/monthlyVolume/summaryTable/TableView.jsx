/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from '@/utils/label';

import { TablePanel } from '@/components';
import { asPrice, asDate } from '@/utils/text';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      key: 'uuid',
      render: (_, record) => {
        return (
          <Link
            style={{ textDecoration: 'underline' }}
            to={`/user/detail/${record.user && record.user.id}`}
          >
            {record.user && record.user.uuid}
          </Link>
        );
      },
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => {
        return <span>{`${record.user.first_name} ${record.user.last_name}`}</span>;
      },
    },
    {
      title: 'Username',
      key: 'username',
      render: (_, record) => <span>{record.user.username}</span>,
    },
    {
      title: 'PV',
      dataIndex: 'pv',
      key: 'pv',
    },
    {
      title: 'GV',
      dataIndex: 'gv',
      key: 'gv',
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.monthlyVolume', 'Monthly Volume')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
        />
      }
      applyPadding
      showSearchIcon
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
      onSearch={props.onSearch}
    />
  );
}
