/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';

import { TablePanel, CountryFlag, Popconfirm, OutlineBtn } from '@/components';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
      render: (_, record) => <div> {record.id} </div>,
    },
    {
      title: 'Country ',
      dataIndex: 'country',
      key: 'country',
      render: (text) => <CountryFlag title={text} />,
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => <div> {record.product.title} </div>,
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
              onConfirm={() => props.deleteProductsAvailability(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn danger loading={props.isLoadingDelete && id === props.productId}>
                Delete
              </OutlineBtn>
            </Popconfirm>
          </div>
        );
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
      title={t('pages.products.products', 'Products')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          allProductsOption={props.allProductsOption}
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
