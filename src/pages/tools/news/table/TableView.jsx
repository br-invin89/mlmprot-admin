/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { DeleteBtn, OutlineBtn, TablePanel, UserTypeBadge, UserStatusBadge } from '@/components';
import { asDateTime } from '@/utils/text';
import TableHead from './TableHead';
import { stringToArray } from '@/utils/utils';
import { varLabel } from '@/common/var';
import { deleteNewsApi } from '@/services/tools/news';
import { t } from '@/utils/label';
import ActivateBtn from './ActivateBtn';
import styles from '../NewsPage.less'

export default function TableView(props) {

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
      title: t('common.table.id', 'ID'),
      dataIndex: 'id',
      key: 'id',
      render: (text) => text,
    },
    {
      title: t( 'common.table.title', 'Title'),
      dataIndex: 'title',
      key: 'title',
      render: (text) => text,
    },
    {
      title: t( 'common.table.showTo', 'Show To'),
      dataIndex: 'eligible_user_types',
      key: 'eligible_user_types',
      render: (values) => renderShowTo(stringToArray(values)),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <UserStatusBadge status={varLabel('news.status', text)} />;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        return <span>{asDateTime(text)}</span>;
      },
    },
    {
      title: t('common.table.action', 'Action'),
      dataIndex: 'action',
      key: 'action',
      render: (item, data) => {
        return (
          <span>
            <ActivateBtn data={data} handleSearch={()=>props.loadTable()} className='mr-10' />
            <OutlineBtn
              className="mr-10"
              onClick={() => {
                props.toggle()

                props.onEditItem(data);
              }}
            >
              {
                t('common.label.edit', 'Edit')}
            </OutlineBtn>
            <DeleteBtn className={styles.deleteBtn} data={data} loadData={props.loadTable} deleteApi={deleteNewsApi} />
          </span>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={
        t('pages.news.news', 'News')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={(page)=>props.loadTable(page)}
        />
      }
      columns={columns}
      onPageChange={(page)=>props.loadTable(page)}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
