import React, { useState, useEffect } from 'react';
import { Input, Select, Row, Col } from '@/components';
import { t } from '@/utils/label';
import styles from '../UserSearchPage.less';
import { countryOptions } from '@/utils/country';

export default function ShippingSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);

  const onFormData = (field, value) => {
    if (value !== ' ') {
      setFormData({
        ...formData,
        [field]: value,
      });
      props.setSearchParam({
        ...props.searchParam,
        [field]: value,
      });
    }
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
              {t('pages.userSearch.shippingAddress', 'Shipping Address')}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          {/*
          <Col xs={24} sm={12} md={24} lg={24}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Street Address</div>
              <Input />
            </div>
          </Col>
          */}
          <Col xs={24} sm={12} md={24} lg={24} xl={12} xxl={8}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>State/Province</div>
              <Input
                value={formData['order.shipping_state']}
                onChange={(e) => onFormData('order.shipping_state', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={24} lg={24} xl={12} xxl={8}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Zip/Postal Code</div>
              <Input
                value={formData['order.shipping_zipcode']}
                onChange={(e) => onFormData('order.shipping_zipcode', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={24} lg={24} xl={24} xxl={8}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Country</div>
              <Select
                value={formData['order.shipping_country']}
                onChange={(v) => onFormData('order.shipping_country', v)}
                options={[{ label: '', value: '' }, ...countryOptions()]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
