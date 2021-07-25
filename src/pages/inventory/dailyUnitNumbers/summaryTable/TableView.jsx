/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { OutlineBtn, TablePanel } from '@/components';
import TableHead from './TableHead';
import { t } from '@/utils/label';

export default function TableView(props) {
  return (
    <TablePanel
      data={props.tableData}
      title={t( "pages.inventory.dailyUnitNumbers", "Daily Unit Numbers")}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
        />
      }
      applyPadding
      columns={props.columns}
      onPageChange={props.loadTable}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
