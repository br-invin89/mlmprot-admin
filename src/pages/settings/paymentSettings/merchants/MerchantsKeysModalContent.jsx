/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, OutlineBtn, SuccessNotification } from '@/components';
import { updatePaymentSettingsApi } from '@/services/settings/paymentSettings';
import styles from './MerchantsSubPage.less';
import { t } from '@/utils/label';

const MerchantsKeysModalContent = ({ data, loadTable, toggle }) => {
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
      key1: values.key1,
      key2: values.key2,
    }
    updatePaymentSettingsApi(data.id, query, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data && data.id) {
      setFields([
        { name: ['key1'], value: data.key1 },
        { name: ['key2'], value: data.key2 },
      ]);
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
            <div className={`${styles.inputLabel}`}>API Password</div>
            <Form.Item
              name="key1"
              placeholder="Enter API Password"
              rules={[{ required: true, message: 'Enter API Password' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>API Key</div>
            <Form.Item
              name="key2"
              placeholder="Enter API Key"
              rules={[{ required: true, message: 'Enter API Key' }]}
            >
              <Input />
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

export default MerchantsKeysModalContent;
