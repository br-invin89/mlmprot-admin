/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import {Row, Col, Tooltip, TablePanel, UserAvatar, OutlineBtn, Space, Spin} from '@/components';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { asDateTime } from '@/utils/text';
import styles from './AdministratorsPage.less';
import ActivateBtn from "./table/ActivateBtn";

const AdministratorsTableView = ({administratorsData, isLoading, currentUser, onHandleStatus, onHandleEdit}) => {
  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => <UserAvatar image={record.image} title={`${record.first_name} ${record.last_name}`} />
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (_, record) => <span>{record.department ? record.department.name : 'Deleted'}</span>
    },
    {
      title: 'IP Addresses',
      dataIndex: 'ip_addresses',
      key: 'ip_addresses',
      render: (_, record) => {
        const tooltip = (
          <div className="permissions-wrapper">
            <div className="pt-1">
              {record.ip_addresses && record.ip_addresses.map(({ip_address}, index) => (
                  <div className="permission-text" key={index}>
                    - {ip_address}
                  </div>
                ))}
            </div>
          </div>
        );
        return (
          <Link style={{ textDecoration: 'underline' }} to="javascript:void(0)">
            <Tooltip placement="left" title={tooltip} color="white">
              {record.ip_addresses.length} IP Addresses
            </Tooltip>
          </Link>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{text ? asDateTime(text) : '-'}</span>,
    },
    {
      title: 'Last login',
      dataIndex: 'last_login_at',
      key: 'last_login_at',
      render: (text) => <span>{text ? asDateTime(text) : '-'}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        if(currentUser.id === record.id) {
          return <></>
        }
        return (
          <Space size={10}>
            <ActivateBtn data={record} onHandleStatusChange={onHandleStatus} />
            <OutlineBtn onClick={()=> onHandleEdit(record)}>
              {t("pages.administrators.edit", "Edit")}
            </OutlineBtn>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Row gutter={[15, 0]} className="admin-table-container">
        <Col xs={24}>
          <TablePanel
            data={administratorsData}
            loading={isLoading}
            title={t("pages.administrators.administrators","Administrators")}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdministratorsTableView;
