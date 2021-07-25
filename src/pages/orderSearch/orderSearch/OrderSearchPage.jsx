import React from 'react';
import { PageContainer, Row, Col } from '@/components';
import OrderSearchForm from './OrderSearchForm';

export default function OrderSearchPage() {
  return (
    <PageContainer>
      <Row>
        <Col span={24}>
          <OrderSearchForm />
        </Col>
      </Row>
    </PageContainer>
  );
}
