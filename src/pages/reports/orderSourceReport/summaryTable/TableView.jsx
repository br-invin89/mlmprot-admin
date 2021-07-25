/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel } from '@/components';
import { asDate, asPrice } from '@/utils/text';
import styles from '../OrderSourceReportPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: t('common.table.date', 'Date' ),
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        return <span>{asDate(text)}</span>;
      },
    },
    {
      title: 'Total Sales',
      dataIndex: 'total_sales_amount',
      key: 'total_sales_amount',
      render: (text) => (<span>{asPrice(text)}</span>)
    },
    // {
    //   title: t('common.table.totalSalesCount', 'Total Sales Count' ),
    //   dataIndex: 'total_sales_count',
    //   key: 'total_sales_count',
    // },
    {
      title: 'BackOffice Shop Sales',
      dataIndex: 'onetime_sales_amount',
      key: 'onetime_sales_amount',
      render: (text) => (<span>{asPrice(text)}</span>)
    },
    // {
    //   title: t('common.table.oneTimeCount', 'Onetime Count' ),
    //   dataIndex: 'onetime_sales_count',
    //   key: 'onetime_sales_count',
    // },
    {
      title: 'Autoship Sales',
      dataIndex: 'autoship_sales_amount',
      key: 'autoship_sales_amount',
      render: (text) => (<span>{asPrice(text)}</span>)
    },
    // {
    //   title: t('common.table.autoshipCount', 'Autoship Count'),
    //   dataIndex: 'autoship_sales_count',
    //   key: 'autoship_sales_count',
    // },
    // {
    //   title: t('common.table.creditWalletAmount', 'Credit Wallet Amount' ),
    //   dataIndex: 'credit_wallet_sales_amount',
    //   key: 'credit_wallet_sales_amount',
    //   render: (text) => (<span>{asPrice(text)}</span>)
    // },
    // {
    //   title: t('common.table.creditWalletCount', 'Credit Wallet Count' ),
    //   dataIndex: 'credit_wallet_sales_count',
    //   key: 'credit_wallet_sales_count',
    // },
    {
      title: 'Corp Joined Sales',
      dataIndex: 'corp_sales_amount',
      key: 'corp_sales_amount',
      render: (text) => (<span>{asPrice(text)}</span>)
    },
  ];
  
  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (<div className="order-source">
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.orderSource','Order Source')}
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  </div>);
}
