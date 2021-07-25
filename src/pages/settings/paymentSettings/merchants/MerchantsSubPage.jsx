/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, PageContainer, Row, SuccessNotification } from '@/components';
import { getPaymentSettingsApi, changePaymentStatusApi } from '@/services/settings/paymentSettings';
import style from './MerchantsSubPage.less';
import TableView from './summaryTable/TableView';

const MerchantsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editOpenKeys, setEditOpenKeys] = useState(false);
  const editToggleKeys = () => {
    setEditOpenKeys(!editOpenKeys);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const loadTable = () => {
    setIsLoading(true);
    getPaymentSettingsApi(onGetPaymentSettingsList, onFailPaymentSettingsList);
  };

  const onGetPaymentSettingsList = (data) => {
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailPaymentSettingsList = () => {
    setIsLoading(false);
  };

  const changePaymentStatus = (id, status) => {
    setIsLoadingStatus(true);
    setPaymentId(id);
    const query = {
      status,
    };
    changePaymentStatusApi(id, query, onPaymentStatusSuccess, onPaymentStatusFail);
  };

  const onPaymentStatusSuccess = (data) => {
    loadTable();
    SuccessNotification(data.message);
    setPaymentId(null);
    setIsLoadingStatus(false);
  };

  const onPaymentStatusFail = () => {
    setPaymentId(null);
    setIsLoadingStatus(false);
  };

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <PageContainer>
      <Row className="settings-table-container">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            loadTable={loadTable}
            changePaymentStatus={changePaymentStatus}
            isLoadingStatus={isLoadingStatus}
            paymentId={paymentId}
            setEditData={setEditData}
            editData={editData}
            open={editOpen}
            toggle={editToggle}
            openKeys={editOpenKeys}
            toggleKeys={editToggleKeys}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default MerchantsPage;
