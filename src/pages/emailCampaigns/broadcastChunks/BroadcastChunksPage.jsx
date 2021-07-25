/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  OutlineBtn,
  Col,
  PageContainer,
  Row,
  UserStatusBadge,
  TablePanel,
  Space,
  SuccessNotification,
} from '@/components';

import { asDateTime } from '@/utils/text';
import {
  getBroadcastChunksApi,
  resendBroadcastChunkApi,
} from '@/services/emailCampaigns/broadcastEmails';
import { varLabel } from '@/common/var';
import { t } from '@/utils/label';

const BroadcastChunksPage = (props) => {
  const emailId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const [broadcastChunksTableData, setBroadcastChunksTableData] = useState([]);

  const onResendBroadcastChunk = (d) => {
    setId(null);
    SuccessNotification(d.message);
    setIsLoading(false);
  };

  const onFailResendBroadcastChunk = () => {
    setId(null);
    setIsLoading(false);
  };

  const handleClick = (chunkId) => {
    setIsLoading(true);
    setId(chunkId);
    resendBroadcastChunkApi(chunkId, onResendBroadcastChunk, onFailResendBroadcastChunk);
  };
  const columns = [
    {
      title: 'Users',
      key: 'users',
      render: (_, record) => <p>{record.users.split(',').length}</p>,
    },
    {
      title: 'Created at',
      key: 'created_at',
      render: (_, record) => <p className="mb-0">{asDateTime(record.created_at)}</p>,
    },
    {
      title: 'Sent at',
      key: 'sent_at',
      render: (_, record) => (
        <p className="mb-0">{record.sent_date && asDateTime(record.sent_date)}</p>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => <UserStatusBadge status={record.status} />,
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Space size={10}>
            <OutlineBtn
              loading={isLoading && id === record.id}
              onClick={() => handleClick(record.id)}
            >
              {' '}
              Resend{' '}
            </OutlineBtn>
          </Space>
        );
      },
    },
  ];

  const onGetBroadcastChunks = (res) => {
    const tableData = [];
    res.data.forEach((item) => {
      tableData.push({
        id: item.id,
        users: item.user_ids,
        created_at: item.created_at,
        sent_at: item.sent_at,
        status: varLabel('broadcastEmailChunk.status', item.status),
      });
    });
    setBroadcastChunksTableData(tableData);
    setIsLoading(false);
  };

  const onFailBroadcastChunks = () => {
    setIsLoading(false);
  };

  const getBroadcastChunks = (emailId0) => {
    setIsLoading(true);
    getBroadcastChunksApi(emailId0, onGetBroadcastChunks, onFailBroadcastChunks);
  };
  useEffect(() => {
    if (emailId > 0) {
      getBroadcastChunks(emailId);
    }
  }, [emailId]);

  return (
    <PageContainer isLoading={isLoading}>
      <div className="page-content settings-page payment-provider-table-container">
        <Row>
          <Col xs={24}>
            <TablePanel
              data={broadcastChunksTableData}
              title={t('pages.emailCampaigns.broadcastChunks', 'Broadcast Chunks')}
              columns={columns}
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default BroadcastChunksPage;
