/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, PageContainer } from '@/components';
import { getCronReportApi } from '@/services/reports/cronReport';
import styles from './CronReportPage.less';
import TableView from './table/TableView';

export default function CronReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useState({
    cron_name: '',
    date_range: `${moment().clone().startOf('month').format('YYYY-MM-DD')}|${moment()
      .clone()
      .format('YYYY-MM-DD')}`,
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      'filter[date_range]': searchParam_.date_range,
      'filter[cron_name]': searchParam_.cron_name,
    };
    getCronReportApi(params, onGetSummaryList, onFailSummaryList);
  };

  const onGetSummaryList = (data) => {
    setTableData(data.data);
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
