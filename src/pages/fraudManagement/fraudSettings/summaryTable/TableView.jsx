/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, CountryFlag, OutlineBtn, Popconfirm, AddEditModal } from '@/components';
import FraudSettingsModalContent from '../FraudSettingsModalContent';

export default function TableView(props) {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Country ',
      dataIndex: 'country',
      key: 'country',
      render: (text) => <CountryFlag country={text} />,
    },
    {
      title: 'Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
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
              modalTitle={t('pages.fraudMangement.editAThreshold','Edit A Threshold')}
              hideIcon
              width="450px"
              open={props.open && record.id === props.editData.id}
              toggle={() => {
                props.toggle()
                props.setEditData(record)
              }}
              editAction={() => props.setEditData(record)}
            >
              <FraudSettingsModalContent
                data={props.editData}
                onFinish={props.onFinish}
                isUpdateLoading={props.isUpdateLoading}
                isEdit={true}
              />
            </AddEditModal>
            <div style={{ width: 12 }} />
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.deleteFraudSetting(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn danger loading={props.isLoadingDelete && id === props.deleteId}>
                Delete
              </OutlineBtn>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.fraudMangement.fraudSettings','Fraud Settings')}
      columns={columns}
      loading={props.isLoading}
    />
  );
}
