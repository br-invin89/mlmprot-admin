/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, PageContainer } from '@/components';
import SalesReportTable from './SalesReportTable';
import StatsCardView from './summaryCards/StatsCardView';
import AffiliateToCustomerCardView from './summaryCards/AffiliateToCustomerCardView';
import TodaysSalesCardView from './summaryCards/TodaysSalesCardView';
import {
  getHeaderSalesStatsApi,
  getMonthlySalesApi,
  getWeeklySalesApi,
  getTodaySalesApi,
  getUserSalesDistributionApi,
} from '@/services/reports/salesReport';
import { asPrice, asDate } from '@/utils/text';
import styles from './SalesReportPage.less';

const SalesReportPage = () => {
  const [isLoadingStatsCard, setIsLoadingStatsCard] = useState(false);
  const [isLoadingUserDistribution, setIsLoadingUserDistribution] = useState(false);
  const [isLoadingMonthlySales, setIsLoadingMonthlySales] = useState(false);
  const [isLoadingWeeklySales, setIsLoadingWeeklySales] = useState(false);
  const [isLoadingTodaySales, setIsLoadingTodaySales] = useState(false);

  const [monthlySalesData, setMonthlySalesData] = useState({});
  const [weeklySalesData, setWeeklySalesData] = useState({});
  const [todaySalesData, setTodaySalesData] = useState({});

  const [userDistributionData, setUserDistributionData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  const getHeaderSalesStats = () => {
    setIsLoadingStatsCard(true);
    getHeaderSalesStatsApi(onGetSuccessSalesHeader, onGetFailedSalesHeader);
  };

  const onGetSuccessSalesHeader = (data) => {
    setStatsData([
      { title: 'Total Sales', amount: asPrice(data.product_sales) },
      { title: 'Total Costs', amount: asPrice(data.cost_of_goods) },
      { title: 'Total Commissions', amount: asPrice(data.commission_paid) },
      { title: 'Total Net', amount: asPrice(data.net_profit) },
    ]);
    setIsLoadingStatsCard(false);
  };

  const onGetFailedSalesHeader = () => {
    setIsLoadingStatsCard(false);
  };

  const getUserSalesDistribution = () => {
    setIsLoadingUserDistribution(true);
    getUserSalesDistributionApi(onGetSuccessUserSalesDist, onGetFailedUserSalesDist);
  };

  const onGetSuccessUserSalesDist = (data) => {
    setUserDistributionData(data);
    setIsLoadingUserDistribution(false);
  };

  const onGetFailedUserSalesDist = () => {
    setIsLoadingUserDistribution(false);
  };

  const getMonthlySales = () => {
    setIsLoadingMonthlySales(true);
    getMonthlySalesApi(onGetSuccessMonthlySales, onGetFailedMonthlySales);
  };

  const onGetSuccessMonthlySales = (resp) => {
    setMonthlySalesData(resp);
    setIsLoadingMonthlySales(false);
  };

  const onGetFailedMonthlySales = () => {
    setIsLoadingMonthlySales(false);
  };

  const getWeeklySales = () => {
    setIsLoadingWeeklySales(true);
    getWeeklySalesApi(onGetSuccessWeeklySales, onGetFailedWeeklySales);
  };

  const onGetSuccessWeeklySales = (resp) => {
    let data = resp;
    for (let i = 0; i < 30; i++) {
      if (i < data.group.length) {
        data.group[i]['date'] = asDate(data.group[i].date);
        data.group[i]['sales_amount'] = Number(data.group[i].sales_amount);
      } else {
        data.group.push({
          date: asDate(
            moment()
              .add(i - 1, 'day')
              .format('YYYY-MM-DD'),
          ),
          sales_amount: 0,
        });
      }
    }
    setWeeklySalesData(data);
    setIsLoadingWeeklySales(false);
  };

  const onGetFailedWeeklySales = () => {
    setIsLoadingWeeklySales(false);
  };

  const getTodaySales = () => {
    setIsLoadingTodaySales(true);
    getTodaySalesApi(onGetSuccessTodaySales, onGetFailedTodaySales);
  };

  const onGetSuccessTodaySales = (resp) => {
    setTodaySalesData(resp);
    setIsLoadingTodaySales(false);
  };

  const onGetFailedTodaySales = () => {
    setIsLoadingMonthlySales(false);
  };

  useEffect(() => {
    getHeaderSalesStats();
    getMonthlySales();
    getTodaySales();
    getWeeklySales();
    getUserSalesDistribution();
  }, []);

  return (
    <PageContainer>
      <div>
        <div>
          <StatsCardView isLoading={isLoadingStatsCard} statsData={statsData} />
          <Row gutter={[15, 15]}>
            <Col xl={24} xxl={16} xs={24} sm={24}>
              <SalesReportTable />
            </Col>
            <Col xl={24} xxl={8} xs={24} sm={24}>
              <AffiliateToCustomerCardView
                userDistributionData={userDistributionData}
                isLoadingUserDistribution={isLoadingUserDistribution}
              />
              <TodaysSalesCardView
                isLoadingMonthlySales={isLoadingMonthlySales}
                isLoadingWeeklySales={isLoadingWeeklySales}
                isLoadingTodaySales={isLoadingTodaySales}
                todaySalesData={todaySalesData}
                weeklySalesData={weeklySalesData}
                monthlySalesData={monthlySalesData}
              />
            </Col>
          </Row>
        </div>
      </div>
    </PageContainer>
  );
};

export default SalesReportPage;
