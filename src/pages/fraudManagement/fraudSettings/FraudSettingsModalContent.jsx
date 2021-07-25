/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, OutlineBtn, InputNumber } from '@/components';
import { countryOptions } from '@/utils/country';
import styles from './FraudSettingsPage.less';
import { t } from '@/utils/label';

const FraudSettingsModalContent = ({ isEdit, data, onFinish, isUpdateLoading, open }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };

  useEffect(() => {
    if (isEdit && data && data.country) {
      setFields([
        { name: ['country'], value: data.country },
        { name: ['threshold'], value: data.threshold },
      ]);
      setValues({
        country: data.country,
        threshold: data.threshold,
      });
    } else {
      setFields([
        { name: ['country'], value: '' },
        { name: ['threshold'], value: '' },
      ]);
    }
  }, [data, isEdit]);

  useEffect(() => {
    if (!isEdit && !isUpdateLoading) {
      setFields([
        { name: ['country'], value: '' },
        { name: ['threshold'], value: '' },
      ]);
    }
  }, [isUpdateLoading]);

  useEffect(() => {
    setValues(form.getFieldsValue());
  }, []);

  return (
    <Form
      {...layout}
      name="basic"
      layout="vertical"
      initialValues={data || {}}
      onFinish={onFinish}
      fields={fields}
      form={form}
    >
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t('pages.fraudMangement.country', 'Country')}
            </div>
            <Form.Item
              name="country"
              rules={[{ required: true, message: 'Please Select Country' }]}
            >
              <Select
                options={countryOptions()}
                placeholder="Select Country"
                showSearch
                onChange={() => {
                  setValues(form.getFieldsValue());
                }}
              />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t('pages.fraudMangement.threshold', 'Threshold')}
            </div>
            <Form.Item
              name="threshold"
              placeholder="Enter Threshold"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Enter Threshold');
                    } else if (value <= 0) {
                      return Promise.reject('Threshold should be greater than 0');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                className={styles.width100}
                onChange={() => {
                  setValues(form.getFieldsValue());
                }}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]} justify="center">
        <Col span={12} className={`${styles.inputBtn}`}>
          <OutlineBtn className={styles.actionBtn} loading={isUpdateLoading} htmlType="submit">
            {isEdit ? t('common.label.update', 'Update') : t('common.label.add', 'Add')}
          </OutlineBtn>
        </Col>
        <Col span={12}>
          <OutlineBtn
            className={styles.actionBtn}
            disabled={!values.country && !values.threshold}
            onClick={() => {
              form.resetFields();
              setValues({});
            }}
          >
            {t('common.label.cancel', 'Cancel')}
          </OutlineBtn>
        </Col>
      </Row>
    </Form>
  );
};

export default FraudSettingsModalContent;
