/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, Popconfirm, OutlineBtn, UserStatusBadge } from '@/components';
import { asPrice, asDateTime } from '@/utils/text';
import { varLabel } from '@/common/var';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
    },
    {
      title: 'User ID',
      dataIndex: 'user',
      key: 'user',
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
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => (
        <span>
          {record.user
            ? `${record.user && record.user.first_name} ${record.user && record.user.last_name}`
            : ''}
        </span>
      ),
    },
    {
      title: 'Risk Score',
      dataIndex: 'risk_score',
      key: 'risk_score',
    },
    {
      title: 'IP Address',
      dataIndex: 'order_ip_address',
      key: 'order_ip_address',
    },
    {
      title: 'Ordered At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        return <span>{asDateTime(text)}</span>;
      },
    },
    {
      title: 'Frauded At',
      dataIndex: 'flagged_at',
      key: 'flagged_at',
      render: (text) => {
        return <span>{asDateTime(text)}</span>;
      },
    },
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
      render: (_, record) => <span>{record.merchant && record.merchant.name}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <UserStatusBadge status={varLabel('order.status', text)} />;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'order_total_amount',
      key: 'order_total_amount',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'PV',
      dataIndex: 'order_total_pv',
      key: 'order_total_pv',
    },
    {
      title: 'CV',
      dataIndex: 'order_total_cv',
      key: 'order_total_cv',
    },
    {
      title: 'Last CC 4',
      dataIndex: 'last_cc_4',
      key: 'last_cc_4',
      render: (text) => <span>{text === 'none' ? 'N/A' : text}</span>,
    },
    {
      title: 'Dist. Center',
      dataIndex: 'dist_center',
      key: 'dist_center',
      render: (_, record) => <span>{record.dist_center && record.dist_center.name}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <span>
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.markAsOk(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn loading={props.isLoadingMark && id === props.flaggedId}>
                Mark as OK
              </OutlineBtn>
            </Popconfirm>
          </span>
        );
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
      title={t('pages.fraudMangement.flaggedOrders', 'Flagged Orders')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
          setPaginationParam={props.setPaginationParam}
        />
      }
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
