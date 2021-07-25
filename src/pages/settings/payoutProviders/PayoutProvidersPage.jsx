/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, PageContainer, Row, SuccessNotification } from '@/components';
import { getPayoutProvidersApi, changePayoutStatusApi } from '@/services/settings/payoutProvider';
import style from './PayoutProvidersPage.less';
import TableView from './summaryTable/TableView';

const PayoutProvidersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [payoutId, setPayoutId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const loadTable = () => {
    setIsLoading(true);
    getPayoutProvidersApi(onGetPayoutProviderList, onFailPayoutProviderList);
  };

  const onGetPayoutProviderList = (data) => {
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailPayoutProviderList = () => {
    setIsLoading(false);
  };

  const changePayoutStatus = (id, status) => {
    setIsLoadingStatus(true);
    setPayoutId(id);
    const query = {
      status
    }
    changePayoutStatusApi(id, query, onPayoutStatusSuccess, onPayoutStatusFail);
  };

  const onPayoutStatusSuccess = (data) => {
    loadTable();
    SuccessNotification(data.message);
    setPayoutId(null);
    setIsLoadingStatus(false);
  };

  const onPayoutStatusFail = () => {
    setPayoutId(null);
    setIsLoadingStatus(false);
  };

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <PageContainer>
      <div
        className="page-content settings-page settings-table-container"
        style={{ marginTop: -8 }}
      >
        <Row>
          <Col xs={24}>
            <TableView
              tableData={tableData}
              isLoading={isLoading}
              loadTable={loadTable}
              changePayoutStatus={changePayoutStatus}
              isLoadingStatus={isLoadingStatus}
              payoutId={payoutId}
              setEditData={setEditData}
              editData={editData}
              open={editOpen}
              toggle={editToggle}
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default PayoutProvidersPage;
