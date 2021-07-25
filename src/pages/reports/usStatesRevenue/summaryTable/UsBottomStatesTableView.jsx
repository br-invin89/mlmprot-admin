/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel } from '@/components';
import { asPrice } from '@/utils/text';
import UsBottomStatesTableHead from './UsBottomStatesTableHead';

export default function UsBottomStatesTableView(props) {
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
      title={t('pages.reports.bottomFiveStates', 'Bottom 5 States')}
      toolbar={
        <UsBottomStatesTableHead
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
