import React from 'react';
import { t } from '@/utils/label';
import { TextArea, Input, Row, Col, OutlineBtn } from '@/components';
import styles from './UserActionSubPage.less';

const ChargeAmountForm = () => {
  return (
    <>
      <div>
        <Row>
          <Col xs={24} md={24} lg={16} xl={12}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>*Amount</div>
              <Input />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={22} xl={20}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Comment (Optional)</div>
              <TextArea rows={3} />
            </div>
          </Col>
        </Row>
        <div>
          <OutlineBtn>
            {t("pages.userSearch.chargeBack", "Chargeback")}
          </OutlineBtn>
        </div>
      </div>
    </>
  );
};

export default ChargeAmountForm;
