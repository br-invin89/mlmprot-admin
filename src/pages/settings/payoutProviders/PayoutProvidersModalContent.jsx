/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  OutlineBtn,
  SuccessNotification,
  MultiSelect,
  RichEditor,
} from '@/components';
import { countryOptions } from '@/utils/country';
import { updatePayoutProviderApi } from '@/services/settings/payoutProvider';
import styles from './PayoutProvidersPage.less';
import { t } from '@/utils/label';

const PayoutProvidersModalContent = ({ data, loadTable, toggle }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');
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
      key3: values.key3,
      countries: values.countries,
      description,
    };
    updatePayoutProviderApi(data.id, query, onSaveSuccess, onSaveError);
  };


  useEffect(() => {
    if (data && data.id) {
      const countries = data.countries && data.countries.map((d) => d.country);
      setDescription(data.description_html)
      setFields([
        { name: ['key1'], value: data.key1 },
        { name: ['key2'], value: data.key2 },
        { name: ['key3'], value: data.key3 },
        { name: ['countries'], value: countries },
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
            <div className={`${styles.inputLabel}`}>Key 1</div>
            <Form.Item
              name="key1"
              placeholder="Enter Key 1"
              rules={[{ required: true, message: 'Enter Key 1' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Key 2</div>
            <Form.Item
              name="key2"
              placeholder="Enter Key 2"
              rules={[{ required: true, message: 'Enter Key 2' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Key 3</div>
            <Form.Item
              name="key3"
              placeholder="Enter Key 3"
              rules={[{ required: true, message: 'Enter Key 3' }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Countries</div>
            <Form.Item name="countries" rules={[{ required: true, message: 'Select Countries' }]}>
              <MultiSelect options={countryOptions()} />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Description</div>
            <Form.Item>
              <RichEditor
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
               />
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

export default PayoutProvidersModalContent;
