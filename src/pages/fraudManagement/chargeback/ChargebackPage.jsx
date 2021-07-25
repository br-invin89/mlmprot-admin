/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Col, Row, PageContainer } from '@/components';
import moment from 'moment';
import { getChargerbackStatsApi, getChargerbackReportApi } from '@/services/fraudManagement/chargeback';
import { asPrice } from '@/utils/text';
import styles from './ChargebackPage.less';
import TableView from './summaryTable/TableView';

const ChargebackPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatsCard, setIsLoadingStatsCard] = useState(false);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
    order_ip_address: '',
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [tableData, setTableData] = useState([]);
  const [statsData, setStatsData] = useState([
    { title: 'Total Sales', amount: null },
    { title: 'Refund Sales', amount: null },
    { title: 'Chargeback Sales', amount: null },
    { title: 'Net', amount: null },
  ]);

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      date_range: searchParam_.date_range,
      order_ip_address: searchParam.order_ip_address,
    };
    getChargerbackReportApi(params, onGetChargebackList, onFailChargebackList);
  };

  const onGetChargebackList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailChargebackList = () => {
    setIsLoading(false);
  };

  const getHeaderChargebackStats = () => {
    setIsLoadingStatsCard(true);
    getChargerbackStatsApi(onGetSuccessChargebackStats, onGetFailedChargebackStats);
  };

  const onGetSuccessChargebackStats = (data) => {
    setStatsData([
      {
        title: 'Total Sales',
        amount: asPrice(data.total_amount),
      },
      {
        title: 'Refund Sales',
        amount: asPrice(data.refund_amount),
      },
      {
        title: 'Chargeback Sales',
        amount: asPrice(data.chargeback_amount),
      },
      { title: 'Net', amount: asPrice(data.net_amount) },
    ]);
    setIsLoadingStatsCard(false);
  };

  const onGetFailedChargebackStats = () => {
    setIsLoadingStatsCard(false);
  };

  useEffect(() => {
    getHeaderChargebackStats();
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      <Row gutter={[15, 15]}>
        <Col xl={24} xxl={24} xs={24} sm={24} className="charge-back-report">
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            isLoadingStatsCard={isLoadingStatsCard}
            statsData={statsData}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ChargebackPage;
