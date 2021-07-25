/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { TablePanel } from '@/components';
import { t } from '@/utils/label';

export default function TableView(props) {

  return (
    <TablePanel
      data={props.tableData}
      title={
        t('pages.resources.resources', 'Resources')}
      onPageChange={props.loadTable}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
