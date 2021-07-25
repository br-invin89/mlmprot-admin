/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Button, Col, Row, Tooltip, TablePanel, OutlineBtn, Space } from '@/components';
import { Link } from 'react-router-dom';
import styles from './EditDistCentersSubPage.less';
import { t } from '@/utils/label';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Countries',
    dataIndex: 'countries',
    key: 'countries',
    render: (text) => {
      const tooltip = (
        <div className="permissions-wrapper">
          <div className="pt-1">
            {text &&
              text.map((country, idx) => (
                <div className="permission-text" key={idx}>
                  - {country}
                </div>
              ))}
          </div>
        </div>
      );
      return (
        <Link style={{ textDecoration: 'underline' }} to="">
          <Tooltip placement="left" title={tooltip} color="white">
            {text.length}
          </Tooltip>
        </Link>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => {
      return (
        <Space size={10}>
          <OutlineBtn>{t('pages.distCenter.edit', 'Edit')}</OutlineBtn>
          <OutlineBtn danger>{t('pages.distCenter.delete', 'Delete')}</OutlineBtn>
        </Space>
      );
    },
  },
];

const ShippingGroupsSubPage = () => {
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
    <>
      <Row gutter={[15, 15]} className="search-result-container">
        <Col xs={24}>
          <TablePanel
            data={[]}
            title={t('pages.distCenter.shippingGroups', 'Shipping Groups')}
            toolbar={
              <div className="toolbar-container">
                <div className="toolbar-sub-container">
                  <Button type="primary">Add Shipping Group</Button>
                </div>
              </div>
            }
            columns={columns}
            onPageChange={onPageChange}
            paginationParam={paginationParam}
          />
        </Col>
      </Row>
    </>
  );
};

export default ShippingGroupsSubPage;
