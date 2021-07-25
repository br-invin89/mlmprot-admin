import React, { useState, useEffect } from 'react';
import { Input, Select, Row, Col } from '@/components';
import { t } from '@/utils/label';
import styles from '../OrderSearchPage.less';
import { varOptions } from '@/common/var';

const userTypeOptions = varOptions('user.type');

export default function GeneralSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [field]: value,
    });
  };

  useEffect(() => {
    setFormData(props.searchParam);
  }, [props.searchParam]);

  return (
    <>
      <div>
        <Row>
          <Col>
            <div className={`${styles.title}`}>
              {t('pages.userSearch.userInformation', 'User Information')}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Username</div>
              <Input
                value={formData.username}
                onChange={(e) => onFormData('username', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>First Name</div>
              <Input
                value={formData.first_name}
                onChange={(e) => onFormData('first_name', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Last Name</div>
              <Input
                value={formData.last_name}
                onChange={(e) => onFormData('last_name', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Email</div>
              <Input
                value={formData.email}
                onChange={(e) => onFormData('email', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Phone</div>
              <Input
                value={formData.phone}
                onChange={(e) => onFormData('phone', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>User Type</div>
              <Select
                options={[{ label: '', value: '' }, ...userTypeOptions]}
                value={formData.user_type}
                onChange={(v) => onFormData('user_type', v)}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
