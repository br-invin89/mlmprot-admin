/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, Row, PageContainer } from '@/components';
import moment from 'moment';
import { getTopEarnersApi } from '@/services/reports/topEarners';
import styles from './TopEarnersReportPage.less';
import TableView from './summaryTable/TableView';

const TopEarnersReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
    merchant_id: '',
  });
  const [tableData, setTableData] = useState([]);

  const loadTable = (searchParam_) => {
    setIsLoading(true);
    const params = {
      date_range: searchParam_.date_range,
    };
    getTopEarnersApi(params, onGetTopEarnersList, onFailTopEarnersList);
  };

  const onGetTopEarnersList = (data) => {
    setTableData(data);
    setIsLoading(false);
  };

  const onFailTopEarnersList = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    loadTable(searchParam);
  }, []);

  return (
    <PageContainer>
      <Row>
        <Col xs={24} className={styles.topEarnersTable}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            loadTable={loadTable}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TopEarnersReportPage;
