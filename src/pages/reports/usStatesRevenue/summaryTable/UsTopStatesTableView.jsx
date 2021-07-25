/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useIntl } from 'umi';
import { TablePanel } from '@/components';
import { asPrice } from '@/utils/text';
import UsTopStatesTableHead from './UsTopStatesTableHead';
import { t } from '@/utils/label';

export default function UsTopStatesTableView(props) {
  const intl = useIntl();
  const columns = [
    {
      title: 'State',
      dataIndex: 'us_state',
      key: 'us_state',
    },
    {
      title: 'Sales Amount',
      dataIndex: 'sales_amount',
      key: 'sales_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.topFiveStates', 'Top 5 States')}
      toolbar={
        <UsTopStatesTableHead
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
