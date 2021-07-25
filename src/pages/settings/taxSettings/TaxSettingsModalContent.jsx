 /* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, OutlineBtn, SuccessNotification } from '@/components';
import { updateTaxSettingsApi } from '@/services/settings/TaxSettings';
import styles from './TaxSettingsPage.less';
import { t } from '@/utils/label';

const TaxSettingsModalContent = ({ data, loadTable, toggle }) => {
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
      name: data.name
    }
    updateTaxSettingsApi(data.id, query, onSaveSuccess, onSaveError);
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
            <div className={`${styles.inputLabel}`}>Production Api Key</div>
            <Form.Item
              name="key1"
              placeholder="Enter Production Api Key"
              rules={[{ required: true, message: 'Enter Production Api Key' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Sandbox Api Key</div>
            <Form.Item
              name="key2"
              placeholder="Enter Sandbox Api Key"
              rules={[{ required: true, message: 'Enter Sandbox Api Key' }]}
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

export default TaxSettingsModalContent;
