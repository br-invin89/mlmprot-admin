/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, Popconfirm, OutlineBtn } from '@/components';
import { asPrice, asDate } from '@/utils/text';
import TableHead from './TableHead';
import ExportBtn from './ExportBtn';
import PayBtn from './PayBtn';

export default function TableView(props) {
  const columns = [
    {
      title: 'Period',
      dataIndex: 'from',
      key: 'from',
      render: (_, record) => <span>{`${asDate(record.from)} ~ ${asDate(record.to)}`}</span>,
    },
    // {
    //   title: 'Paid On',
    //   dataIndex: 'paid_at',
    //   key: 'paid_at',
    //   render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    // },
    {
      title: t('common.table.totalAmount', 'Total Amount'),
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.creditPaid', 'Credit Paid'),
      dataIndex: 'credit_amount',
      key: 'credit_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.payperPaid', 'Payper Paid'),
      dataIndex: 'payper_amount',
      key: 'payper_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.ipayoutPaid', 'iPayout Paid'),
      dataIndex: 'ipayout_amount',
      key: 'ipayout_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Sales',
      dataIndex: 'sales_amount',
      key: 'sales_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    // {
    //   title: t('common.table.pv', 'PV'),
    //   dataIndex: 'pv',
    //   key: 'pv',
    // },
    // {
    //   title: t('common.table.cv', 'CV'),
    //   dataIndex: 'cv',
    //   key: 'cv',
    // },
    {
      title: t('common.table.action', 'Action'),
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => {
        return (
          <span>
            <PayBtn
              label={'Pay Credit'}
              providerName={'Wallet'}
              data={record}
              reloadTable={reloadTable}
            />
            <span style={{ marginLeft: 8 }} />
            <PayBtn
              label={'Pay Payper'}
              providerName={'Payper'}
              data={record}
              reloadTable={reloadTable}
            />
            <span style={{ marginLeft: 8 }} />
            <PayBtn
              label={'Pay iPayout'}
              providerName={'iPayout'}
              data={record}
              reloadTable={reloadTable}
            />
            <span style={{ marginLeft: 8 }} />
            <ExportBtn
              label={'Credit Details'}
              providerName={'Wallet'}
              data={record}
              disabled={record.credit_amount}
            />
            <span style={{ marginLeft: 8 }} />
            <ExportBtn
              label={'Payper Details'}
              providerName={'Payper'}
              data={record}
              disabled={record.payper_amount}
            />
            <span style={{ marginLeft: 8 }} />
            <ExportBtn
              label={'iPayout Details'}
              providerName={'iPayout'}
              data={record}
              disabled={record.ipayout_amount}
            />
          </span>
        );
      },
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  const reloadTable = () => {
    props.loadTable(props.paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.payCommission.payCommissionLabel', 'Pending Payouts')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
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
