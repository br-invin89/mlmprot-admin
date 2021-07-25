import React from 'react';
import { t } from '@/utils/label';
import { Input, Select, Row, Col } from '@/components';
import styles from '../UserSearchPage.less';

export default function EnrollmentSubForm() {
  return (
    <>
      <div>
        <Row>
          <Col>
            <div className={`${styles.title}`}>
              {t("pages.dashboard.enrollmentPaymentInfo", "Enrollment Payment Info")}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Enrollment Kit</div>
              <Select />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Status</div>
              <Select />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Merchant Trans. ID</div>
              <Input />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Last CC 4 Numb (%)</div>
              <Input />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
