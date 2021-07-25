import React, { useEffect, useState } from 'react';
import { Row, Col, OutlineBtn, notification, Popconfirm, UserStatusBadge } from '@/components';
import styles from './UserActionSubPage.less';
import { requestVerificationApi } from '@/services/userSearch/verification';
import { requestTaxUploadApi } from '@/services/userSearch/action';
import { varLabel, varKey } from '@/common/var';

export default function RequestVerificationForm(props) {
  const [verificationStatus, setVerificationStatus] = useState(1);
  const [taxStatus, setTaxStatus] = useState(1);
  const [isRequestingVerification, setIsRequestingVerification] = useState(false);
  const [isRequestingTax, setIsRequestingTax] = useState(false);

  const onRequestVerification = () => {
    setIsRequestingVerification(false);
    notification.success({
      message: 'Success',
      description: 'Sent user verification request',
    });
    props.getUserDetail();
  };
  const onFailRequestVerification = () => {
    setIsRequestingVerification(false);
  };
  const handleRequestVerification = () => {
    setIsRequestingVerification(true);
    requestVerificationApi(props.userData.id, {}, onRequestVerification, onFailRequestVerification);
  };

  const onRequestTax = () => {
    setIsRequestingTax(false);
    notification.success({
      message: 'Success',
      description: 'Sent tax form upload request',
    });
    props.getUserDetail();
  };
  const onFailRequestTax = () => {
    setIsRequestingTax(false);
  };
  const handleRequestTax = () => {
    setIsRequestingTax(true);
    requestTaxUploadApi(props.userData.id, {}, onRequestTax, onFailRequestTax);
  };

  useEffect(() => {
    if (props.userData) {
      setVerificationStatus(props.userData.verification_status);
      setTaxStatus(props.userData.tax_status);
    }
  }, [props.userData]);

  return (
    <>
      <div>
        <Row>
          <Col span={24}>
            <div className={`${styles.payoutContainer}`}>
              <div className={`${styles.requestLabel}`}>Verification </div>
              <div className="mr-12">
                <UserStatusBadge status={varLabel('user.verificationStatus', verificationStatus)} />
              </div>
              {varKey('user.verificationStatus', props.userData.verification_status) !==
                'requested' && (
                <Popconfirm onConfirm={handleRequestVerification}>
                  <OutlineBtn
                    loading={isRequestingVerification}
                    disabled={isRequestingVerification}
                  >
                    Send Request
                  </OutlineBtn>
                </Popconfirm>
              )}
            </div>
            <div className={`${styles.payoutContainer}`}>
              <div className={`${styles.requestLabel}`}>Tax Form </div>
              <div className="mr-12">
                <UserStatusBadge status={varLabel('user.taxStatus', taxStatus)} />
              </div>
              {varKey('user.taxStatus', props.userData.tax_status) !== 'requested' && (
                <Popconfirm onConfirm={handleRequestTax}>
                  <OutlineBtn loading={isRequestingTax} disabled={isRequestingTax}>
                    Send Request
                  </OutlineBtn>
                </Popconfirm>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
