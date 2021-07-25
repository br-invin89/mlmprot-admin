/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel } from '@/components';
import { asPrice, asDate } from '@/utils/text';
import { varLabel } from '@/common/var';
import Toolbar from './Toolbar';

export default function TableView(props) {
  const columns = [
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <span>{varLabel('userMinusBonusHistory.type', text)}</span>,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (text) => <span>{text}</span>,
    },
  ];

  const onPageChange = (currentPage) => {
    const paginationParam0 = {
      ...props.paginationParam,
      currentPage,
    };
    props.setPaginationParam(paginationParam0);
    props.handleSearch(paginationParam0);
  };

  const handleSearch = () => {
    const paginationParam0 = {
      ...props.paginationParam,
      currentPage: 1,
    };
    props.handleSearch(paginationParam0);
  };

  return (
    <TablePanel
      title={
        t("pages.userSearch.minusBonusHistory","Minus Bonus History")
      }
      toolbar={<Toolbar amount={props.amount} />}
      loading={props.isLoading}
      data={props.tableData}
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      onSearch={handleSearch}
    />
  );
}
