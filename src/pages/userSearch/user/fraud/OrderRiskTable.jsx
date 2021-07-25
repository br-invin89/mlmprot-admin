/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AreaChart, TablePanel, Row, Col, StartEndDatePicker, Input } from '@/components';
import { getOrderRisksApi, getOrderRiskChartApi } from '@/services/userSearch/fraud';
import { asDate } from '@/utils/text';

const OrderRiskTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 100,
  });
  const [searchParam, setSearchParam] = useState({
    order_number: '',
    created_at_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: 'Order Number',
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
      title: 'Ship High Risk',
      dataIndex: 'is_ship_high_risk',
      key: 'is_ship_high_risk',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Ship In City',
      dataIndex: 'is_ship_in_city',
      key: 'is_ship_in_city',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Billing In IP Country',
      dataIndex: 'is_billing_in_ip_country',
      key: 'is_billing_in_ip_country',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Billing In City',
      dataIndex: 'is_billing_in_city',
      key: 'is_billing_in_city',
      render: (text) => <span>{text === 1 ? 'Yes' : 'No'}</span>,
    },
  ];

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
      'filter[order_number]': searchParam0.order_number,
      'filter[created_at_range]': searchParam0.created_at_range,
    };
    getOrderRisksApi(props.userId, params, onGetTableData, onFailTableData);
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
      'filter[order_number]': searchParam0.order_number,
      'filter[created_at_range]': searchParam0.created_at_range,
    };
    getOrderRiskChartApi(props.userId, params, onGetChartData);
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

  const onChangeForm = (field, value) => {
    setSearchParam({
      ...searchParam,
      [field]: value,
    });
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
      <Row gutter={[24, 24]} className="fraud-table">
        <Col xs={24}>
          <TablePanel
            title={'Order Risk Scores'}
            showFiltersMedium
            toolbar={
              <div className="toolbar-container-for-md-filters">
                <div className="toolbar-sub-container">
                  <Input
                    value={searchParam.order_number}
                    onChange={(e) => onChangeForm('order_number', e.target.value)}
                    placeholder="Order Number"
                    size="medium"
                    style={{ minWidth: '162px' }}
                    noMarginBottom
                  />
                </div>
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
              const paginationParam0 = { ...paginationParam, currentPage: 1 };
              getTableData(paginationParam0, searchParam);
              getChartData(searchParam);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrderRiskTable;
