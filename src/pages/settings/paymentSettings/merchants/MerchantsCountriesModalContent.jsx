/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, OutlineBtn, SuccessNotification, MultiSelect } from '@/components';
import { countryOptions } from '@/utils/country';
import { changePaymentCountriesApi } from '@/services/settings/paymentSettings';
import styles from './MerchantsSubPage.less';
import { t } from '@/utils/label';

const MerchantsCountriesModalContent = ({ data, loadTable, toggle }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };

  const onSaveSuccess = () => {
    SuccessNotification('Successfully Updated');
    setIsLoading(false);
    loadTable();
    setTimeout(() => {
      toggle()
    }, 2000)
  };
  const onSaveError = () => {
    setIsLoading(false);
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    const query = {
      countries: values.countries,
    };
    changePaymentCountriesApi(data.id, query, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data && data.id) {
      const countries = data.countries && data.countries.map((d) => d.country);
      setFields([{ name: ['countries'], value: countries }]);
    }
  }, [data]);

  return (
    <Form
      {...layout}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      fields={fields}
      form={form}
    >
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Countries</div>
            <Form.Item name="countries" rules={[{ required: true, message: 'Select Countries' }]}>
              <MultiSelect options={countryOptions()} />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]} justify="center">
        <Col span={24} className={`${styles.inputBtn}`}>
          <OutlineBtn loading={isLoading} htmlType="submit">
            {t('common.label.update', 'Update')}
          </OutlineBtn>
        </Col>
      </Row>
    </Form>
  );
};

export default MerchantsCountriesModalContent;
