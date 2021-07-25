/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  OutlineBtn,
  Col,
  PageContainer,
  Row,
  UserStatusBadge,
  TablePanel,
  Space,
} from '@/components';
import { asDateTime } from '@/utils/text';
import styles from './BroadcastEmailsPage.less';

import { Link } from 'react-router-dom';
import { getBroadcastEmailsApi } from '@/services/emailCampaigns/broadcastEmails';
// import { broadcastEmailsTableData } from '@/common/data';
import { varLabel, varKey } from '@/common/var';
import { t } from '@/utils/label';

const BroadcastEmailsPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [broadcastEmailsTableData, setBroadcastEmailsTableData] = useState([]);

  const columns = [
    {
      title: 'Subject',
      key: 'subject',
      render: (_, record) => <div>{record.subject}</div>,
    },
    {
      title: 'Created By',
      key: 'created_by',
      render: (_, record) => <p className="mb-0">{record.created_by}</p>,
    },
    {
      title: 'Updated By',
      key: 'updated_by',
      render: (_, record) => <p className="mb-0">{record.updated_by}</p>,
    },
    {
      title: 'Created At',
      key: 'created_at',
      render: (_, record) => <p className="mb-0">{asDateTime(record.created_at)}</p>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <UserStatusBadge status={varLabel('broadcastEmail.status', record.status)} />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Space size={10}>
            {varKey('broadcastEmail.status', record.status) === 'draft' ? (
              <OutlineBtn className={styles.sameSizeActionButton}>
                <Link to={`/email-campaigns/broadcast-email/edit/${record.id}`}> Edit </Link>
              </OutlineBtn>
            ) : (
              <OutlineBtn className={styles.sameSizeActionButton} danger>
                <Link to={`/email-campaigns/broadcast-email/chunks/edit/${record.id}`}>
                  {' '}
                  Detail{' '}
                </Link>
              </OutlineBtn>
            )}
          </Space>
        );
      },
    },
  ];
  /*
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 1,
    total: 2,
  });
  */

  const onGetBroadcastEmails = (res) => {
    const tableData = [];
    if (res.data) {
      res.data.forEach((item) => {
        tableData.push({
          id: item.id,
          subject: item.subject,
          created_by: `${item.created_admin.first_name} ${item.created_admin.last_name}`,
          updated_by: `${item.updated_admin.first_name} ${item.updated_admin.last_name}`,
          created_at: item.created_at,
          status: item.status,
        });
      });
    }
    setBroadcastEmailsTableData(tableData);
    setIsLoading(false);
  };

  const onFailBroadcastEmails = () => {
    setIsLoading(false);
  };

  const getBroadcastEmails = () => {
    setIsLoading(true);
    getBroadcastEmailsApi('', onGetBroadcastEmails, onFailBroadcastEmails);
  };
  useEffect(() => {
    getBroadcastEmails();
  }, []);

  return (
    <PageContainer>
      <div className="page-content settings-page payment-provider-table-container">
        <Row gutter={[15, 5]} className="mb-15" align="middle">
          <Col xs={24} sm={12} lg={12}></Col>
          <Col xs={24} sm={12} lg={12} className={styles.createBroadcastBtn}>
            <OutlineBtn
              onClick={() => history.push('/email-campaigns/broadcast-email/create')}
              className="ant-btn ant-btn-primary"
            >
              {t('pages.emailCampaigns.createBroadcast', 'Create Broadcast')}
            </OutlineBtn>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <TablePanel
              data={broadcastEmailsTableData}
              title={t('pages.emailCampaigns.emailBroadcast', 'Email Broadcasts')}
              columns={columns}
              loading={isLoading}
              // onPageChange={onPageChange}
              // paginationParam={paginationParam}
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default withRouter(BroadcastEmailsPage);
