import React from 'react';
import { Space } from '@/components';
import ScoresView from './ScoresView';
import OrderRiskTable from './OrderRiskTable';

const FraudSubPage = (props) => {
  return (
    <>
      <div>
        <ScoresView userId={props.userId} />
        <Space size={15} direction="vertical">
          <div style={{ marginTop: 24 }}>
            <OrderRiskTable userId={props.userId} />
          </div>
          {/*
          <div>
            <LoginRiskTable userId={props.userId} />
          </div>
          */}
        </Space>
      </div>
    </>
  );
};

export default FraudSubPage;
