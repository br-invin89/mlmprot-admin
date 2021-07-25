/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, AddEditModal, UserStatusBadge } from '@/components';
import { asDate } from '@/utils/text';
import { varLabel } from '@/common/var';
import SupportPageModalContent from '../SupportPageModalContent';
import TableHead from './TableHead';

export default function TableView(props) {
  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (text, record) => {
        return (
          <Link style={{ textDecoration: 'underline' }} to={`/support/message/${record.id}`}>
            {text}
          </Link>
        );
      },
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => <span>{`${record.user?.first_name} ${record.user?.last_name}`}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <span>{varLabel('support.type', text)}</span>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => <span>{varLabel('support.priority', text)}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <UserStatusBadge status={varLabel('support.status', text)} />,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => {
        return (
          <div style={{ display: 'flex' }}>
            <AddEditModal
              isEdit
              triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
              modalTitle={t('pages.support.editTicket', 'Edit A Ticket')}
              hideIcon
              width="600px"
              open={props.open && record.id === props.editData.id}
              toggle={() => {
                props.toggle();
                props.setEditData(record);
              }}
              editAction={() => props.setEditData(record)}
            >
              <SupportPageModalContent
                data={props.editData}
                onFinish={props.onFinish}
                isUpdateLoading={props.isUpdateLoading}
                isEdit={true}
              />
            </AddEditModal>
          </div>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.support.tickets', 'Tickets')}
      columns={columns}
      showFiltersLarge
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          loadTable={props.loadTable}
        />
      }
      showSearchIcon
      loading={props.isLoading}
      onSearch={() => {
        props.loadTable(props.searchParam);
      }}
    />
  );
}
