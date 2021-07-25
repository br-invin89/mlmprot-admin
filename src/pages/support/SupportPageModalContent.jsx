/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, OutlineBtn, TextArea } from '@/components';
import styles from './SupportPage.less';
import { t } from '@/utils/label';
import { varOptions } from '@/common/var';
import { getUser } from '@/utils/localStorage';

const SupportPageModalContent = ({ isEdit, data, onFinish, isUpdateLoading, open }) => {
  const currentUser = getUser();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };
  useEffect(() => {
    if (isEdit && data && data.id) {
      setFields([
        { name: ['type'], value: data.type },
        { name: ['subject'], value: data.subject },
        { name: ['message'], value: data.message },
        { name: ['priority'], value: data.priority },
        { name: ['status'], value: data.status },
        { name: ['user_uuid'], value: data.user_uuid },
      ]);
      setValues({
        subject: data.subject,
        type: data.type,
        message: data.message,
        priority: data.priority,
        status: data.status,
        user_uuid: data.user_uuid,
      });
    } else {
      setFields([
        { name: ['type'], value: '' },
        { name: ['subject'], value: '' },
        { name: ['message'], value: '' },
        { name: ['priority'], value: '' },
        { name: ['user_uuid'], value: '' },
      ]);
    }
  }, [data, isEdit]);

  useEffect(() => {
    if (!isEdit && !isUpdateLoading) {
      setFields([
        { name: ['type'], value: '' },
        { name: ['subject'], value: '' },
        { name: ['message'], value: '' },
        { name: ['priority'], value: '' },
        { name: ['user_uuid'], value: '' },
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
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t('pages.support.firstName', 'First Name')}
            </div>
            <Form.Item>
              <Input value={currentUser.first_name} disabled />
            </Form.Item>
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>{t('pages.support.lastName', 'Last Name')}</div>
            <Form.Item>
              <Input value={currentUser.last_name} disabled />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>{t('pages.support.type', 'Type')}</div>
            <Form.Item name="type" rules={[{ required: true, message: 'Please Select Type' }]}>
              <Select
                options={varOptions('support.type')}
                placeholder="Select Type"
                onChange={() => {
                  setValues(form.getFieldsValue());
                }}
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>{t('pages.support.priority', 'Priority')}</div>
            <Form.Item
              name="priority"
              rules={[{ required: true, message: 'Please Select Priority' }]}
            >
              <Select
                options={varOptions('support.priority')}
                placeholder="Select Priority"
                onChange={() => {
                  setValues(form.getFieldsValue());
                }}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
      {isEdit && (
        <Row gutter={[15, 0]}>
          <Col span={24}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>{t('pages.support.status', 'Status')}</div>
              <Form.Item
                name="status"
                rules={[{ required: isEdit, message: 'Please Select Status' }]}
              >
                <Select
                  options={varOptions('support.status')}
                  placeholder="Select Status"
                  onChange={() => {
                    setValues(form.getFieldsValue());
                  }}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      )}
      {!isEdit && (
        <Row gutter={[15, 0]}>
          <Col span={24}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>
                {t('pages.support.userUuid', 'User UUID')}
              </div>
              <Form.Item
                name="user_uuid"
                rules={[{ required: !isEdit, message: 'Enter User UUID' }]}
              >
                <Input
                  placeholder="Enter User UUID"
                  onChange={() => {
                    setValues(form.getFieldsValue());
                  }}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      )}
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>{t('pages.support.subject', 'Subject')}</div>
            <Form.Item name="subject" rules={[{ required: true, message: 'Enter Subject' }]}>
              <Input
                placeholder="Enter Subject"
                onChange={() => {
                  setValues(form.getFieldsValue());
                }}
              />
            </Form.Item>
          </div>
        </Col>
        {!isEdit && (
          <Col xs={24}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>{t('pages.support.message', 'Message')}</div>
              <Form.Item
                name="message"
                placeholder="Enter Message"
                rules={[{ required: !isEdit, message: 'Enter Message' }]}
              >
                <TextArea
                  rows={5}
                  onChange={() => {
                    setValues(form.getFieldsValue());
                  }}
                />
              </Form.Item>
            </div>
          </Col>
        )}
      </Row>
      <Row gutter={[15, 0]} justify="center">
        <Col span={24} className={`${styles.inputBtn}`}>
          <OutlineBtn className={styles.actionBtn} loading={isUpdateLoading} htmlType="submit">
            {isEdit ? t('common.label.update', 'Update') : t('common.label.create', 'Create')}
          </OutlineBtn>
        </Col>
      </Row>
    </Form>
  );
};

export default SupportPageModalContent;
