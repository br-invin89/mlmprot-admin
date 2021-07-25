/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, Popconfirm, OutlineBtn, UserStatusBadge, AddEditModal } from '@/components';
import CurrencySettingsModalContent from '../CurrencySettingsModalContent';
import styles from '../CurrencySettingsPage.less'

export default function TableView(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Standard Name',
      key: 'standard_name',
      dataIndex: 'standard_name',
    },
    {
      title: 'Symbol',
      key: 'symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (data) => {
        return <UserStatusBadge status={data === 1 ? 'Active' : 'Inactive'} />;
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => {
        return (
          <div style={{ display: 'flex' }}>
            {record.status === 1 ? (
              <OutlineBtn danger disabled  style={{minWidth: 100}}>
                {t('common.table.selected', 'Selected')}
              </OutlineBtn>
            ) : (
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => props.selectCurrentCurrency(id)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn
                  success
                  block
                  style={{minWidth: 100}}
                  loading={props.isLoadingSelected && id === props.currencyId}
                >
                  {t('common.table.select', 'Deselect')}
                </OutlineBtn>
              </Popconfirm>
            )}
            <div style={{ width: 12 }} />
            <AddEditModal
              isEdit
              triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
              modalTitle={record.name}
              hideIcon
              width="450px"
              open={props.open && record.id === props.editData.id}
              toggle={() => {
                props.toggle()
                props.setEditData(record)
              }}
              editAction={() => props.setEditData(record)}
            >
              <CurrencySettingsModalContent
                data={props.editData}
                loadTable={props.loadTable}
                toggle={props.toggle}
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
      title={t( 'pages.settings.currency', 'Currency')}
      applyPadding
      columns={columns}
      loading={props.isLoading}
    />
  );
}
