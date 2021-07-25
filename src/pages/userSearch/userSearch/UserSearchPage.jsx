import React from 'react';
import { PageContainer, Row, Col } from '@/components';
import UserSearchForm from './UserSearchForm';

export default function UserSearchPage() {
  return (
    <PageContainer>
      <Row>
        <Col span={24}>
          <UserSearchForm />
        </Col>
      </Row>
    </PageContainer>
  );
}
