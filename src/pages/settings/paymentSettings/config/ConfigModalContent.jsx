/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  OutlineBtn,
  SuccessNotification,
  Radio,
  InputNumber,
} from '@/components';
import { changePaymentConfigApi } from '@/services/settings/paymentSettings';
import styles from './ConfigSubPage.less';
import { t } from '@/utils/label';

const ConfigModalContent = ({ data, loadTable, toggle }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rule, setRule] = useState(1);
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
      toggle();
    }, 2000);
  };
  const onSaveError = () => {
    setIsLoading(false);
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    const query = {
      max_transactions: rule === 1 ? values.max_transactions : 0,
      max_amount: rule === 1 ? 0 : values.max_amount,
      priority: values.priority,
    };
    changePaymentConfigApi(data.id, query, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data && data.id) {
      setRule(data.max_amount ? 2 : 1);
      setFields([
        { name: ['max_transactions'], value: data.max_transactions },
        { name: ['max_amount'], value: data.max_amount },
        { name: ['priority'], value: data.priority },
        { name: ['rule'], value: data.max_amount ? 2 : 1 },
      ]);
    }
  }, [data]);

  const radioStyle = {
    display: 'block',
  };

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
            <Form.Item name="rule">
              <Radio.Group onChange={(e) => setRule(e.target.value)}>
                <Radio style={radioStyle} value={1}>
                  Max Number of Transactions Per Day
                </Radio>
                <Radio style={radioStyle} value={2}>
                  Max Amount Per Day
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Col>
        {rule === 1 ? (
          <Col xs={24}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Max Number of Transactions Per Day</div>
              <Form.Item
                name="max_transactions"
                placeholder="Enter Max Number of Transactions Per Day"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject('Enter Max Number of Transactions Per Day');
                      } else if (value <= 0) {
                        return Promise.reject('Max Number should be greater than 0');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber className={styles.width100} />
              </Form.Item>
            </div>
          </Col>
        ) : (
          <Col xs={24}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Max Amount Per Day</div>
              <Form.Item
                name="max_amount"
                placeholder="Enter Max Amount Per Day"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject('Enter Max Amount Per Day');
                      } else if (value <= 0) {
                        return Promise.reject('Max Amount should be greater than 0');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber className={styles.width100} />
              </Form.Item>
            </div>
          </Col>
        )}
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Priority</div>
            <Form.Item
              name="priority"
              placeholder="Enter Priority"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject('Enter Priority');
                    } else if (value <= 0) {
                      return Promise.reject('Priority should be greater than 0');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber className={styles.width100} />
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

export default ConfigModalContent;
