/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';

import { TablePanel } from '@/components';
import { asPrice, asDate } from '@/utils/text';
import TableHead from './TableHead';
import styles from '../MerchantsPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: t('common.table.merchant', 'Merchant'),
      dataIndex: 'merchant',
      key: 'merchant',
      render: (_, record) => {
        return <span>{record.merchant && record.merchant.name}</span>;
      },
    },
    {
      title: t('common.table.date', 'Date'),
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        return <span>{asDate(text)}</span>;
      },
    },
    {
      title: t('common.table.successful', 'Successful'),
      dataIndex: 'success_count',
      key: 'success_count',
    },
    {
      title: t('common.table.successfulAmount', 'Successful Amount'),
      dataIndex: 'success_amount',
      key: 'success_amount',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: t('common.table.failed', 'Failed'),
      dataIndex: 'failed_count',
      key: 'failed_count',
    },
    {
      title: t('common.table.failedPercent', 'Failed Percent'),
      dataIndex: 'failed_percent',
      key: 'failed_percent',
      render: (text) => {
        return <span>{`${text}%`}</span>;
      },
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.merchant.merchantLabel', 'Merchants')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
          className={styles.merchantHeadLine}
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
