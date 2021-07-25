/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { OutlineBtn, TablePanel } from '@/components';
import TableHead from './TableHead';
import { t } from '@/utils/label';
import {asDate} from "@/utils/text";

export default function TableView(props) {
  const columns = [
    {
      title: 'Admin',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <span>{`${record.admin.first_name} ${record.admin.last_name}`}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => <span>{asDate(record.created_at)}</span>,
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => <span>{record.product.title}</span>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text) => <span>{text && text.toUpperCase()}</span>,
    },
    {
      title: 'Dist Center',
      dataIndex: 'dist_name',
      key: 'dist_name',
      render: (_, record) => <span>{record.dist_center.name}</span>,
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={t( "pages.inventory.inventoryLogs", "Inventory Logs")}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          distCenters={props.distCenters}
          products={props.products}
        />
      }
      showFiltersLarge
      applyPadding
      columns={columns}
      onPageChange={props.loadTable}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
