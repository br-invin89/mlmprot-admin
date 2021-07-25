/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  FileInput,
  MultiSelect,
  Checkbox,
  Select,
  SuccessNotification,
} from '@/components';
import styles from './DistCentersPage.less';
import { t } from '@/utils/label';
import { countryOptions } from '@/utils/country';
import { createDistCentersApi } from '@/services/distCenters';
import { varOptions } from '@/common/var';
import defaultImage from '@/assets/images/download.png';

const distCenter3rdPartyServiceOptions = varOptions('distCenter.thirdPartyShipper');
const DistCenterModalContent = (props) => {
  const [form] = Form.useForm();
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };
  const [imagePhoto, setImagePhoto] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThirdParty, setIsThirdParty] = useState(false);
  const onSaveSuccess = () => {
    SuccessNotification('Successfully Created');
    form.resetFields();
    setImagePhoto({})
    setImagePreview('')
    setIsLoading(false);
    props.toggle()
    props.loadCards(props.searchParam);
  };
  const onSaveError = () => {
    setIsLoading(false);
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append('email', values.email);
    formData.append('is_digital', values.is_digital ? 1 : 0);
    formData.append('is_third_party', values.is_third_party ? 1 : 0);
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('should_show_email', values.should_show_email ? 1 : 0);
    formData.append('should_show_phone', values.should_show_phone ? 1 : 0);
    formData.append('third_party_keys', values.is_third_party ? values.third_party_keys : '');
    formData.append('third_party_shipper', values.is_third_party ? values.third_party_shipper : '');
    values.countries.map((c) => {
      formData.append("countries[]", c);
    });
    if (imagePreview) {
      formData.append('image', imagePhoto);
    }
    createDistCentersApi(formData, onSaveSuccess, onSaveError);
  };

  const handleFileChange = (file) => {
    if (file) {
      setImagePhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <Form
      {...layout}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      className="admin-modal"
    >
      <Row>
        <Col span={24}>
          <div className="input-label-text">Select Picture</div>
        </Col>
      </Row>
      <Row className={`${styles.profileContainer}`}>
        <Col span={24}>
          <div className="profilePic">
            <Form.Item
              className="mt-0 mb-10"
              name="image"
              rules={[
                {
                  required: false,
                  message: t('common.label.selectPicture', 'Select Picture'),
                },
              ]}
            >
              <img src={imagePreview || defaultImage} alt="" />
              <FileInput handleChange={handleFileChange}>Upload Photo</FileInput>
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.title', 'Title')}
              className={styles.formFields}
              name="name"
              rules={[
                {
                  required: true,
                  message: t('common.validation.pleaseEnterTitle', 'Please Enter Title'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.email', 'Email')}
              className={styles.formFields}
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: t('common.validation.pleaseEnterEmail', 'Please Enter Email'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.phone', 'Phone')}
              className={styles.formFields}
              name="phone"
              rules={[
                {
                  required: true,
                  message: t('common.validation.pleaseEnterPhone', 'Please Enter Phone'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.countries', 'Countries')}
              className={styles.formFields}
              name="countries"
              rules={[
                {
                  required: true,
                  message: t(
                    'common.validation.pleaseSelectCountries',
                    'Please Select Countries',
                  ),
                },
              ]}
            >
              <MultiSelect options={countryOptions()} />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div>
            <Form.Item
              className={styles.checkboxes}
              name="should_show_email"
              valuePropName="checked"
            >
              <Checkbox label="Should Show Email" />
            </Form.Item>
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <Form.Item
              className={styles.checkboxes}
              name="should_show_phone"
              valuePropName="checked"
            >
              <Checkbox label="Should Show Phone" />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div>
            <Form.Item className={styles.checkboxes} name="is_third_party" valuePropName="checked">
              <Checkbox
                label="Is Third Party"
                onChange={(e) => setIsThirdParty(e.target.checked)}
              />
            </Form.Item>
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <Form.Item className={styles.checkboxes} name="is_digital" valuePropName="checked">
              <Checkbox label="Deliever Digital Product" />
            </Form.Item>
          </div>
        </Col>
      </Row>
      {isThirdParty && (
        <Row gutter={[15, 0]}>
          <Col xs={12}>
            <div className={`${styles.inputContainer}`}>
              <Form.Item
                label={t('common.label.thirdPartyService', 'Third Party Service')}
                className={styles.formFields}
                name="third_party_shipper"
                rules={[
                  {
                    required: isThirdParty,
                    message: t(
                      'common.validation.pleaseSelectThirdParty',
                      'Please Select Third Party Service',
                    ),
                  },
                ]}
              >
                <Select options={distCenter3rdPartyServiceOptions} />
              </Form.Item>
            </div>
          </Col>
          <Col xs={12}>
            <div className={`${styles.inputContainer}`}>
              <Form.Item
                label={t('common.label.key', 'Key')}
                className={styles.formFields}
                name="third_party_keys"
                rules={[
                  {
                    required: isThirdParty,
                    message: t('common.validation.pleaseEnterKey', 'Please Enter Key'),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
        </Row>
      )}

      <Row>
        <Col span={24} className={`${styles.createBtn}`}>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DistCenterModalContent;
