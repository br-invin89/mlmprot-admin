import React, { useState } from 'react';
import { t } from '@/utils/label';
import {
  Alert,
  Row,
  Col,
  OutlineBtn,
  Input,
  notification,
  message,
  Popconfirm,
} from '@/components';
import styles from './UserActionSubPage.less';
import { changePasswordApi } from '@/services/userSearch/action';

export default function GeneratePasswordForm(props) {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: 'Success',
      description: 'Password has been changed',
    });
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleSubmit = () => {
    if (!formData.password) {
      message.error('Please input password');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      message.error("Password doesn't match");
      return;
    }
    setIsUpdating(true);
    changePasswordApi(
      props.userData.id,
      { password: formData.password },
      onDoneUpdate,
      onFailUpdate,
    );
  };

  return (
    <>
      <div>
        <Row gutter={[24, 0]}>
          <Col xs={24} lg={12} xl={6}>
            <div className={`${styles.label}`}>
              {t('pages.userSearch.generatePassword', 'Generate Password')}
            </div>
            <div className={styles.inputContainer}>
              <Input
                placeholder={'New Password'}
                type={'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                placeholder={'Confirm Password'}
                type={'password'}
                value={formData.passwordConfirm}
                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
              />
            </div>
            <Popconfirm onConfirm={handleSubmit}>
              <OutlineBtn
                className={`${styles.changeBtn}`}
                loading={isUpdating}
                disabled={isUpdating}
              >
                {t('pages.userSearch.changeText', 'Change')}
              </OutlineBtn>
            </Popconfirm>
          </Col>
          <Col xs={24} md={12} lg={12} className="alert-container">
            <Alert
              color="info"
              content="We will send an email to the user with the new password."
              title="Info"
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
