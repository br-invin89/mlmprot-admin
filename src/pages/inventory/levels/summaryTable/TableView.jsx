/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { TablePanel, UserAvatar } from '@/components';
import TableHead from './TableHead';
import { t } from '@/utils/label';
import { asPrice } from '@/utils/text';
import styles from '../InventoryLevelsSubPage.less'

export default function TableView(props) {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => {
        return (
          <>
          <img src={record.product && record.product.image} className={`${styles.productImage}`} />
          {record.product && record.product.title}
        </>
        )
      },
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      render: (_, record) => <span>{asPrice(record.product && record.product.retail_price)}</span>
    },
    {
      title: 'Member Price',
      dataIndex: 'member_price',
      key: 'member_price',
      render: (_, record) => <span>{asPrice(record.product && record.product.member_price)}</span>
    },
    {
      title: 'On Hand',
      dataIndex: 'on_hand_amount',
      key: 'on_hand_amount',
    }
  ];
  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.inventory.inventoryLevels', 'Inventory Levels')}
      toolbar={<TableHead searchParam={props.searchParam} />}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      columns={columns}
      loading={props.isLoading}
    />
  );
}
