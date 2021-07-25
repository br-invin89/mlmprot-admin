/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel } from '@/components';
import { asPrice, asDateTime } from '@/utils/text';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uuid',
      render: (_, record) => {
        return (
          <Link
            style={{ textDecoration: 'underline' }}
            to={`/user/detail/${record && record.id}`}
          >
            {record && record.uuid}
          </Link>
        );
      },
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => <span>{`${record.first_name} ${record.last_name}`}</span>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Created At',
      key: 'created_on',
      render: (_, record) => {
        return <span>{asDateTime(record.created_at)}</span>;
      },
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
        <>
          {t('pages.reports.inactivityReport', 'Inactivity Report')}
          {': '}
          <small>{`${props.statsData.count} of ${props.statsData.total_count} users`}</small>
        </>
      }
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          statsData={props.statsData}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
        />
      }
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
