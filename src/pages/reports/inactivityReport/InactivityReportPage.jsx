/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, PageContainer } from '@/components';
import { getInactivityReportApi } from '@/services/reports/inactivityReport';
import styles from './InactivityReportPage.less';
import TableView from './summaryTable/TableView';

export default function InactivityReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().clone().startOf('month').format('YYYY-MM-DD')}|${moment()
      .clone()
      .format('YYYY-MM-DD')}`,
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);
  const [statsData, setStatsData] = useState({
    count: 0,
    total_count: 0,
  });

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      date_range: searchParam_.date_range,
    };
    getInactivityReportApi(params, onGetSummaryList, onFailSummaryList);
  };

  const onGetSummaryList = (data, stats) => {
    setTableData(data.data);
    setStatsData(stats);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailSummaryList = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      <Row>
        <Col xs={24} className={styles.merchantsTable}>
          <TableView
            tableData={tableData}
            statsData={statsData}
            isLoading={isLoading}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
