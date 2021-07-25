import React from 'react';
import { PageContainer, Card, Row, Col } from '@/components';
import SummaryCards from './SummaryCards';
import SalesChart from './SalesChart';
import PayoutChart from './PayoutChart';
import CustomersBarChart from './CustomersBarChart';
import LeaderboardTable from './LeaderboardTable';
import styles from './DashboardPage.less';

export default () => {
  // const intl = useIntl();
  return (
    <PageContainer>
      <Row gutter={[15, 15]} className="mb-15">
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Card colSpan={24} ghost>
            <SummaryCards />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <Card colSpan={24} className={`${styles.salesChartCard}`}>
            <SalesChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={[15, 15]}>
        <Col xs={24} xl={16}>
          <Card colSpan={24} className={`${styles.payoutChartCard}`}>
            <PayoutChart />
          </Card>
        </Col>
        <Col xs={24} xl={8} >
          <Card colSpan={24} className={styles.customerBarCard} >
            <CustomersBarChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={[15, 15]} className="mt-15">
        <Col xs={24} lg={24}>
          <LeaderboardTable />
        </Col>
      </Row>
    </PageContainer>
  );
};
