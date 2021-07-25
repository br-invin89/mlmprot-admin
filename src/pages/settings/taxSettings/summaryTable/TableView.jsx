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
import TaxSettingsModalContent from '../TaxSettingsModalContent';
import styles from '../TaxSettingsPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: 'Tax',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Production API Key',
      key: 'key1',
      dataIndex: 'key1',
    },
    {
      title: 'Sandbox API Key',
      key: 'key2',
      dataIndex: 'key2',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => {
        return (
          <div style={{ display: 'flex' }}>
            {record.status == 1 ? (
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => props.changeTaxStatus(id, 0)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn
                  style={{minWidth: 100}}
                  danger
                  loading={props.isLoadingStatus && id === props.taxId}
                >
                  {t('common.table.deactivate','Deactivate',)}
                </OutlineBtn>
              </Popconfirm>
            ) : (
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => props.changeTaxStatus(id, 1)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn
                  success
                  block
                  style={{minWidth: 100}}
                  loading={props.isLoadingStatus && id === props.taxId}
                >
                  {t('common.table.activate', 'Activate')}
                </OutlineBtn>
              </Popconfirm>
            )}
            <div style={{ width: 12 }} />
            <AddEditModal
              isEdit
              triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
              modalTitle={record.name}
              hideIcon
              width="550px"
              open={props.open && record.id === props.editData.id}
              toggle={() => {
                props.toggle()
                props.setEditData(record)
              }}
              editAction={() => props.setEditData(record)}
            >
              <TaxSettingsModalContent
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
      title={t('pages.settings.taxThirdParty', 'Tax Third Party')}
      applyPadding
      columns={columns}
      loading={props.isLoading}
    />
  );
}
