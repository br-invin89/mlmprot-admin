/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';

import { TablePanel, UserStatusBadge } from '@/components';
import { asPrice, asDate, asDateTime } from '@/utils/text';
import { varLabel } from '@/common/var';

export default function TableView(props) {
  const columns = [
    {
      title: 'No',
      dataIndex: 'sno',
      key: 'sno',
      render: (_, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'User ID',
      dataIndex: 'user_uuid',
      key: 'user_uuid',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Enroller ID',
      dataIndex: 'enroller_uuid',
      key: 'enroller_uuid',
    },
    {
      title: 'Enroller Name',
      dataIndex: 'enroller_name',
      key: 'enroller_name',
    },
    {
      title: 'Created By',
      dataIndex: 'admin_name',
      key: 'admin_name',
    },
    {
      title: 'Created At',
      key: 'created_at',
      render: (_, record) => <span>{record.created_at ? asDateTime(record.created_at) : ''}</span>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, row) => (
        <UserStatusBadge status={varLabel('genealogyUpdateHistory.status', row.status)} />
      ),
    },
    {
      title: 'Comment',
      key: 'comment',
      dataIndex: 'comment',
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={'History'}
      applyPadding
      columns={columns}
      loading={props.isLoading}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
    />
  );
}
