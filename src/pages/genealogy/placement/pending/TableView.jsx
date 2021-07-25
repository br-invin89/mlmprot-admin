/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';

import { TablePanel, OutlineBtn, Popconfirm } from '@/components';
import { asPrice, asDate, asDateTime } from '@/utils/text';

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
      title: 'Placement ID',
      dataIndex: 'placement_uuid',
      key: 'placement_uuid',
    },
    {
      title: 'Placement Name',
      dataIndex: 'placement_name',
      key: 'placement_name',
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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (id, record, index) => {
        return (
          <span>
            <OutlineBtn danger onClick={() => props.removeBatchData(index)}>
              Remove
            </OutlineBtn>
          </span>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.genealogy.batchList', 'Batch List')}
      applyPadding
      columns={columns}
      loading={props.isLoading}
    />
  );
}
