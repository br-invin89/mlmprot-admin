import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Modal } from 'antd';
import { Row, Col, Input, notification, OutlineBtn } from '@/components';
import { sendTestSystemEmailApi } from '@/services/emailCampaigns/systemEmails';
import styles from './SystemEmailsPage.less';

const TestSystemEmailModal = ({ isModalVisible, testEmailValue, onFinishTest,toggle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverEmailText, setReceiverEmailText] = useState('Required');
  const onSendTestSystemEmail = (res) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: 'The test email is sent successfully',
    });

    setIsLoading(false);
    onFinishTest(true);
  };

  const onFailSendTestSystemEmail = () => {
    setIsLoading(false);
    onFinishTest(false);
  };

  const handleTest = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (receiverEmail === '') {
      setIsError(true);
      setReceiverEmailText("Required")
      return;
    } else if (!regex.test(receiverEmail)) {
      setIsError(true);
      setReceiverEmailText("Please input valid email")
      return;
    }
    setIsLoading(true);
    sendTestSystemEmailApi(
      {
        system_email_value: testEmailValue,
        receiver_email: receiverEmail,
      },
      onSendTestSystemEmail,
      onFailSendTestSystemEmail,
    );
  };

  const handleChange = (e) => {
    setIsError(false);
    setReceiverEmail(e.target.value);
  };
  return (
    <>
      <Modal
        loading={isLoading}
        title="System Email Send Test"
        footer={null}
        onCancel={toggle}
        visible={isModalVisible}
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24}>
            <div>
              <div>* Receiver Email</div>
              <Input name="email" onChange={(e) => handleChange(e)} error={isError} />
              {isError && <div style={{ color: 'red' }}>{receiverEmailText}</div>}
            </div>
          </Col>
        </Row>
        <Row gutter={[15, 0]} justify="center" style={{ marginTop: 20 }}>
          <Col span={12} className={`${styles.inputBtn}`}>
            <OutlineBtn className={styles.actionBtn} onClick={handleTest} loading={isLoading}>
              Send Test
            </OutlineBtn>
          </Col>
          <Col span={12}>
            <OutlineBtn className={styles.actionBtn} onClick={() => onFinishTest(false)}>
              {t('common.label.cancel', 'Cancel')}
            </OutlineBtn>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default TestSystemEmailModal;
