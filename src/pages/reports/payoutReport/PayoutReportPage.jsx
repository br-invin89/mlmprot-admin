/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Row, Col, PageContainer } from '@/components';
import CountryRevenueTableView from './summaryTable/CountryRevenueTableView';
import PaymentCardView from './summaryCards/PaymentCardView';
import TopEarnersCardView from './summaryCards/TopEarnersCardView';
import StatsCardView from './summaryCards/StatsCardView';
import moment from 'moment';
import PayoutReportTableView from './summaryTable/PayoutReportTableView';
import {
  getHeaderPayoutStatsApi,
  getPayoutCycleExportApi,
  getPayoutCycleApi,
} from '@/services/reports/payoutReport';
import { asPrice } from '@/utils/text';
import styles from './PayoutReportPage.less';

const PayoutReportPage = () => {
  const [isLoadingStatsCard, setIsLoadingStatsCard] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const [payoutId, setPayoutId] = useState(null);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format('YYYY-MM-DD')}|${moment().format(
      'YYYY-MM-DD',
    )}`,
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [tableData, setTableData] = useState([]);
  const [statsData, setStatsData] = useState([
    { title: 'Last Week', amount: null, percent: null },
    { title: 'Last Month', amount: null, percent: null },
    { title: 'Last Year', amount: null },
    { title: 'Lifetime', amount: null },
  ]);

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoadingTable(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      date_range: searchParam_.date_range ? searchParam_.date_range : '',
    };
    getPayoutCycleApi(params, onGetPayoutCycleList, onFailPayoutCycleList);
  };

  const onGetPayoutCycleList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoadingTable(false);
  };

  const onFailPayoutCycleList = () => {
    setIsLoadingTable(false);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  const getPayoutCycleReportExport = (id) => {
    setIsLoadingExport(true);
    setPayoutId(id);
    getPayoutCycleExportApi(id, onGetSuccessPayoutExport, onGetFailedPayoutExport);
  };

  const onGetSuccessPayoutExport = (data) => {
    setPayoutId(null);
    if (data.file_path) window.open(data.file_path, '_blank');
    setIsLoadingExport(false);
  };

  const onGetFailedPayoutExport = () => {
    setPayoutId(null);
    setIsLoadingExport(false);
  };

  const getHeaderPayoutStats = () => {
    setIsLoadingStatsCard(true);
    getHeaderPayoutStatsApi(onGetSuccessPayoutHeader, onGetFailedPayoutHeader);
  };

  const onGetSuccessPayoutHeader = (data) => {
    setStatsData([
      {
        title: 'Last Week',
        amount: asPrice(data.last_week_amount),
        percent: data.last_week_percent,
      },
      {
        title: 'Last Month',
        amount: asPrice(data.last_month_amount),
        percent: data.last_month_percent,
      },
      {
        title: 'Last Year',
        amount: asPrice(data.last_year_amount),
        percent: data.last_year_percent,
      },
      { title: 'Lifetime', amount: asPrice(data.lifetime_amount) },
    ]);
    setIsLoadingStatsCard(false);
  };

  const onGetFailedPayoutHeader = () => {
    setIsLoadingStatsCard(false);
  };

  useEffect(() => {
    getHeaderPayoutStats();
  }, []);

  return (
    <PageContainer>
      <div>
        <div className="page-content ">
          <StatsCardView isLoading={isLoadingStatsCard} statsData={statsData} />
          <Row gutter={[15, 15]} className="mb-15">
            <Col xs={24} xxl={17}>
              <CountryRevenueTableView
                showHover={true}
                hideHover={isLoadingStatsCard || isLoadingTable}
              />
            </Col>
            <Col xs={24} xxl={7}>
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <PaymentCardView />
                </Col>
                <Col span={24}>
                  <TopEarnersCardView name={'Marley Herwitz'} amount={'$167,46529.94'} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[15, 15]} className={`${styles.reportsPayTable} reports-pay-table`}>
            <Col span={24}>
              <PayoutReportTableView
                tableData={tableData}
                isLoading={isLoadingTable}
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                loadTable={loadTable}
                paginationParam={paginationParam}
                setPaginationParam={setPaginationParam}
                isLoadingExport={isLoadingExport}
                payoutId={payoutId}
                getPayoutCycleReportExport={getPayoutCycleReportExport}
              />
            </Col>
          </Row>
        </div>
      </div>
    </PageContainer>
  );
};

export default PayoutReportPage;
