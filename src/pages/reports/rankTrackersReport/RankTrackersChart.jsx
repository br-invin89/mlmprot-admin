import React, { useState, useEffect } from 'react';
// import { t } from '@/utils/label';
import { Row, Col, LineChart } from '@/components';
// import styles from './RankTrackersReportPage.less';
import { getRankTrackerChartApi } from '@/services/reports/rankTracker';

export default function RankTrackersChart(props) {
  const [chartData, setChartData] = useState([]);

  const onGetChartData = (data) => {
    setChartData(data);
  };
  const onFailChartData = () => {};
  const loadChartData = () => {
    const monthRange = `${props.startMonth.format('YYYY-MM')}-01|${props.endMonth.format(
      'YYYY-MM',
    )}-01`;
    const params = {
      month_range: monthRange,
    };
    getRankTrackerChartApi(params, onGetChartData, onFailChartData);
  };

  useEffect(() => {
    loadChartData();
  }, [props.startMonth, props.endMonth]);

  return (
    <>
      <Row gutter={[0, 0]}>
        <Col span={24}>
          <LineChart data={chartData} xField={'month'} yField={'count'} seriesField={'rank'} />
        </Col>
      </Row>
    </>
  );
}
