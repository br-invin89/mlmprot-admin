/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, Popconfirm, OutlineBtn } from '@/components';
import { asDate } from '@/utils/text';

export default function TableView(props) {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{asDate(text)}</span>
    },
    {
      title: 'Total Orders',
      dataIndex: 'total_orders',
      key: 'total_orders',
    },
    {
      title: 'Confirmed Orders',
      dataIndex: 'confirmed_orders',
      key: 'confirmed_orders',
    },
    {
      title: 'New Orders',
      dataIndex: 'new_orders',
      key: 'new_orders',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <div style={{ display: 'flex' }}>
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.getConfirmOrder(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn loading={props.isLoadingOrders && id === props.batchId}>
                {t('pages.distCenter.getConfirmedOrders', 'Get Confirmed Orders')}
              </OutlineBtn>
            </Popconfirm>
            <div style={{ width: 12 }} />
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.getConfirmNewOrder(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn loading={props.isLoadingNewOrders && id === props.batchId}>
                {t('pages.distCenter.GetNewOrdersToConfirm', 'Get New Orders To Confirm')}
              </OutlineBtn>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.distCenter.batches','Batches')}
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
