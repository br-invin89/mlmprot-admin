/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import moment from 'moment';
import { TablePanel, CountryMapChart, CountryFlag } from '@/components';
import { getPayoutCountryApi, getPayoutCountryChartApi } from '@/services/reports/payoutReport';
import styles from '../../countryReport/CountryReportPage.less';
import CountryRevenueTableHead from './CountryRevenueTableHead';

const CountryRevenueTableView = (props) => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [hideTableLoader, setHideTableLoader] = useState(false);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD")}|${moment().add(0, 'months').endOf('month').format("YYYY-MM-DD")}`,
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 5,
  });

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoadingTable(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      date_range: searchParam_.date_range,
    };
    getPayoutCountryApi(params, onGetPayoutCountryList, onFailPayoutCountryList);
  };

  const onGetPayoutCountryList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoadingTable(false);
  };

  const onFailPayoutCountryList = () => {
    setIsLoadingTable(false);
  };

  const onGetPayoutCountryChart = (data) => {
    setChartData(data);
    setIsLoadingChart(false);
  }

  const onFailPayoutCountryChart = () => {
    setIsLoadingChart(false);
  }

  const loadChart = (searchParam_) => {
    setIsLoadingChart(true);
    const params = {
      date_range: searchParam_.date_range
    }
    getPayoutCountryChartApi(params, onGetPayoutCountryChart, onFailPayoutCountryChart);
  }
  
  const onPageChange = (page) => {
    const pagination = { ...paginationParam, currentPage: page };
    loadTable(pagination, searchParam);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
    loadChart(searchParam);
  }, []);

  const columns = [
    {
      title: t('common.table.country', 'Country' ),
      dataIndex: 'country',
      key: 'country',
      render: (text) => <CountryFlag country={text} />,
    },
    {
      title: t('common.table.totalPv', 'Total PV' ),
      dataIndex: 'total_pv',
      key: 'total_',
    },
    {
      title: t('common.table.totalCv', 'Total CV' ),
      dataIndex: 'total_cv',
      key: 'total_cv',
    },
    {
      title: t('common.table.paidAmount', 'Paid Amount'),
      dataIndex: 'paid_amount',
      key: 'paid_amount',
    },
  ];

  useEffect(() => {
    if (props.hideHover) {
      setHideTableLoader(true);
    } else {
      setTimeout(() => {
        setHideTableLoader(false);
      }, 1000);
    }
  }, [props.hideHover]);

  const obj = {};
  chartData &&
    chartData.map((item, i) => {
      obj[`${item.country}`] = (i + 1) * 1000;
    });

  return (
    <div>
      <div className="country-revenue">
        <TablePanel
          data={tableData}
          title={t('pages.reports.countryRevenue', 'Country Revenue')}
          toolbar={
            <CountryRevenueTableHead
              searchParam={searchParam}
              setSearchParam={setSearchParam}
              paginationParam={paginationParam}
              // loadTable={loadTable}
            />
          }
          chart={
            <div className="countryMap">
              <CountryMapChart
                data={chartData}
                obj={obj}
                showHover={props.showHover}
                hideHover={hideTableLoader}
              />
            </div>
          }
          showSearchIcon
          onSearch={() => {
            loadTable(paginationParam, searchParam);
            loadChart(searchParam);
          }}
          applyPadding
          columns={columns}
          loading={isLoadingTable}
          onPageChange={onPageChange}
          paginationParam={paginationParam}
        />
      </div>
    </div>
  );
};

export default CountryRevenueTableView;
