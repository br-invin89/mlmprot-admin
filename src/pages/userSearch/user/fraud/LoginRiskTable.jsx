/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { t } from '@/utils/label';
import { AreaChart, TablePanel, Row, Col, StartEndDatePicker } from '@/components';
import { getLoginRisksApi, getLoginRiskChartApi } from '@/services/userSearch/fraud';
import { asDate } from '@/utils/text';

const LoginRiskTable = (props) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: 'Order Num',
      dataIndex: 'order_number',
      key: 'order_number',
    },
    {
      title: 'Risk Score',
      dataIndex: 'risk_score',
      key: 'risk_score',
    },
    {
      title: 'IP Risk Score',
      dataIndex: 'ip_risk_score',
      key: 'ip_risk_score',
    },
    {
      title: 'Anonymous VPN',
      dataIndex: 'is_anonymous_vpn',
      key: 'is_anonymous_vpn',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Hosting Provider',
      dataIndex: 'is_hosting_provider',
      key: 'is_hosting_provider',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Public Proxy',
      dataIndex: 'is_public_proxy',
      key: 'is_public_proxy',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Residential Proxy',
      dataIndex: 'is_residential_proxy',
      key: 'is_residential_proxy',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
  ];
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 100,
  });
  const [searchParam, setSearchParam] = useState({
    created_at_range: '',
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onGetTableData = (data) => {
    setTableData(data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const getTableData = (paginationParam0, searchParam0) => {
    setIsLoading(true);
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
      'filter[created_at_range]': searchParam0.created_at_range,
    };
    getLoginRisksApi(props.userId, params, onGetTableData, onFailTableData);
  };

  const onGetChartData = (data) => {
    const chartData0 = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const row of data) {
      chartData0.push({
        date: asDate(row.created_at),
        risk_score: row.risk_score * 1,
      });
    }
    setChartData(chartData0);
  };

  const getChartData = (searchParam0) => {
    const params = {
      'filter[created_at_range]': searchParam0.created_at_range,
    };
    getLoginRiskChartApi(props.userId, params, onGetChartData);
  };

  useEffect(() => {
    if (props.userId) {
      getTableData(paginationParam, searchParam);
      getChartData(searchParam);
    }
  }, [props]);

  const onPageChange = (currentPage) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage,
    };
    getTableData(paginationParam0, searchParam);
  };

  const onChangeDate = (values) => {
    let startDate0 = '';
    let endDate0 = '';
    let createdAtRange = '';
    if (values) {
      startDate0 = values[0];
      endDate0 = values[1];
      createdAtRange = `${moment(values[0]).format('YYYY-MM-DD')}|${moment(values[1]).format(
        'YYYY-MM-DD',
      )}`;
    }
    setSearchParam({
      ...searchParam,
      startDate: startDate0,
      endDate: endDate0,
      created_at_range: createdAtRange,
    });
  };

  return (
    <>
      <Row className="fraud-table-login-risk-scores">
        <Col xs={24}>
          <TablePanel
            title={t('pages.userSearch.loginRiskScore', 'Login Risk Scores')}
            toolbar={
              <div className="toolbar-container">
                <div className="toolbar-sub-container">
                  <StartEndDatePicker
                    startDate={searchParam.startDate}
                    endDate={searchParam.endDate}
                    onChange={onChangeDate}
                    noMarginBottom
                  />
                </div>
              </div>
            }
            chart={
              <AreaChart
                data={chartData}
                xField={'date'}
                yField={'risk_score'}
                yAxis={{ maxLimit: 100 }}
              />
            }
            showSearchIcon
            data={tableData}
            columns={columns}
            onPageChange={onPageChange}
            paginationParam={paginationParam}
            loading={isLoading}
            onSearch={() => {
              getTableData(paginationParam, searchParam);
              getChartData(searchParam);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default LoginRiskTable;
