import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { CircularProgressBar, Alert, Row, Col, Spin } from '@/components';
import { getUserDetailApi } from '@/services/userSearch/userDetail';
import styles from './FraudSubPage.less';

export default function ScoresView(props) {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onGetUser = (data) => {
    setIsLoading(false);
    setUserData(data);
  };

  const onFailUser = () => {
    setIsLoading(false);
  };

  const getUserDetail = (userId) => {
    setIsLoading(true);
    getUserDetailApi(userId, onGetUser, onFailUser);
  };

  useEffect(() => {
    if (props.userId) getUserDetail(props.userId);
  }, [props.userId]);

  return (
    <div className={styles.scoresView}>
      {
        isLoading ?
          <Row>
            <Col span={24}>
              <div className={styles.loadingContainer}>
                <Spin spinning={isLoading} />
              </div>
            </Col>
          </Row>
          :
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={10}>
              <Row gutter={[24, 0]}>
                <Col xs={12} md={12}>
                  <CircularProgressBar
                    strokeWidth="10"
                    sqSize="160"
                    percentage={userData ? userData.risk_score : 0}
                    title={'Risk Score'}
                    render="text"
                    status="info"
                  />
                </Col>
                <Col xs={12} md={12}>
                  <CircularProgressBar
                    strokeWidth="10"
                    sqSize="160"
                    percentage={userData ? userData.ip_risk_score : 0}
                    title={'Last IP Risk Score'}
                    render="text"
                    status="danger"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={12}>
              <Alert
                color="info"
                content={t(
                  'pages.userSearch.infoFraudContent',
                  'A higher score indicates a higher risk of fraud. For example, a score of 20 indicates a 20% chance that a transaction is fraudulent. We never return a risk score of 0, since all transactions have the possibility of being fraudulent. Likewise we never return a risk score of 100.',
                )}
                title="Info"
              />
            </Col>
          </Row>
      }
    </div>
  );
}
