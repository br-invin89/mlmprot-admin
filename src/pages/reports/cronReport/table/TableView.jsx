/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import moment from 'moment';
import { TablePanel, Modal } from '@/components';
import { asPrice, asDateTime } from '@/utils/text';
import { varLabel } from '@/common/var';
import DetailModalContent from './DetailModalContent';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'Cron Job',
      dataIndex: 'cron_name',
      key: 'cron_name',
    },
    {
      title: 'Started At',
      key: 'started_at',
      render: (_, record) => <span>{moment(record.started_at).format('MM/DD/YY HH:mm:ss')}</span>,
    },
    {
      title: 'Ended At',
      key: 'ended_at',
      render: (_, record) => (
        <span>{record.ended_at ? moment(record.ended_at).format('HH:mm:ss') : '-'}</span>
      ),
    },
    {
      title: 'Schedule',
      key: 'period',
      render: (_, record) => <span>{record.period}</span>,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Modal modalTitle={`Details`} triggerLabel={'Details'}>
    //       <DetailModalContent data={record} />
    //     </Modal>
    //   ),
    // },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.cronReport', 'Cron Report')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          statsData={props.statsData}
          setSearchParam={props.setSearchParam}
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
