/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, OutlineBtn, SuccessNotification } from '@/components';
import { updateCurrencyApi } from '@/services/settings/currencySettings';
import styles from './CurrencySettingsPage.less';
import { t } from '@/utils/label';

const CurrencySettingsModalContent = ({ data, loadTable, toggle }) => {
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
    form.resetFields();
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
      name: values.name,
      standard_name: values.standard_name,
      symbol: values.symbol,
    }
    updateCurrencyApi(data.id, query, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data && data.id) {
      setFields([
        { name: ['name'], value: data.name },
        { name: ['standard_name'], value: data.standard_name },
        { name: ['symbol'], value: data.symbol },
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
            <div className={`${styles.inputLabel}`}>Name</div>
            <Form.Item
              name="name"
              placeholder="Enter Name"
              rules={[{ required: true, message: 'Enter Name' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Standard Name</div>
            <Form.Item
              name="standard_name"
              placeholder="Enter Standard Name"
              rules={[{ required: true, message: 'Enter Standard Name' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Symbol</div>
            <Form.Item
              name="symbol"
              placeholder="Enter Symbol"
              rules={[{ required: true, message: 'Enter Symbol' }]}
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

export default CurrencySettingsModalContent;
