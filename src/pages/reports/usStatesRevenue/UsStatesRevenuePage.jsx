/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, Row, ButtonGroup, TablePanel, PageContainer } from '@/components';
import {
  getUsStateRevenueApi,
  getUsTopStateApi,
  getUsBottomStateApi,
  getUsRevenueChartApi,
} from '@/services/reports/usStateRevenue';
import TableView from './summaryTable/TableView';
import UsTopStatesTableView from './summaryTable/UsTopStatesTableView';
import UsBottomStatesTableView from './summaryTable/UsBottomStatesTableView';
import { asPrice } from '@/utils/text';
import styles from './UsStatesRevenuePage.less';

const UsStateRevenuePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [isBottomLoading, setIsBottomLoading] = useState(false);
  const [searchParam, setSearchParam] = useState({
    date_range: '',
  });
  const [searchTopParam, setSearchTopParam] = useState({
    mode: 'weekly',
  });
  const [searchBottomParam, setSearchBottomParam] = useState({
    mode: 'weekly',
  });

  const [tableData, setTableData] = useState([]);
  const [topTableData, setTopTableData] = useState([]);
  const [bottomTableData, setBottomTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const loadTopTable = (searchParam_) => {
    setIsTopLoading(true);
    const params = {
      mode: searchParam_.mode,
    };
    getUsTopStateApi(params, onGetUsTopStatesList, onFailUsTopStatesList);
  };

  const onGetUsTopStatesList = (data) => {
    setTopTableData(data);
    setIsTopLoading(false);
  };

  const onFailUsTopStatesList = () => {
    setIsTopLoading(false);
  };

  const loadBottomTable = (searchParam_) => {
    setIsBottomLoading(true);
    const params = {
      mode: searchParam_.mode,
    };
    getUsBottomStateApi(params, onGetUsBottomStatesList, onFailUsBottomStatesList);
  };

  const onGetUsBottomStatesList = (data) => {
    setBottomTableData(data);
    setIsBottomLoading(false);
  };

  const onFailUsBottomStatesList = () => {
    setIsBottomLoading(false);
  };

  const loadTable = (searchParam_) => {
    setIsLoading(true);
    const params = {
      date_range: searchParam_.date_range,
    };
    getUsStateRevenueApi(params, onGetUsStatesRevenueList, onFailUsStatesRevenueList);
  };

  const onGetUsStatesRevenueList = (data) => {
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailUsStatesRevenueList = () => {
    setIsLoading(false);
  };

  const loadChart = (searchParam_) => {
    setIsLoading(true);
    const params = {
      date_range: searchParam_.date_range,
    };
    getUsRevenueChartApi(params, onGetUsRevenueChart, onFailUsRevenueChart);
  };

  const onGetUsRevenueChart = (data) => {
    setChartData(data);
    setIsLoading(false);
  };

  const onFailUsRevenueChart = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    loadChart(searchParam);
    loadTable(searchParam);
    loadTopTable(searchTopParam);
    loadBottomTable(searchBottomParam);
  }, []);

  const countryColumns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Total Sales',
      dataIndex: 'totalSales',
      key: 'totalSales',
      render: (text) => <span>{asPrice(text)}</span>,
    },
  ];
  const [type, setType] = useState('weekly');

  const changCountryType = (selectedType) => {
    setType(selectedType);
  };
  return (
    <PageContainer>
      <div className="us-state-panel">
        <Row gutter={[15, 15]}>
          <Col xxl={8} lg={24} md={24} xs={24}>
            <Row gutter={[15, 15]}>
              <Col span={24}>
                <UsTopStatesTableView
                  tableData={topTableData}
                  isLoading={isTopLoading}
                  searchParam={searchTopParam}
                  setSearchParam={setSearchTopParam}
                  loadTable={loadTopTable}
                />
              </Col>

              <Col span={24}>
                <UsBottomStatesTableView
                  tableData={bottomTableData}
                  isLoading={isBottomLoading}
                  searchParam={searchBottomParam}
                  setSearchParam={setSearchBottomParam}
                  loadTable={loadBottomTable}
                />
              </Col>
            </Row>
          </Col>

          <Col xxl={16} lg={24} md={24} xs={24}>
            <TableView
              tableData={tableData}
              isLoading={isLoading}
              searchParam={searchParam}
              setSearchParam={setSearchParam}
              chartData={chartData}
              loadTable={loadTable}
              loadChart={loadChart}
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default UsStateRevenuePage;
