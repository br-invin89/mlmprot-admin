/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Col, Row, PageContainer } from '@/components';
import { getCreditWalletStatsApi, getCreditWalletReportApi } from '@/services/reports/creditWalletReport';
import { asPrice } from '@/utils/text';
import styles from './CreditWalletReportPage.less';
import TableView from './summaryTable/TableView';
import CardView from './summaryCards/CardView'

const CreditWalletReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  const loadTable = (paginationParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
    };
    getCreditWalletReportApi(params, onGetCreditWalletList, onFailCreditWalletList);
  };

  const onGetCreditWalletList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailCreditWalletList = () => {
    setIsLoading(false);
  };

  const loadStats = () => {
    setIsStatsLoading(true);
    getCreditWalletStatsApi(onGetCreditWalletStats, onFailCreditWalletStats);
  };

  const onGetCreditWalletStats = (data) => {
    setStatsData([
      { title: 'Current Balance', amount: asPrice(data.current_balance) },
      { title: 'Total Amount', amount: asPrice(data.total_amount) },
      { title: 'Withdrawn Amount', amount: asPrice(data.transfer_amount) },
      { title: 'Transfer Amount', amount: asPrice(data.withdrawn_amount) },
    ]);

    setIsStatsLoading(false);
  };

  const onFailCreditWalletStats = () => {
    setIsStatsLoading(false);
  };

  useEffect(() => {
    loadTable(paginationParam);
    loadStats();
  }, []);

  return (
    <PageContainer>
      <div style={{ marginTop: -20 }}>
        <div>
          <CardView 
            isLoading={isStatsLoading}
            statsData={statsData}
          />
          <Row>
            <Col xl={24} xxl={24} xs={24} sm={24}>
              <TableView
                tableData={tableData}
                isLoading={isLoading}
                paginationParam={paginationParam}
                setPaginationParam={setPaginationParam}
                loadTable={loadTable}
              />
            </Col>
          </Row>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreditWalletReportPage;
