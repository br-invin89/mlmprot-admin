/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Row, HoriontalProgress, ColumnChart, Spin } from '@/components';
import { asPercent, asPrice } from '@/utils/text';
import { t } from '@/utils/label';
import styles from '../SalesReportPage.less';

export default function TodaysSalesCardView(props) {
  return (
    <div className={styles.todaysSalesCardView}>
      {props.isLoadingMonthlySales || props.isLoadingWeeklySales || props.isLoadingTodaySales ? (
        <Spin spinning={true} />
      ) : (
        <div className={styles.salesCard}>
          <Row className={styles.salesRowText} justify="space-between" align="center">
            <Col>
              <h5>{t('pages.reports.todaysSales', 'Today’s Sales')}</h5>
            </Col>
            <Col>
              <h4>{props.todaySalesData.sales_amount}</h4>
            </Col>
          </Row>
          <Row
            className={
              props.todaySalesData.sales_percent >= 0
                ? styles.salesPositivePercentText
                : styles.salesNegativePercentText
            }
            justify="end"
          >
            <h4>{`${props.todaySalesData.sales_percent}%`}</h4>
          </Row>

          <div className={styles.salesChart}>
            <ColumnChart
              xField="date"
              yField="sales_amount"
              data={
                props.weeklySalesData &&
                props.weeklySalesData.group &&
                props.weeklySalesData.group.length > 0
                  ? props.weeklySalesData.group
                  : []
              }
            />
          </div>

          <Row className={styles.salesProgressContainer} align="middle">
            <Col span={12} className={styles.chartLables}>
              <p className={styles.salesProgressP}>
                {t('pages.reports.bestDay', 'Best Day')}{' '}
                <span className={styles.salesProgressSpan}>
                  {props.weeklySalesData && asPrice(props.weeklySalesData.best_sales)}
                </span>
              </p>
            </Col>
            <Col span={12} className={styles.chartLables}>
              <p className={styles.salesProgressP}>
                {t('pages.reports.average', 'Average')}{' '}
                <span className={styles.salesProgressSpan}>
                  {props.weeklySalesData && asPrice(props.weeklySalesData.avg_sales)}
                </span>
              </p>
            </Col>
          </Row>

          <div className={styles.progressContainer}>
            <div className={styles.progressSubContainer}>
              <div className={styles.progressSubTextContainer}>
                {t('pages.reports.thisMonth', 'This Month')}
              </div>
              <Row justify="space-between" className={styles.progressSubTextRow}>
                <Col className={styles.progressSubTextCol1} span={16}>
                  <HoriontalProgress
                    percent={
                      props.monthlySalesData.this_month_sales
                        ? (Number(props.monthlySalesData.this_month_sales) /
                            (Number(props.monthlySalesData.this_month_sales) +
                              Number(props.monthlySalesData.last_month_sales))) *
                          100
                        : 0
                    }
                    showInfo={false}
                    strokeColor="#1991EB"
                  />
                </Col>
                <Col span={6} className={styles.progressSubTextCol2}>
                  <div className={styles.progressSubTextCol2Number}>
                    {asPrice(props.monthlySalesData.this_month_sales)}
                  </div>
                </Col>
              </Row>

              <div className={styles.progressSubTextContainer}>
                {t('pages.reports.lastMonth', 'Last Month')}
              </div>
              <Row justify="space-between" className={styles.progressSubTextRow}>
                <Col span={16} className={styles.progressSubTextCol1}>
                  <HoriontalProgress
                    percent={
                      props.monthlySalesData.last_month_sales
                        ? (Number(props.monthlySalesData.last_month_sales) /
                            (Number(props.monthlySalesData.this_month_sales) +
                              Number(props.monthlySalesData.last_month_sales))) *
                          100
                        : 0
                    }
                    showInfo={false}
                    strokeColor="#8534C9"
                  />
                </Col>
                <Col
                  span={6}
                  className={styles.progressSubTextCol2}
                  styles={{ marginLeft: 'auto' }}
                >
                  <div className={styles.progressSubTextCol2Number}>
                    {asPrice(props.monthlySalesData.last_month_sales)}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
