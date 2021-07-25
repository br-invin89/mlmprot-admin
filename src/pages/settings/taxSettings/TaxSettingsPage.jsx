/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, PageContainer, Row, SuccessNotification } from '@/components';
import { getTaxSettingsApi, changeTaxStatusApi } from '@/services/settings/TaxSettings';
import style from './TaxSettingsPage.less';
import TableView from './summaryTable/TableView';

const TaxSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [taxId, setTaxId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const loadTable = () => {
    setIsLoading(true);
    getTaxSettingsApi(onGetTaxSettingsList, onFailTaxSettingsList);
  };

  const onGetTaxSettingsList = (data) => {
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailTaxSettingsList = () => {
    setIsLoading(false);
  };

  const changeTaxStatus = (id, status) => {
    setIsLoadingStatus(true);
    setTaxId(id);
    const query = {
      status
    }
    changeTaxStatusApi(id, query, onTaxStatusSuccess, onTaxStatusFail);
  };

  const onTaxStatusSuccess = (data) => {
    loadTable();
    SuccessNotification(data.message);
    setTaxId(null);
    setIsLoadingStatus(false);
  };

  const onTaxStatusFail = () => {
    setTaxId(null);
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
              changeTaxStatus={changeTaxStatus}
              isLoadingStatus={isLoadingStatus}
              taxId={taxId}
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

export default TaxSettingsPage;
