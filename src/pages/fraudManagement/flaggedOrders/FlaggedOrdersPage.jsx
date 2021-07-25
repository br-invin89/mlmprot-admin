/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  PageContainer,
  SuccessNotification,
} from '@/components';
import moment from 'moment';
import { markasOKApi, getFlaggedOrdersApi } from '@/services/fraudManagement/flaggedOrders';
import styles from './FlaggedOrdersPage.less';
import TableView from './summaryTable/TableView';

const FlaggedUsersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMark, setIsLoadingMark] = useState(false);
  const [flaggedId, setFlaggedId] = useState(null);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
    ip_address: '',
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      date_range: searchParam_.date_range,
      ip_address: searchParam.ip_address,
    };
    getFlaggedOrdersApi(params, onGetFlaggedOrdersList, onFailFlaggedOrdersList);
  };

  const onGetFlaggedOrdersList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailFlaggedOrdersList = () => {
    setIsLoading(false);
  };

  const markAsOk = (id) => {
    setIsLoadingMark(true);
    setFlaggedId(id);
    markasOKApi(id, onMarkAsOkSuccess, onMarkAsOkFail);
  };

  const onMarkAsOkSuccess = (data) => {
    setFlaggedId(null);
    loadTable(paginationParam, searchParam);
    SuccessNotification(data.message);
    setIsLoadingMark(false);
  };

  const onMarkAsOkFail = () => {
    setFlaggedId(null);
    setIsLoadingMark(false);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      <Row>
        <Col xs={24} className={styles.flaggedOrdersTable}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            markAsOk={markAsOk}
            isLoadingMark={isLoadingMark}
            flaggedId={flaggedId}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default FlaggedUsersPage;
