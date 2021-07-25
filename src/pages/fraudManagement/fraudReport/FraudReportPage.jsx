/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  PageContainer,
  SuccessNotification,
} from '@/components';
import { getFraudReportApi, resetRiskScoreApi } from '@/services/fraudManagement/fraudReports';
import TableView from './summaryTable/TableView';

const FraudReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [fraudId, setFraudId] = useState(null);
  const [searchParam, setSearchParam] = useState({
    first_name: '',
    country: '',
    last_name: '',
    username: '',
    risk_score_min: '',
    risk_score_max: ''
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
      country: searchParam_.country,
      first_name: searchParam_.first_name,
      last_name: searchParam_.last_name,
      username: searchParam_.username,
      risk_score_max: searchParam_.risk_score_max,
      risk_score_min: searchParam_.risk_score_min,
    };
    getFraudReportApi(params, onGetFraudReportList, onFailFraudReportList);
  };

  const onGetFraudReportList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailFraudReportList = () => {
    setIsLoading(false);
  };

  const resetRiskScore = (id) => {
    setIsLoadingReset(true);
    setFraudId(id);
    resetRiskScoreApi(id, onResetRiskScoreSuccess, onResetRiskScoreFail);
  };

  const onResetRiskScoreSuccess = (data) => {
    setFraudId(null);
    loadTable(paginationParam, searchParam);
    SuccessNotification(data.message);
    setIsLoadingReset(false);
  };

  const onResetRiskScoreFail = () => {
    setFraudId(null);
    setIsLoadingReset(false);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      <div className="fraud-report-panel">
        <TableView
          tableData={tableData}
          isLoading={isLoading}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          paginationParam={paginationParam}
          setPaginationParam={setPaginationParam}
          loadTable={loadTable}
          resetRiskScore={resetRiskScore}
          isLoadingReset={isLoadingReset}
          fraudId={fraudId}
        />
      </div>
    </PageContainer>
  );
};

export default FraudReportPage;
