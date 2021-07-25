/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Col, Row, PageContainer } from '@/components';
import moment from 'moment';
import { getDailyCountryRevenueApi, getDailyCountryRevenueChartApi } from '@/services/reports/countryRevenue';
import TableView from './summaryTable/TableView';
import styles from './CountryReportPage.less';

const CountryReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD")}|${moment().add(0, 'months').endOf('month').format("YYYY-MM-DD")}`,
    merchant_id: '',
  });
  const [tableData, setTableData] = useState([]);
  const [chartData, setchartData] = useState([]);

  const loadTable = (searchParam_) => {
    setIsLoading(true);
    const params = {
      date_range: searchParam_.date_range,
    };
    getDailyCountryRevenueApi(params, onGetCountryRevenueList, onFailCountryRevenueList);
  };

  const onGetCountryRevenueList = (data) => {
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailCountryRevenueList = () => {
    setIsLoading(false);
  };

  const loadChart = (searchParam_) => {
    setIsLoading(true);
    const params = {
      date_range: searchParam_.date_range
    }
    getDailyCountryRevenueChartApi(params, onGetCountryRevenueChart, onFailCountryRevenueChart);
  }

  const onGetCountryRevenueChart = (data) => {
    setchartData(data);
    setIsLoading(false);
  }

  const onFailCountryRevenueChart = () => {
    setIsLoading(false);
  }
  useEffect(() => {
    loadTable(searchParam);
    loadChart(searchParam);
  }, []);

  return (
    <PageContainer>
      <div>
        <Row gutter={[15, 15]}>
          <Col xxl={24} lg={24} md={24} xs={24}>
            <TableView
              tableData={tableData}
              isLoading={isLoading}
              searchParam={searchParam}
              setSearchParam={setSearchParam}
              loadTable={loadTable}
              chartData={chartData}
              loadChart={loadChart}
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default CountryReportPage;
