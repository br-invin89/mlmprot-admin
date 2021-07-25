import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Input, Row, Col, Button, Spin, notification, FormItem } from '@/components';
import styles from '../UserInfoSubPage.less';
import { updateUserApi } from '@/services/userSearch/changeUser';

const UserInfoForm = (props) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const onDoneUpdate = () => {
    notification.success({
      message: 'Success',
      description: 'User information updated successfully.',
    });
    setIsUpdating(false);
  };

  const onFailUpdate = () => {
    notification.success({
      message: 'Error',
      description: 'Something wrong',
    });
    setIsUpdating(false);
  };

  const validateForm = () => {
    const errorMessages0 = [];
    let isValid = true;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!formData.first_name) {
      errorMessages0.push({ type: 'first_name', message: 'Please input first name' });
      isValid = false;
    }
    if (!formData.last_name) {
      errorMessages0.push({ type: 'last_name', message: 'Please input last name' });
      isValid = false;
    }
    if (!formData.email) {
      errorMessages0.push({ type: 'email', message: 'Please input email' });
      isValid = false;
    } else if (!regex.test(formData.email)) {
      errorMessages0.push({ type: 'email', message: 'Please input valid email' });
      isValid = false;
    }
    if (!formData.phone) {
      errorMessages0.push({ type: 'phone', message: 'Please input phone' });
      isValid = false;
    }
    setErrorMessages(errorMessages0);
    return isValid;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
    setIsUpdating(true);
    updateUserApi(props.data.id, formData, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    if (!props.data) return;
    setFormData({
      first_name: props.data.first_name,
      last_name: props.data.last_name,
      email: props.data.email,
      phone: props.data.phone,
    });
  }, [props.data]);

  return (
    <>
      <div className={styles.formContainer}>
        <Row>
          <Col>
            <div className={`${styles.userTitle}`}>
              {t('pages.userSearch.userInformation', 'User Information')}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.firstName', 'First Name')}
                errorMessages={errorMessages.filter((el) => el.type === 'first_name')}
              >
                <Input
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.lastName', 'Last Name')}
                errorMessages={errorMessages.filter((el) => el.type === 'last_name')}
              >
                <Input
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.emailAddress', 'Email Address')}
                errorMessages={errorMessages.filter((el) => el.type === 'email')}
              >
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.phoneNumber', 'Phone Number')}
                errorMessages={errorMessages.filter((el) => el.type === 'phone')}
              >
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24}>
            <div className={`${styles.userSearchBtn}`}>
              <Button type="primary" onClick={handleUpdate}>
                {t('pages.userSearch.saveBtn', 'Save')}
              </Button>
            </div>
          </Col>
        </Row>
        {(props.isLoading || isUpdating) && (
          <div className={styles.spinContainer}>
            <Spin spinning={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfoForm;
