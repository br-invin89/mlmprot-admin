import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Input, Select, Row, Col } from '@/components';
import styles from '../UserSearchPage.less';
import { varOptions } from '@/common/var';
import { countryOptions } from '@/utils/country';


export default function OrderSubForm(props) {
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
          <div className={`${styles.title}`}>{t('pages.userSearch.orderInfo', 'Order Info')}</div>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Order Number</div>
            <Input
              value={formData['order.order_number']}
              onChange={(e) => onFormData('order.order_number', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Status</div>
            <Select
              value={formData['order.status']}
              onChange={(v) => onFormData('order.status', v)}
              options={[{ label: '', value: '' }, ...varOptions('order.status')]}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Order IP Address</div>
            <Input
              value={formData['order.order_ip_address']}
              onChange={(e) => onFormData('order.order_ip_address', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Last CC 4 Number</div>
            <Input
              value={formData['order.last_cc_4']}
              onChange={(e) => onFormData('order.last_cc_4', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Merchant Transaction ID</div>
            <Input
              value={formData['order.transaction_id']}
              onChange={(e) => onFormData('order.transaction_id', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Shipment Tracking Number</div>
            <Input
              value={formData['order.tracking_number']}
              onChange={(e) => onFormData('order.tracking_number', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Shipping State/Province</div>
            <Input
              value={formData['order.shipping_state']}
              onChange={(e) => onFormData('order.shipping_state', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Shipping Zip/Postal Code</div>
            <Input
              value={formData['order.shipping_zipcode']}
              onChange={(e) => onFormData('order.shipping_zipcode', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Shipping Country</div>
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
