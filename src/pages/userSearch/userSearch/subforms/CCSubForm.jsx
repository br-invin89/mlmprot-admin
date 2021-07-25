import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Input, Select, Row, Col } from '@/components';
import styles from '../UserSearchPage.less';
import { countryOptions } from '@/utils/country';

export default function CCSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [field]: value,
    });
  };

  useEffect(() => {
    setFormData(props.searchParam);
  }, [props.searchParam]);

  return (
    <>
    <div>
      <Row>
        <Col>
          <div className={`${styles.title}`}>
            {t('pages.dashboard.creditCard', 'Credit Card')}
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Last CC 4 Number</div>
            <Input
              value={formData['billing_detail.last_cc_4']}
              onChange={(e) => onFormData('billing_detail.last_cc_4', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Country</div>
            <Select
              options={[{ label: '', value: '' }, ...countryOptions()]}
              value={formData['billing_detail.billing_country']}
              onChange={(v) => onFormData('billing_detail.billing_country', v)}
              onPressEnter={props.onPressEnter}              
            />
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
}
