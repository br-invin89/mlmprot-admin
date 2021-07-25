/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Row, PageContainer } from '@/components';
import { getMonthlyVolumeReportApi } from '@/services/reports/monthlyVolume';
import styles from './MonthlyVolumePage.less';
import TableView from './summaryTable/TableView';

export default function MonthlyVolumePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useState({
    month: moment().format('YYYY-MM'),
    uuid: '',
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
      month: searchParam.month,
      uuid: searchParam.uuid,
    };
    getMonthlyVolumeReportApi(params, onGetSummaryList, onFailSummaryList);
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

  const searchTable = () => {
    setIsLoading(true);
    const params = {
      page: 1,
      per_page: paginationParam.perPage,
      month: searchParam.month,
      uuid: searchParam.uuid,
    };
    getMonthlyVolumeReportApi(params, onGetSummaryList, onFailSummaryList);
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
            onSearch={searchTable}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
