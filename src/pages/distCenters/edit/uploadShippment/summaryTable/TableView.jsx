/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, OutlineBtn, Popconfirm } from '@/components';
import { asDate } from '@/utils/text';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: 'Shipped Orders',
      dataIndex: 'shipped_orders',
      key: 'shipped_orders',
    },
    {
      title: 'Failed Orders',
      dataIndex: 'failed_orders',
      key: 'failed_orders',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <Popconfirm
            title={'Are you sure ?'}
            onConfirm={() => props.getUploadedFile(id)}
            okText="Yes"
            placement="top"
            cancelText="No"
          >
            <OutlineBtn loading={props.isLoadingFile && id === props.uploadShippmentId}>
              Download
            </OutlineBtn>
          </Popconfirm>
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
      title={t('pages.distCenter.uploadShippments', 'Upload Shippments')}
      toolbar={
        <TableHead
          distCenterId={props.distCenterId}
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
