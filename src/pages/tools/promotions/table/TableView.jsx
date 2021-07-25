/* eslint-disable no-use-before-define,camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { DeleteBtn, OutlineBtn, TablePanel, UserStatusBadge, UserTypeBadge } from '@/components';
import { asDate, asPrice, asPercent } from '@/utils/text';
import TableHead from './TableHead';
import ActivateBtn from './ActivateBtn';
import { stringToArray } from '@/utils/utils';
import { varLabel } from '@/common/var';
import { deletePromotionsApi } from '@/services/tools/promotions';
import { t } from '@/utils/label';
import styles from '../PromotionsPage.less'

export default function TableView(props) {
  const { onEditItem } = props;

  const renderShowTo = (values) => {
    if (!values) return t('common.label.none', 'None');

    let showTos = []
    for (let value of values) {
      showTos.push({
        label: varLabel('user.type', value),
        value: value*1
      })
    }

    if (!showTos || showTos.length <= 0) return t('common.label.none', 'None');

    return (
      <div className='d-flex align-items-center'>
        {showTos.map(({label, value}, index) =>
          index === showTos.length - 1 ? (
            <UserTypeBadge type={label} />
          ) : (
            <>
              <UserTypeBadge type={label} /> |{' '}
            </>
          ),
        )}
      </div>
    );
  };

  const columns = [
    {
      title: t('common.label.name', 'Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => text,
    },
    {
      title: t('common.label.discount', 'Discount'),
      dataIndex: 'discount_value',
      key: 'discount_value',
      render: (text, { discount_type }) => <span>{discount_type === 1 ? `${asPrice(text*1)}` : `${asPercent(text*1)}`}</span>
    },
    {
      title: t('pages.resources.activeDates', 'Active Dates'),
      dataIndex: 'start_at',
      key: 'start_at',
      render: (text, {start_at, end_at }) => `${asDate(start_at)} - ${asDate(end_at)}`,
    },
    {
      title: t('common.table.showTo', 'Show To'),
      dataIndex: 'eligible_user_types',
      key: 'eligible_user_types',
      render: (values) => renderShowTo(stringToArray(values)),
    },
    {
      title: t('common.label.status','Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return <UserStatusBadge status={varLabel('promotion.status', status)} />;
      },
    },
    {
      title: t('common.table.action', 'Action'),
      dataIndex: 'action',
      key: 'action',
      render: (item, data) => {
        return (
          <span>
            <ActivateBtn data={data} 
              handleSearch={()=>props.loadTable()} className='mr-10' />
            <OutlineBtn
              className="mr-10"
              onClick={() => {
                props.toggle()
                onEditItem(data);
              }}
            >
              {
                t('common.label.edit', 'Edit')}
            </OutlineBtn>
            <DeleteBtn className={styles.deleteBtn} data={data} loadData={props.loadTable} deleteApi={deletePromotionsApi} />
          </span>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={
        t('pages.promotions.promotions', 'Promotions')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          productList={props.productList}
        />
      }
      columns={columns}
      onPageChange={props.loadTable}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
