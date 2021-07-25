/* eslint-disable no-script-url */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import {
  TablePanel,
  Popconfirm,
  OutlineBtn,
  AddEditModal,
} from '@/components';
import ConfigModalContent from '../ConfigModalContent';
import { asPrice } from '@/utils/text';
import styles from '../ConfigSubPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: 'Merchant',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Max Number of Transactions Per Day',
      key: 'max_transactions',
      dataIndex: 'max_transactions',
      render: (text) => {
        return <>{text || 'Unset'}</>;
      },
    },
    {
      title: 'Max Amount Per Day',
      key: 'max_amount',
      dataIndex: 'max_amount',
      render: (text) => {
        return <>{text ? asPrice(text) : 'Unset'}</>;
      },
    },
    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
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
              modalTitle={`Rule for ${record.name}`}
              hideIcon
              width="550px"
              open={props.open && record.id === props.editData.id}
              toggle={() => {
                props.toggle()
                props.setEditData(record)
              }}
              editAction={() => props.setEditData(record)}
            >
              <ConfigModalContent
                data={props.editData}
                toggle={props.toggle}
                loadTable={props.loadTable}
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
      title={t('pages.settings.config','Config')}
      applyPadding
      columns={columns}
      loading={props.isLoading}
    />
  );
}
