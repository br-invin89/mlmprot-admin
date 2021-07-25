/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { 
  OutlineBtn, TablePanel, DeleteBtn, 
  UserTypeBadge, UserStatusBadge 
} from '@/components';
import { asDate } from '@/utils/text';
import TableHead from './TableHead';
import { stringToArray } from '@/utils/utils';
import { varLabel } from '@/common/var';
import { deleteEventsApi } from '@/services/tools/events';
import ActivateBtn from './ActivateBtn';
import { t } from '@/utils/label';
import styles from '../EventsPage.less';

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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => text,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => text,
    },
    {
      title: t('common.table.showTo', 'Show To'),
      dataIndex: 'eligible_user_types',
      key: 'eligible_user_types',
      render: (values) => renderShowTo(stringToArray(values)),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <UserStatusBadge status={varLabel('event.status', text)} />;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'start_at',
      key: 'loadTable',
      render: (text) => {
        return <span>{asDate(text)}</span>;
      },
    },
    {
      title: 'End Date',
      dataIndex: 'end_at',
      key: 'end_at',
      render: (text) => {
        return <span>{asDate(text)}</span>;
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
                props.onEditItem(data);
              }}
            >
              {
                t('common.label.edit', 'Edit')}
            </OutlineBtn>
            <DeleteBtn className={styles.deleteBtn} data={data} loadData={props.loadTable} deleteApi={deleteEventsApi} />
          </span>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={
        t('pages.events.events', 'Events')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
        />
      }
      // applyPadding
      columns={columns}
      onPageChange={props.loadTable}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
