import React, { useEffect, useState } from 'react';
import { Row, Col, Space } from '@/components';
import UserInfoSection from './UserInfoSection';
import ShippingAddressSection from './ShippingAddressSection';
import CreditCardSection from './CreditCardSection';
import HistoryTableSection from './HistoryTableSection';
import { getUserDetailApi } from '@/services/userSearch/userDetail';

const UserDetailsSubPage = (props) => {
  const [userData, setUserData] = useState(undefined);
  const [shippingData, setShippingData] = useState(undefined);
  const [billingData, setBillingData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onGetUserData = (data) => {
    setUserData(data);
    setBillingData(data.billing_detail);
    setShippingData(data.shipping_detail);
    setIsLoading(false);
  };

  const onFailUserData = () => {
    setIsLoading(false);
  };

  const getUserDetail = (userId) => {
    setIsLoading(true);
    getUserDetailApi(userId, onGetUserData, onFailUserData);
  };

  useEffect(() => {
    if (props.userId) getUserDetail(props.userId);
  }, [props.userId]);

  return (
    <>
      <div>
        <Row gutter={[15, 15]}>
          <Col xs={24} lg={24} xl={9} xxl={7}>
            <UserInfoSection userData={userData} isLoading={isLoading} />
          </Col>
          <Col xs={24} lg={24} xl={15} xxl={17}>
            <Space direction="vertical">
              <Row gutter={[15, 15]}>
                <Col xs={24} xl={24} xxl={12} lg={24} style={{ height: 'inherit'}}>
                  <ShippingAddressSection shippingData={shippingData} isLoading={isLoading} />
                </Col>
                <Col xs={24} xl={24} xxl={12} lg={24} style={{ height: 'inherit'}}>
                  <CreditCardSection billingData={billingData} isLoading={isLoading} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <HistoryTableSection userData={userData} />
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserDetailsSubPage;
