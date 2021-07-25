/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Col, Row, PageContainer } from '@/components';
import { getOrderSourceStatsApi, getOrderSourceReportApi } from '@/services/reports/orderSourceReport';
import { asPrice } from '@/utils/text';
import styles from './OrderSourceReportPage.less';
import TableView from './summaryTable/TableView';
import CardView from './summaryCards/CardView'

const OrderSourceReportPage = () => {
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
    getOrderSourceReportApi(params, onGetOrderSourceList, onFailOrderSourceList);
  };

  const onGetOrderSourceList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailOrderSourceList = () => {
    setIsLoading(false);
  };

  const loadStats = () => {
    setIsStatsLoading(true);
    getOrderSourceStatsApi(onGetOrderSourceStats, onFailOrderSourceStats);
  };

  const onGetOrderSourceStats = (data) => {
    setStatsData([
      { title: 'Onetime', amount: asPrice(data.onetime_sales_amount) },
      { title: 'Autoship', amount: asPrice(data.autoship_sales_amount) },
      { title: 'Credit Wallet', amount: asPrice(data.credit_wallet_sales_amount) },
      { title: 'Corp joined', amount: asPrice(data.corp_sales_amount) },
    ]);

    setIsStatsLoading(false);
  };

  const onFailOrderSourceStats = () => {
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

export default OrderSourceReportPage;
