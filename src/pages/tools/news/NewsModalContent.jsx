/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, {useState, useEffect} from 'react';
import {
  OutlineBtn,
  Row,
  Col,
  RichEditor,
  Input,
  CheckboxGroup,
  FormItem,
} from '@/components';
import { varOptions } from '@/common/var';
import styles from './NewsPage.less';
import { t } from '@/utils/label';
const userTypeOptions = varOptions('user.type');

const NewsModalContent = ({ data, onSave, saveBtnText }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    eligible_user_types: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [eligibleUserTypes, setEligibleUserTypes] = useState([]); 

  const onSaveSuccess = () => {
    setIsUpdating(false);
    setFormData({
      title: '',
      content: '',
      eligible_user_types: '',
    });
    setEligibleUserTypes([]);
  };

  const onSaveError = () => {
    setIsUpdating(false);
  };

  const validateForm = () => {
    const errorMessages0 = [];
    let isValid = true;
    if (!formData.title) {
      errorMessages0.push({
        name: 'title',
        message: 'Please input title',
      });
      isValid = false;
    }
    if (!formData.eligible_user_types) {
      errorMessages0.push({
        name: 'eligible_user_types',
        message: 'Please select user types',
      });
      isValid = false;
    }
    if (!formData.content) {
      errorMessages0.push({
        name: 'content',
        message: 'Please input content',
      });
      isValid = false;
    }

    setErrorMessages(errorMessages0);
    return isValid;
  };

  const onFinish = () => {
    if (!validateForm()) {
      return;
    }
    setIsUpdating(true);
    setErrorMessages([]);
    onSave(formData, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data) {
      const formData0 = { ...data, eligible_user_types: data.eligible_user_types.join(',') };
      if (data.eligible_user_types) {
        const eligibleUserTypes0 = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const type of data.eligible_user_types) {
          eligibleUserTypes0.push(type * 1);
        }

        setEligibleUserTypes(eligibleUserTypes0);
      }
      setFormData(formData0);
    }
  }, [data]);

  return (
    <div className={styles.modalContainer}>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={
                t('common.table.title', 'Title')}
              errorMessages={errorMessages.filter((el) => el.name === 'title')}
            >
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'title')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem
            className="mt-0 mb-10"
            label={
              t('common.label.userType', 'User Type')}
            errorMessages={errorMessages.filter((el) => el.name === 'eligible_user_types')}
          >
            <CheckboxGroup
              className="mb-12"
              options={userTypeOptions}
              value={eligibleUserTypes}
              onChange={(values) => {
                setFormData({ ...formData, eligible_user_types: values.join(',') });
                setEligibleUserTypes(values);
              }}
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className="mt-0 mb-10"
              label={
                t('common.label.content', 'Content')
              }
              errorMessages={errorMessages.filter((el) => el.name === 'content')}
            >
              <RichEditor
                placeholder={
                  t('pages.news.enterContent', 'Enter Content')}
                value={formData.content}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    content: value,
                  });
                }}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row type="flex">
        <Col className="mc mb-0">
          <OutlineBtn
              className="mt-15"
              loading={isUpdating}
              disabled={isUpdating}
              onClick={onFinish}
            >
              {saveBtnText}
          </OutlineBtn>
        </Col>
      </Row>
    </div>
  );
};

export default NewsModalContent;
