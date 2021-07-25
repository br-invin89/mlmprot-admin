/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, PageContainer, Row, SuccessNotification } from '@/components';
import { getCurrencySettinsApi, selectCurrentCurrencyApi } from '@/services/settings/currencySettings';
import style from './CurrencySettingsPage.less';
import TableView from './summaryTable/TableView';

const CurrencySettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelected, setIsLoadingSelected] = useState(false);
  const [currencyId, setCurrencyId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const loadTable = () => {
    setIsLoading(true);
    getCurrencySettinsApi(onGetCurrencyList, onFailCurrencyList);
  };

  const onGetCurrencyList = (data) => {
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailCurrencyList = () => {
    setIsLoading(false);
  };

  const selectCurrentCurrency = (id) => {
    setIsLoadingSelected(true);
    setCurrencyId(id);
    selectCurrentCurrencyApi(id, onSelectCurrencySuccess, onSelectCurrencyFail);
  };

  const onSelectCurrencySuccess = (data) => {
    loadTable();
    SuccessNotification(data.message);
    setCurrencyId(null);
    setIsLoadingSelected(false);
  };

  const onSelectCurrencyFail = () => {
    setCurrencyId(null);
    setIsLoadingSelected(false);
  };

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <PageContainer>
      <div className="settings-table-container" style={{ marginTop: -8 }}>
        <Row>
          <Col xs={24}>
            <TableView
              tableData={tableData}
              isLoading={isLoading}
              loadTable={loadTable}
              selectCurrentCurrency={selectCurrentCurrency}
              isLoadingSelected={isLoadingSelected}
              currencyId={currencyId}
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

export default CurrencySettingsPage;
