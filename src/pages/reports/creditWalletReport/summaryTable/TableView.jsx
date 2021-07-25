/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, UserAvatar } from '@/components';
import { asPrice } from '@/utils/text';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (text, record) => {
        return (
          <span>
            <Link style={{ textDecoration: 'underline' }} to={`/user/detail/${text}`}>
              {record.user.uuid}
            </Link>
          </span>
        );
      },
    },
    {
      title: t('common.table.name', 'Name' ),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <span>
            <UserAvatar title={`${record.user && record.user.first_name} ${record.user && record.user.last_name}`} image={record.user && record.user.image}/>
          </span>
        );
      },
    },
    {
      title: t('common.table.totalAmount', 'Total Amount'),
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.currentBalance', 'Current Balance' ),
      dataIndex: 'current_balance',
      key: 'current_balance',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title:t('common.table.withdrawnAmount', 'Withdrawn Amount'),
      dataIndex: 'withdrawn_amount',
      key: 'withdrawn_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.transferAmount', 'Transfer Amount' ),
      dataIndex: 'transfer_amount',
      key: 'transfer_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
  ];
  
  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.creditWalletReport', 'Credit Wallet Report')}
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
