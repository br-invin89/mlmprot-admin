/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, OutlineBtn, Space } from '@/components';
import { asDate, asPrice } from '@/utils/text';
import PayoutReportTableHead from './PayoutReportTableHead';
import ExportBtn from './ExportBtn';

export default function PayoutReportTableView(props) {
  const columns = [
    {
      title: t('common.table.period', 'Period'),
      dataIndex: 'from',
      key: 'from',
      render: (_, record) => <span>{`${asDate(record.from)} ~ ${asDate(record.to)}`}</span>,
    },
    {
      title: t('common.table.paidOn', 'Paid On'),
      dataIndex: 'paid_at',
      key: 'paid_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: t('common.table.paidAmount', 'Total Amount'),
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
      title: t('common.table.payperPaid', 'iPayout Paid'),
      dataIndex: 'ipayout_amount',
      key: 'ipayout_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.sales', 'Sales'),
      dataIndex: 'sales_amount',
      key: 'sales_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    // {
    //   title: t('common.table.pv', 'PV' ),
    //   dataIndex: 'pv',
    //   key: 'pv',
    // },
    // {
    //   title: t('common.table.cv', 'CV' ),
    //   dataIndex: 'cv',
    //   key: 'cv',
    // },
    {
      title: t('common.table.action', 'Action'),
      dataIndex: 'ofSales',
      key: 'ofSales',
      render: (_, record) => (
        <Space size={10}>
          <ExportBtn
            label={'Credit Details'}
            providerName={'Wallet'}
            data={record}
            csv={record.credit_csv}
          />
          <span style={{ marginLeft: 8 }} />
          <ExportBtn
            label={'Payper Details'}
            providerName={'Payper'}
            data={record}
            csv={record.payper_csv}
          />
          <span style={{ marginLeft: 8 }} />
          <ExportBtn
            label={'iPayout Details'}
            providerName={'iPayout'}
            data={record}
            csv={record.ipayout_csv}
          />
        </Space>
      ),
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <div className="payout-report">
      <TablePanel
        data={props.tableData}
        title={t('pages.reports.payoutReport', 'Payout Report')}
        applyPadding
        columns={columns}
        showSearchIcon
        onSearch={() => {
          props.loadTable(
            {
              currentPage: 1,
              perPage: 10,
            },
            props.searchParam,
          );
        }}
        toolbar={
          <PayoutReportTableHead
            searchParam={props.searchParam}
            setSearchParam={props.setSearchParam}
          />
        }
        onPageChange={onPageChange}
        paginationParam={props.paginationParam}
        loading={props.isLoading}
      />
    </div>
  );
}
