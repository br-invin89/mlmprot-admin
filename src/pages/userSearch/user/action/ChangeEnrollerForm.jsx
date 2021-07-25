import React from 'react';
import { t } from '@/utils/label';
import { Input, Row, Col, OutlineBtn } from '@/components';
import styles from './UserActionSubPage.less';

const ChangeEnrollerForm = () => {
  return (
    <>
      <div>
        <div className={`${styles.label}`}>
          {t("pages.userSearch.changeEnrolle", "Change Enroller")}
        </div>
        <div className={`${styles.lightLabel}`}>
          {t("pages.userSearch.actionEnrolleText", "Please provide Username/ID# of New Enroller)")}
        </div>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={6}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}></div>
              <Input placeholder="Username" />
            </div>
          </Col>
          <div className={`${styles.lightLabel} ${styles.orLabel}`}>
            {t("pages.userSearch.orText", "or")}
          </div>
          <Col xs={24} sm={24} md={24} lg={6}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}></div>
              <Input placeholder="Affiliate ID" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <div className={`${styles.statusBtn}`}>
              <OutlineBtn className={`${styles.button} mt-0`}>
                {t("pages.userSearch.changeText", "Change")}
              </OutlineBtn>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ChangeEnrollerForm;
