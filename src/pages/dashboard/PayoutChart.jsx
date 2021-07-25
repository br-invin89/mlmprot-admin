/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { Row, Col, ColumnChart, StartEndDatePicker, Spin } from '@/components';
import styles from './DashboardPage.less';
import moment from 'moment';
import { getDashboardPayoutChartApi } from '@/services/dashboard';
import { t } from '@/utils/label';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [payoutData, setPayoutData] = useState([]);

  const onGetPayoutData = (data) => {
    const graphData = [];
    data.map((item) =>
      graphData.push({
        date: moment(item.paid_at).format('YYYY-MM-DD'),
        sales: parseFloat(item.paid_amount, 10),
      }),
    );
    setPayoutData(graphData);
    setIsLoading(false);
  };
  const onFailPayoutData = () => {
    setIsLoading(false);
  };

  const loadPayoutData = (dateRange) => {
    setIsLoading(true);
    const params = {
      date_range: dateRange,
    };
    getDashboardPayoutChartApi(params, onGetPayoutData, onFailPayoutData);
  };

  const onChangeDateRanage = (date) => {
    let startDate0 = moment().subtract(30, 'days');
    let endDate0 = moment();
    if (date) {
      startDate0 = date[0];
      endDate0 = date[1];
    }
    setStartDate(startDate0);
    setEndDate(endDate0);
    const dateRange = `${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`;
    loadPayoutData(dateRange);
  };

  useEffect(() => {
    const dateRange = `${startDate.format('YYYY-MM-DD')}|${endDate.format('YYYY-MM-DD')}`;
    loadPayoutData(dateRange);
  }, []);

  return (
    <>
      <Row className={`${styles.payoutContainer}`}>
        <Col xs={24} lg={12}>
          <div className={`${styles.title}`}>{t('pages.dashboard.payout', 'Payout')}</div>
        </Col>
        <Col xs={24} lg={12}>
          <div className={`${styles.payoutBtnContainer} payout-btns`}>
            <StartEndDatePicker value={[startDate, endDate]} onChange={onChangeDateRanage} />
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          {isLoading ? (
            <Spin spinning={true} />
          ) : (
            <ColumnChart xField="date" yField="sales" data={payoutData} />
          )}
        </Col>
      </Row>
    </>
  );
};
