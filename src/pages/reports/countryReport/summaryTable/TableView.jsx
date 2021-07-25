/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';

import { TablePanel, CountryMapChart, CountryFlag } from '@/components';
import { asPrice, asDate } from '@/utils/text';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (text) => <CountryFlag country={text} />,
    },
    // {
    //   title: 'Autoship PV',
    //   dataIndex: 'autoship_pv',
    //   key: 'autoship_pv',
    // },
    // {
    //   title: 'Autoship CV',
    //   dataIndex: 'autoship_cv',
    //   key: 'autoship_cv',
    // },
    // {
    //   title: 'Autoship Amount',
    //   dataIndex: 'autoship_sales_amount',
    //   key: 'autoship_sales_amount',
    // },
    // {
    //   title: 'Autoship Count',
    //   dataIndex: 'autoship_sales_count',
    //   key: 'autoship_sales_count',
    // },
    // {
    //   title: 'Backoffice PV',
    //   dataIndex: 'backoffice_pv',
    //   key: 'backoffice_pv',
    // },
    // {
    //   title: 'Backoffice CV',
    //   dataIndex: 'backoffice_cv',
    //   key: 'backoffice_cv',
    // },
    // {
    //   title: 'Backoffice Amount',
    //   dataIndex: 'backoffice_sales_amount',
    //   key: 'backoffice_sales_amount',
    // },
    // {
    //   title: 'Backoffice Count',
    //   dataIndex: 'backoffice_sales_count',
    //   key: 'backoffice_sales_count',
    // },
    // {
    //   title: 'Corp PV',
    //   dataIndex: 'corp_pv',
    //   key: 'corp_pv',
    // },
    // {
    //   title: 'Corp CV',
    //   dataIndex: 'corp_cv',
    //   key: 'corp_cv',
    // },
    // {
    //   title: 'Corp Amount',
    //   dataIndex: 'corp_sales_amount',
    //   key: 'corp_sales_amount',
    // },
    // {
    //   title: 'Corp Count',
    //   dataIndex: 'corp_sales_count',
    //   key: 'corp_sales_count',
    // },
    // {
    //   title: 'Credit Wallet PV',
    //   dataIndex: 'credit_wallet_pv',
    //   key: 'credit_wallet_pv',
    // },
    // {
    //   title: 'Credit Wallet CV',
    //   dataIndex: 'credit_wallet_cv',
    //   key: 'credit_wallet_cv',
    // },
    // {
    //   title: 'Credit Wallet Amount',
    //   dataIndex: 'credit_wallet_sales_amount',
    //   key: 'credit_wallet_sales_amount',
    // },
    // {
    //   title: 'Credit Wallet Count',
    //   dataIndex: 'credit_wallet_sales_count',
    //   key: 'credit_wallet_sales_count',
    // },
    // {
    //   title: 'Onetime PV',
    //   dataIndex: 'onetime_pv',
    //   key: 'onetime_pv',
    // },
    // {
    //   title: 'Onetime CV',
    //   dataIndex: 'onetime_cv',
    //   key: 'onetime_cv',
    // },
    // {
    //   title: 'Onetime Amount',
    //   dataIndex: 'onetime_sales_amount',
    //   key: 'onetime_sales_amount',
    // },
    // {
    //   title: 'Onetime Count',
    //   dataIndex: 'onetime_sales_count',
    //   key: 'onetime_sales_count',
    // },
    // {
    //   title: 'Total Costs',
    //   dataIndex: 'total_costs',
    //   key: 'total_costs',
    // },
    {
      title: 'PV',
      dataIndex: 'total_pv',
      key: 'total_pv',
    },
    {
      title: 'CV',
      dataIndex: 'total_cv',
      key: 'total_cv',
    },
    {
      title: 'Sales',
      dataIndex: 'total_sales_amount',
      key: 'total_sales_amount',
    },
    {
      title: 'Number of Orders',
      dataIndex: 'total_sales_count',
      key: 'total_sales_count',
    },
  ];
  const obj = {};
  props.tableData &&
    props.tableData.map((item, i) => {
      obj[`${item.country}`] = (i + 1) * 1000;
    });

  return (<div className="country-report">
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.countryRevenue', 'Country Revenue')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          loadTable={props.loadTable}
        />
      }
      chart={
        <div className="countryMap">
          <CountryMapChart data={props.chartData} obj={obj} />
        </div>
      }
      showSearchIcon
      onSearch={() => {
        props.loadTable(props.searchParam);
        props.loadChart(props.searchParam);
      }}
      columns={columns}
      loading={props.isLoading}
    />
  </div>);
}
