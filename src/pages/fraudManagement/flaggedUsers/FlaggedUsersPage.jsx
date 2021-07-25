/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { PageContainer, Col, Row, SuccessNotification } from '@/components';
import {
  getFlaggedUsersApi,
  acceptFlaggedUserApi,
  rejectFlaggedUserApi,
} from '@/services/fraudManagement/flaggedUsers';
import style from './FlaggedUsersPage.less';
import TableView from './summaryTable/TableView';

const FlaggedUsersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [flaggedId, setFlaggedId] = useState(null);
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
    getFlaggedUsersApi(params, onGetFlaggedUsersList, onFailFlaggedUsersList);
  };

  const onGetFlaggedUsersList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailFlaggedUsersList = () => {
    setIsLoading(false);
  };

  const acceptFlaggedUser = (id) => {
    setIsLoadingAccept(true);
    setFlaggedId(id);
    acceptFlaggedUserApi(id, onAcceptFlaggedUserSuccess, onAcceptFlaggedUserFail);
  };

  const onAcceptFlaggedUserSuccess = (data) => {
    setFlaggedId(null);
    loadTable(paginationParam);
    SuccessNotification(data.message);
    setIsLoadingAccept(false);
  };

  const onAcceptFlaggedUserFail = () => {
    setFlaggedId(null);
    setIsLoadingAccept(false);
  };

  const rejectFlaggedUser = (id) => {
    setIsLoadingReject(true);
    setFlaggedId(id);
    rejectFlaggedUserApi(id, onRejectFlaggedUserSuccess, onRejectFlaggedUserFail);
  };

  const onRejectFlaggedUserSuccess = (data) => {
    setFlaggedId(null);
    loadTable(paginationParam);
    SuccessNotification(data.message);
    setIsLoadingReject(false);
  };

  const onRejectFlaggedUserFail = () => {
    setFlaggedId(null);
    setIsLoadingReject(false);
  };

  useEffect(() => {
    loadTable(paginationParam);
  }, []);

  return (
    <PageContainer>
      <Row>
        <Col xs={24} className={style.fraudMangementTable}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            acceptFlaggedUser={acceptFlaggedUser}
            isLoadingAccept={isLoadingAccept}
            rejectFlaggedUser={rejectFlaggedUser}
            isLoadingReject={isLoadingReject}
            flaggedId={flaggedId}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default FlaggedUsersPage;
