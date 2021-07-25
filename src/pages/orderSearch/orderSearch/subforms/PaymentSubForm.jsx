import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { Input, Select, Row, Col } from '@/components';
import styles from '../OrderSearchPage.less';
import { getMerchantsApi } from '@/services/settings/merchants';
import { varOptionsWithDefault } from '@/common/var';

export default function OrderSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);
  const [merchantOptions, setMerchantOptions] = useState([]);

  const onGetMerchants = (data) => {
    const merchantOptionsTemp = [
      { label: '', value: '' },
      ...data.data.map((el) => ({ label: el.name, value: el.id })),
    ];
    setMerchantOptions(merchantOptionsTemp);
  };

  const loadMerchants = () => {
    getMerchantsApi(onGetMerchants);
  };

  useEffect(() => {
    loadMerchants('');
  }, []);

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
              <FormattedMessage id="pages.userSearch.paymentInfo" defaultMessage="Payment Info" />
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Merchant</div>
              <Select
                value={formData.merchant_id}
                onChange={(v) => onFormData('merchant_id', v)}
                options={merchantOptions}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Merchant Response</div>
              <Select
                value={formData.merchant_response}
                onChange={(v) => onFormData('merchant_response', v)}
                options={varOptionsWithDefault('order.merchantResponse')}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Transaction ID</div>
              <Input
                value={formData.transaction_id}
                onChange={(e) => onFormData('transaction_id', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
