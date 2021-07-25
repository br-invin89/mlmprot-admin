/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Row, Col } from '@/components';
import { getBatchesApi, getConfirmNewOrderApi, getConfirmOrderpi } from '@/services/distCenters';
import TableView from './summaryTable/TableView';

const BatchesSubPage = ({ distCenterId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingNewOrders, setIsLoadingNewOrders] = useState(false);
  const [batchId, setBatchId] = useState(null);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);

  const loadTable = (paginationParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
    };
    getBatchesApi(distCenterId, params, onGetBatchesList, onFailBatchesList);
  };

  const onGetBatchesList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailBatchesList = () => {
    setIsLoading(false);
  };

  const getConfirmOrder = (id) => {
    setIsLoadingOrders(true);
    setBatchId(id);
    getConfirmOrderpi(id, onConfirmedOrderSuccess, onConfirmedOrderFail);
  };

  const onConfirmedOrderSuccess = (data) => {
    setBatchId(null);
    loadTable(paginationParam);
    window.open(data.data, '_blank');
    setIsLoadingOrders(false);
  };

  const onConfirmedOrderFail = () => {
    setBatchId(null);
    setIsLoadingOrders(false);
  };

  const getConfirmNewOrder = (id) => {
    setIsLoadingNewOrders(true);
    setBatchId(id);
    getConfirmNewOrderApi(id, onNewConfirmedOrdersSuccess, onNewConfirmedOrdersFail);
  };

  const onNewConfirmedOrdersSuccess = (data) => {
    setBatchId(null);
    loadTable(paginationParam);
    window.open(data.data, '_blank');
    setIsLoadingNewOrders(false);
  };

  const onNewConfirmedOrdersFail = () => {
    setBatchId(null);
    setIsLoadingNewOrders(false);
  };

  useEffect(() => {
    loadTable(paginationParam);
  }, []);

  return (
    <>
      <Row gutter={[15, 15]} >
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            getConfirmNewOrder={getConfirmNewOrder}
            isLoadingNewOrders={isLoadingNewOrders}
            getConfirmOrder={getConfirmOrder}
            isLoadingOrders={isLoadingOrders}
            batchId={batchId}
          />
        </Col>
      </Row>
    </>
  );
};

export default BatchesSubPage;
