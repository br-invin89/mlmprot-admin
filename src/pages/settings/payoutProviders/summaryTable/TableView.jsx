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
  Tooltip,
  UserStatusBadge,
  AddEditModal,
} from '@/components';
import PayoutProvidersModalContent from '../PayoutProvidersModalContent';
import { countryName } from '@/utils/country';
import styles from '../PayoutProvidersPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: 'Payment',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Countries',
      key: 'id',
      dataIndex: 'id',
      render: (_, record) => {
        const tooltip = (
          <div className="permissions-wrapper">
            <div className="pt-1">
              {record.countries &&
                record.countries.map((country, index) => (
                  <div className="permission-text" key={index}>
                    - {countryName(country.country)}
                  </div>
                ))}
            </div>
          </div>
        );
        return (
          <span>
            Countries{' '}
            <Link className="link--underlined">
              <Tooltip placement="left" title={tooltip} color="white">
                {record.countries.length}
              </Tooltip>
            </Link>
          </span>
        );
      },
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
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => props.changePayoutStatus(id, 0)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn
                  danger
                  style={{ minWidth: 100 }}
                  loading={props.isLoadingStatus && id === props.payoutId}
                >
                  {t('common.table.deactivate','Deactivate')}
                </OutlineBtn>
              </Popconfirm>
            ) : (
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => props.changePayoutStatus(id, 1)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn
                  success
                  block
                  style={{ minWidth: 100 }}
                  loading={props.isLoadingStatus && id === props.payoutId}
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
                props.toggle();
                props.setEditData(record);
              }}
              editAction={() => props.setEditData(record)}
            >
              <PayoutProvidersModalContent
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
      title={t('pages.settings.payoutProviders', 'Payout Providers')}
      applyPadding
      columns={columns}
      loading={props.isLoading}
    />
  );
}
