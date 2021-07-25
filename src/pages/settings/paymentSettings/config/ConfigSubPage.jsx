/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { OutlineBtn, Col, PageContainer, Row } from '@/components';
import { getPaymentSettingsApi } from '@/services/settings/paymentSettings';
import style from './ConfigSubPage.less';
import TableView from './summaryTable/TableView';

const ConfigPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
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

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <PageContainer fluid>
      <Row className="mt-10 settings-table-container">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            loadTable={loadTable}
            setEditData={setEditData}
            editData={editData}
            open={editOpen}
            toggle={editToggle}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ConfigPage;
