/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, Col, PageContainer, Row, UserStatusBadge, TablePanel } from '@/components';
import { Link } from 'react-router-dom';
import { shippingSettingTableData } from '@/common/data';
import style from '../currencySettings/CurrencySettingsPage.less';

const columns = [
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
    render: (text) => {
      return <Link to="">{text}</Link>;
    },
  },
  {
    title: 'Private API Key',
    key: 'privateApiKey',
    dataIndex: 'privateApiKey',
    render: (text) => {
      return <>{text}</>;
    },
  },
  {
    title: 'Public API Key',
    key: 'publicApiKey',
    dataIndex: 'publicApiKey',
    render: (text) => {
      return <>{text}</>;
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
    dataIndex: 'status',
    key: 'status',
    render: () => {
      return (
        <span className='d-flex'>
          <OutlineBtn danger>Deactivate</OutlineBtn>
          <OutlineBtn style={{ marginLeft: 10 }}>Edit</OutlineBtn>
        </span>
      );
    },
  },
];

const ShippingSettingsPage = () => {
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 100,
  });
  const onPageChange = (currentPage) => {
    setPaginationParam({
      ...paginationParam,
      currentPage,
    });
  };
  return (
    <PageContainer>
      <div
        className="page-content settings-page settings-table-container"
        style={{ marginTop: -8 }}
      >
        <Row>
          <Col xs={24}>
            <TablePanel
              data={shippingSettingTableData}
              title={
                t("pages.settings.shippingThirdParty", "Shipping Third Party")
              }
              columns={columns}
              onPageChange={onPageChange}
              paginationParam={paginationParam}
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default ShippingSettingsPage;
