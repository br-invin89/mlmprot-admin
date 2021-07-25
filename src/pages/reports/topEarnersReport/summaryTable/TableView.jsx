/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, UserAvatar } from '@/components';
import { asPrice } from '@/utils/text';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (_, record) => {
        return (
          <span>
            <Link style={{ textDecoration: 'underline' }} to={`/user/detail/${record.user.id}`}>
              {record.user.uuid}
            </Link>
          </span>
        );
      },
    },
    {
      title: t('common.table.username', 'Username' ),
      render: (_, record) => <span>{record.user && record.user.username}</span>,
    },
    {
      title: t('common.table.name', 'Name' ),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <UserAvatar
          title={`${record.user && record.user.first_name} ${record.user && record.user.last_name}`}
          image={record.user && record.user.image}
        />
      ),
    },
    {
      title: 'Earning',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.topEarners','Top 100 Earners',)}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          loadTable={props.loadTable}
        />
      }
      applyPadding
      columns={columns}
      loading={props.isLoading}
    />
  );
}
