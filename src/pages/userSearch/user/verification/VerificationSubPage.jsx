/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row, Col } from '@/components';
import TableView from './table/TableView';

export default function VerificationSubPage(props) {
  return (
    <>
      <Row gutter={[15, 0]} className="verification-table">
        <Col xs={24}>
          <TableView userId={props.userId} />
        </Col>
      </Row>
    </>
  );
}
