import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, UserStatusBadge, UserTypeBadge } from '@/components';
import { varLabel } from '@/common/var';

export default function TableView(props) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (userId, record) => {
        return (
          <Link to={`/user/detail/${record.id}`} style={{ textDecoration: 'underline' }}>
            {userId}
          </Link>
        );
      },
    },
    {
      title: 'User Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <UserTypeBadge type={varLabel('user.type', type)} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return <UserStatusBadge status={varLabel('user.status', status)} />;
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => <span>{`${record.first_name} ${record.last_name}`}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTableData(paginationParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.dashboard.searchResults', 'Search Results')}
      columns={columns}
      onPageChange={onPageChange}
      loading={props.isLoading}
      paginationParam={props.paginationParam}
    />
  );
}
