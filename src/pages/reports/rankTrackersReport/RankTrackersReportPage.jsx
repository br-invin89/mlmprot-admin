/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { t } from '@/utils/label';
import {
  Col,
  Row,
  PageContainer,
  StartEndDatePicker,
  TablePanel,
  Card,
  LineChart,
} from '@/components';
import { getRankTrackerApi } from '@/services/reports/rankTracker';
import styles from './RankTrackersReportPage.less';
import RankTrackersChart from './RankTrackersChart';

const RankTrackersReportPage = () => {
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [startMonth, setStartMonth] = useState(moment().subtract(2, 'months'));
  const [endMonth, setEndMonth] = useState(moment());
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: 'Rank',
      key: 'name',
    },
    {
      title: 'Total Change',
      key: 'total_change',
    },
  ]);

  const onDateChange = (date) => {
    const startMonth0 = date[0];
    const endMonth0 = date[1];
    setStartMonth(startMonth0);
    setEndMonth(endMonth0);
  };

  const onGetTableData = (data) => {
    setIsLoading(false);
    setTableData(data.data);
    setColumns(data.cells);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTableData = () => {
    setIsLoading(true);
    const monthRange = `${startMonth.format('YYYY-MM')}-01|${endMonth.format('YYYY-MM')}-01`;
    const params = {
      month_range: monthRange,
    };
    getRankTrackerApi(params, onGetTableData, onFailTableData);
  };

  useEffect(() => {
    loadTableData();
  }, [startMonth, endMonth]);

  return (
    <div className="report-rank-tracker">
      <PageContainer>
        <Row gutter={[0, 15]}>
          <Col xs={24} className={styles.rankTrackersTable}>
            <TablePanel
              data={tableData}
              title={t('pages.reports.rankTracker', 'Rank Tracker')}
              toolbar={
                <div className="toolbar-container">
                  <div className={`toolbar-sub-container`}>
                    <StartEndDatePicker
                      onChange={onDateChange}
                      value={[startMonth, endMonth]}
                      picker={'month'}
                      allowClear={false}
                    />
                  </div>
                </div>
              }
              chart={<RankTrackersChart startMonth={startMonth} endMonth={endMonth} />}
              applyPadding
              columns={columns}
              loading={isLoading}
            />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default RankTrackersReportPage;
