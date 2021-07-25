/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Row, StatsCard, Spin } from '@/components';
import styles from '../CreditWalletReportPage.less';

export default function CardView(props) {
  return (
    <Row gutter={[15, 0]}>
      {props.isLoading ? (
        <Col span={24} className={styles.spacingCard}>
          <Spin spinning={true} />
        </Col>
      ) : (
        props.statsData.map((stats, idx) => {
          return (
            <Col xs={24} md={12} lg={12} xl={6} key={idx} className={styles.spacingCard}>
              <StatsCard title={stats.title} amount={stats.amount} />
            </Col>
          );
        })
      )}
    </Row>
  );
}
