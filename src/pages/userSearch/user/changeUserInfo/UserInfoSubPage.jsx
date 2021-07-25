import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from '@/components';
import UserInfoForm from './forms/UserInfoForm';
import ShippingAddressForm from './forms/ShippingAddressForm';
import TaxInfoForm from './forms/TaxInfoForm';
// import BankInfoForm from './forms/BankInfoForm';
import styles from './UserInfoSubPage.less';
import { getUserDetailApi } from '@/services/userSearch/userDetail';

export default function UserInfoSubPage(props) {
  const [userData, setUserData] = useState(undefined);
  const [shippingData, setShippingData] = useState(undefined);
  const [taxFormData, setTaxFormData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onGetUserData = (data) => {
    setUserData(data);
    setTaxFormData(data.tax);
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
        <div>
          <Card className={`${styles.card}`}>
            <Row gutter={[24, 12]}>
              <Col xs={24} sm={24} xl={12}>
                <UserInfoForm data={userData} isLoading={isLoading} />
              </Col>
              <Col xs={24} sm={24} xl={12}>
                <ShippingAddressForm
                  data={shippingData}
                  userData={userData}
                  isLoading={isLoading}
                />
              </Col>
              {taxFormData && (
                <>
                  <div className={`${styles.line}`} />
                  <Col span={24}>
                    <TaxInfoForm data={taxFormData} userData={userData} isLoading={isLoading} />
                  </Col>
                </>
              )}

              {/*
              <div className={`${styles.line}`} />
              <Col span={24}>
                <BankInfoForm data={userChangeData} />
              </Col>
              */}
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
}
