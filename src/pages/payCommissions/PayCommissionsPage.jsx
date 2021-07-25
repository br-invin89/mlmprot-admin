/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, Row, PageContainer, SuccessNotification } from '@/components';
import moment from 'moment';
import { getPayoutCommissionApi, payPayoutCommissionApi } from '@/services/payoutCommission';
import styles from './PayCommissionsPage.less';
import TableView from './summaryTable/TableView';

const PayCommissionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPay, setIsLoadingPay] = useState(false);
  const [payoutId, setPayoutId] = useState(null);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
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
    };
    getPayoutCommissionApi(params, onGetPayoutCommissionList, onFailPayoutCommissionList);
  };

  const onGetPayoutCommissionList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailPayoutCommissionList = () => {
    setIsLoading(false);
  };

  const payCommission = (id) => {
    setIsLoadingPay(true);
    setPayoutId(id);
    payPayoutCommissionApi(id, onPayComissionSuccess, onPayCommissionFail);
  };

  const onPayComissionSuccess = (data) => {
    setPayoutId(null);
    SuccessNotification(data.message);
    setIsLoadingPay(false);
    loadTable(paginationParam, searchParam);
  };

  const onPayCommissionFail = () => {
    setPayoutId(null);
    setIsLoadingPay(false);
    loadTable(paginationParam, searchParam);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      <Row>
        <Col xs={24} className={styles.payCommissionTable}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            payCommission={payCommission}
            isLoadingPay={isLoadingPay}
            payoutId={payoutId}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default PayCommissionsPage;
