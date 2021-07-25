/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Checkbox,
  Form,
  SuccessNotification,
  Select,
  UserStatusBadge,
  FileInput,
  Spin,
} from '@/components';
import { varOptions } from '@/common/var';
import { t } from '@/utils/label';
import TickImage from '@/assets/images/tickIcon.png';
import EditIcon from '@/assets/icons/editIcon.svg';
import { Avatar } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { updateDistCentersApi } from '@/services/distCenters';
import styles from '../EditDistCentersSubPage.less';

const distCenter3rdPartyServiceOptions = varOptions('distCenter.thirdPartyShipper');
const EditDetailsForm = ({ loading, details, countries }) => {
  const [form] = Form.useForm();
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };
  const [fields, setFields] = useState([]);
  const [imagePhoto, setImagePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isEditName, setIsEditName] = useState(false);
  const [editName, setEditName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThirdParty, setIsThirdParty] = useState(false);
  const onSaveSuccess = () => {
    SuccessNotification('Successfully Updated');
    setIsLoading(false);
  };
  const onSaveError = () => {
    setIsLoading(false);
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append('email', values.email);
    formData.append('is_digital', values.is_digital ? 1 : 0);
    formData.append('is_third_party', values.is_third_party ? 1 : 2);
    formData.append('name', newTitle || values.name || details.name);
    formData.append('phone', values.phone);
    formData.append('should_show_email', values.should_show_email ? 1 : 0);
    formData.append('should_show_phone', values.should_show_phone ? 1 : 0);
    formData.append('third_party_keys', values.is_third_party ? values.third_party_keys : '');
    formData.append('third_party_shipper', values.is_third_party ? values.third_party_shipper : '');
    countries.map((c) => {
      formData.append('countries[]', c.country);
    });
    if (imagePhoto) {
      formData.append('image', imagePhoto);
    }
    updateDistCentersApi(details.id, formData, onSaveSuccess, onSaveError);
  };

  const changeToEditMode = () => {
    setIsEditName(!isEditName);
  };
  const changeName = () => {
    setNewTitle(editName);
    changeToEditMode();
  };

  const handleFileChange = (file) => {
    if (file) {
      setImagePhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (details && details.id) {
      setImagePreview(details.image);
      setIsThirdParty(details.is_third_party === 1 ? true : false);
      setFields([
        { name: ['is_digital'], value: details.is_digital },
        { name: ['email'], value: details.email },
        { name: ['is_third_party'], value: details.is_third_party === 1 ? true : false },
        { name: ['name'], value: details.name },
        { name: ['phone'], value: details.phone },
        { name: ['should_show_email'], value: details.should_show_email },
        { name: ['should_show_phone'], value: details.should_show_phone },
        { name: ['third_party_keys'], value: details.third_party_keys },
        { name: ['third_party_shipper'], value: details.third_party_shipper },
      ]);
    }
  }, [details]);
  
  return (
    <Form
      {...layout}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      fields={fields}
      form={form}
      className="admin-modal"
    >
      {loading ? (
        <Spin spinning={true} />
      ) : (
        <div className="product-details-container">
          <Card className={`${styles.card}`}>
            <Row>
              <Col span={24}>
                <div className="edit-dist-container mt-12 mb-12">
                  <div className="mb-12 mt-12">
                    <div className="uploadImg">
                      {imagePreview ?
                        <div
                          style={{ backgroundImage: `url('${imagePreview}')` }}
                          className={styles.logoImg}
                        />
                        :
                        <Avatar
                          icon={<ShopOutlined />}
                          className={styles.logoImg}
                        />
                      }
                      <FileInput handleChange={handleFileChange} notButton={true}>
                        <img src={EditIcon} className="editIcon" />
                      </FileInput>
                    </div>
                  </div>
                  <div className="top-rated-container">
                    {isEditName ? (
                      <div className="rowsA">
                        <div className="inputWrapperA">
                          <Form.Item
                            className={styles.formFields}
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: t(
                                  'common.validation.pleaseEnterTitle',
                                  'Please Enter Title',
                                ),
                              },
                            ]}
                          >
                            <Input maxLength={30} onChange={(e) => setEditName(e.target.value)} />
                          </Form.Item>
                        </div>
                        <img src={TickImage} className="editIcon" onClick={changeName} />
                      </div>
                    ) : (
                      <span>
                        <span className="text-name">{newTitle || (details && details.name)}</span>{' '}
                        <img src={EditIcon} className="editIcon" onClick={changeToEditMode} />
                      </span>
                    )}
                  </div>
                  <div className="mt-12 mb-12">
                    <UserStatusBadge status={details.status === 1 ? 'Active' : 'Inactive'} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col xs={24} lg={12}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.phone', 'Phone')}
                    className={styles.formFields}
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: t(
                          'common.validation.pleaseEnterPhone',
                          'Please Enter Phone',
                        ),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} lg={12} className="check-aling">
                <Form.Item name="should_show_phone" valuePropName="checked">
                  <Checkbox label="Show Phone Number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col xs={24} lg={12}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.email', 'Email')}
                    className={styles.formFields}
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: t(
                          'common.validation.pleaseEnterEmail',
                          'Please Enter Email',
                        ),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} lg={12} className="check-aling">
                <Form.Item name="should_show_email" valuePropName="checked">
                  <Checkbox label="Show Email Address" />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ height: 28}}>
              <Col xs={24} lg={12}>
                <Form.Item className={styles.checkboxes} name="is_digital" valuePropName="checked">
                  <Checkbox label="Deliever Digital Product" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  className={styles.checkboxes}
                  name="is_third_party"
                  valuePropName="checked"
                >
                  <Checkbox
                    label="Is Third Party"
                    onChange={(e) => setIsThirdParty(e.target.checked)}
                  />
                </Form.Item>
              </Col>
            </Row>
            {isThirdParty ? (
              <Row gutter={[15, 0]} style={{marginTop: 3}}>
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
            ) : (
              ''
            )}
            <Row className="mt-15">
              <Col xs={24} xl={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  color="type"
                  style={{ width: '100%' }}
                >
                  {t("pages.distCenter.update", "Update")}
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </Form>
  );
};

export default EditDetailsForm;
