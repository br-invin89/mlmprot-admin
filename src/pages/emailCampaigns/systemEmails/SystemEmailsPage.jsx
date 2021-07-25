import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import {
  OutlineBtn,
  PageContainer,
  TablePanel,
  Row,
  Col,
  UserStatusBadge,
  Popover,
} from '@/components';
import { Link } from 'react-router-dom';
import { asDateTime } from '@/utils/text';
import './SystemEmailsPage.less';
import { getSystemEmailsApi } from '@/services/emailCampaigns/systemEmails';
import ActivateBtn from './table/ActivateBtn';
import TestSystemEmailModal from './TestSystemEmailModal';
import SystemEmailHeader from './SystemEmailHeader';
import { varLabel } from '@/common/var';

const SystemEmailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [testEmailValue, setTestEmailValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchParam, setSearchParam] = useState('');
  const handleSearchData = (value) => {
    setSearchParam(value);
  };

  const onGetSystemEmails = (res) => {
    setTableData(res.data.data);
    setIsLoading(false);
  };
  const onFailSystemEmails = () => {
    setIsLoading(false);
  };

  const handleSearch = () => {
    setIsLoading(true);
    getSystemEmailsApi(searchParam, onGetSystemEmails, onFailSystemEmails);
  };

  const handleTest = (systemEmailValue) => {
    setTestEmailValue(systemEmailValue);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Title',
      key: 'subject',
      render: (_, record) => <div>{record.subject}</div>,
    },
    {
      title: 'Tags',
      key: 'tags',
      render: (_, record) => (
        <Popover
          placement={'right'}
          title={<h5 className="mb-0 mt-1">Tags</h5>}
          content={
            <div>
              {record.tags.map((tag, index) => (
                <p className="mb-1" key={index}>
                  {tag.name}
                </p>
              ))}
            </div>
          }
        >
          <a className="mb-0 text-primary">{record.tags.length}</a>
        </Popover>
      ),
    },
    {
      title: 'Updated By',
      key: 'updated_by',
      render: (_, record) =>
        record.updated_admin && (
          <p className="mb-0">
            {`${record.updated_admin.first_name} ${record.updated_admin.last_name}`}
          </p>
        ),
    },
    {
      title: 'Updated At',
      key: 'updated_at',
      render: (_, record) => (
        <p className="mb-0">{record.updated_at && asDateTime(record.updated_at)}</p>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (data) => <UserStatusBadge status={varLabel('systemEmail.status', data)} />,
    },

    {
      title: 'Action',
      key: 'status',
      render: (_, data) => (
        <span className="d-flex">
          <ActivateBtn data={data} handleSearch={handleSearch} />
          <OutlineBtn className="ml-10">
            <Link to={`/email-campaigns/system-email/edit/${data.id}`}>Edit</Link>
          </OutlineBtn>
          <OutlineBtn className="ml-10" onClick={() => handleTest(data.value)}>
            Test
          </OutlineBtn>
        </span>
      ),
    },
  ];

  const onFinishTest = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <PageContainer>
      <div
        className="page-content settings-page system-emails-table-container"
        style={{ marginTop: -8 }}
      >
        <SystemEmailHeader handleSearchData={handleSearchData} />
        <Row>
          <Col xs={24}>
            <TablePanel
              data={tableData}
              title={t('pages.emailCampaigns.systemEmails', 'System Emails')}
              columns={columns}
              loading={isLoading}
            />
          </Col>
        </Row>
      </div>
      {isModalVisible && (
        <TestSystemEmailModal
          isModalVisible={isModalVisible}
          testEmailValue={testEmailValue}
          onFinishTest={onFinishTest}
          toggle={() => setIsModalVisible(!isModalVisible)}
        />
      )}
    </PageContainer>
  );
};

export default SystemEmailsPage;
