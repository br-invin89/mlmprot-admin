import React from 'react';

import { TablePanel } from '@/components';
import { t } from '@/utils/label';
import { asDate, asPrice } from '@/utils/text';

export default function TableView(props) {
  // table columns: date, success_amount, failed_amount, success_pv, failed_pv, success_cv, success_cv, action
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <div>{asDate(text)}</div>,
    },
    {
      title: 'Success Amount',
      dataIndex: 'success_amount',
      key: 'success_amount',
      render: (text) => <div>{asPrice(text)}</div>,
    },
    {
      title: 'Failed Amount',
      dataIndex: 'failed_amount',
      key: 'failed_amount',
      render: (text) => <div>{asPrice(text)}</div>,
    },
    {
      title: 'Success PV',
      dataIndex: 'success_pv',
      key: 'success_pv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Failed PV',
      dataIndex: 'failed_pv',
      key: 'failed_pv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Success CV',
      dataIndex: 'success_cv',
      key: 'success_cv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Failed CV',
      dataIndex: 'failed_cv',
      key: 'failed_cv',
      render: (text) => <div>{text}</div>,
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'date',
    //   key: 'date',
    //   render: (text) => <a onClick={() => props.setSelectedDate(text)}>detail</a>,
    // },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('autoshipreport', 'Autoship Report')}
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
