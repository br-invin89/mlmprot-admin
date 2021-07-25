/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  FileInput,
  MultiSelect,
  OutlineBtn,
} from '@/components';
// import defaultAvatarImage from '@/assets/images/avatar-4.jpg';
import AddRoundIcon from '@/assets/icons/addRound.svg';
import styles from './AdministratorsPage.less';
import { t } from '@/utils/label';
import { getDepartmentsApi } from '@/services/administrators/departments';
import defaultUserImage from '@/assets/icons/user.svg';

const ValidateIPaddress = (ipaddress) => {
  const ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipaddress.match(ipformat)) {
    return true;
  }
  return false;
};

const AdministratorsModalContent = ({
  data = {},
  onSave,
  saveBtnText,
  videoTypeList = [],
  type,
  changeAdminPassword,
}) => {
  const [form] = Form.useForm();
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };
  const [imagePhoto, setImagePhoto] = useState('');
  const [imagePreview, setImagePreview] = useState(data && data.image ? data.image : undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [changepassword, setChangePassword] = useState(false);
  const [departments, setDepartments] = useState([]);

  const onGetDepartments = (tableData_) => {
    setDepartments(
      tableData_.data.map((item) => {
        return { ...item, value: item.id, label: item.name };
      }),
    );
    setIsLoading(false);
  };

  const onFailDepartments = () => {
    setIsLoading(false);
  };

  const loadDepartments = async (params) => {
    setIsLoading(true);
    getDepartmentsApi(params, onGetDepartments, onFailDepartments);
  };

  const onSaveSuccess = () => {
    form.resetFields();
    setIsSaving(false);
  };
  const onSaveError = () => {
    setIsLoading(false);
  };

  const onPasswordChangeSuccess = () => {
    setIsSaving(false);
  };

  const onPasswordchangeError = () => {
    setIsSaving(false);
  };

  const onFinish = async (values) => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      let dataToUpsert = data || {};
      dataToUpsert = {
        ...dataToUpsert,
        ...values,
      };
      delete dataToUpsert.ip_addresses;
      if (type === 'edit') {
        delete dataToUpsert.status;
        delete dataToUpsert.remember_token;
        delete dataToUpsert.last_login_at;
        delete dataToUpsert.created_at;
        delete dataToUpsert.updated_at;
        delete dataToUpsert.department;
      }
      if (changepassword) {
        const changePasswordData = {
          password: values.password,
        };
        changeAdminPassword(changePasswordData, onPasswordChangeSuccess, onPasswordchangeError);
      }
      if (imagePhoto) {
        delete dataToUpsert.image;
        values?.ip_addresses?.forEach((ip, index) => {
          dataToUpsert[`ip_addresses[${index}]`] = ip;
        });
        Object.keys(dataToUpsert).map((key) => formData.append(key, dataToUpsert[key]));
        formData.append('image', imagePhoto);

        if (!dataToUpsert.ip_addresses) {
          formData.append('ip_addresses', JSON.stringify([]));
        }
        dataToUpsert = formData;
      } else {
        dataToUpsert.ip_addresses = values.ip_addresses;
        delete dataToUpsert.image;
      }
      onSave(dataToUpsert, onSaveSuccess, onSaveError);
    } catch (e) {
      console.log('Error while saving news', e);
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setImagePhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    loadDepartments(``);
  }, []);

  const togglePassword = () => {
    setChangePassword(!changepassword);
  };

  return (
    <Form
      {...layout}
      name="basic"
      layout="vertical"
      initialValues={data || {}}
      onFinish={onFinish}
      form={form}
      className="admin-modal"
    >
      <Row>
        <Col span={24}>
          <div className="input-label-text">Profile Picture</div>
        </Col>
      </Row>
      <Row className={`${styles.profileContainer}`}>
        <Col span={24}>
          <div className="profilePic">
            <Form.Item
              className="mt-0 mb-10"
              name="image"
              // rules={
              //   imagePhoto
              //     ? [
              //         {
              //           required: false,
              //           message: t('common.label.chooseProfilePicture', 'Choose Profile Picture'),
              //         },
              //       ]
              //     : [
              //         {
              //           required: true,
              //           message: t('common.label.chooseProfilePicture', 'Choose Profile Picture'),
              //         },
              //       ]
              // }
            >
              <img src={imagePreview || defaultUserImage} alt="" />
              <FileInput
                handleChange={handleFileChange}
                accept="image/png, image/jpeg, image/bmp, image/gif"
              >
                Upload Photo
              </FileInput>
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              className={`${styles.formitem}`}
              label={t('common.label.firstName', 'First Name')}
              name="first_name"
              rules={[
                {
                  required: true,
                  message: t('common.validation.pleaseEnterFirstName', 'Please Enter First Name'),
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
              className={`${styles.formitem}`}
              label={t('common.label.lastName', 'Last Name')}
              name="last_name"
              rules={[
                {
                  required: true,
                  message: t('common.validation.pleaseEnterLastName', 'Please Enter Last Name'),
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
              className={`${styles.formitem}`}
              label={t('common.label.email', 'Email')}
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: t('common.validation.pleaseEnterEmail', 'Please Enter Email'),
                },
              ]}
            >
              <Input autocomplete="off" />
            </Form.Item>
          </div>
        </Col>
        {type === 'add' ? (
          <Col xs={12}>
            <div className={`${styles.inputContainer}`}>
              <Form.Item
                className={`${styles.formitem}`}
                label={t('common.label.password', 'Password')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('common.validation.pleaseEnterPassword', 'Please Enter Password'),
                  },
                ]}
              >
                <Input type="password" autoComplete="new-password" />
              </Form.Item>
            </div>
          </Col>
        ) : (
          <Col xs={12}>
            <div className={`${styles.inputContainer}`}>
              <Form.Item
                className={`${styles.formitem}`}
                label={t('common.label.departments', 'Departments')}
                name="department_id"
                rules={[
                  {
                    required: true,
                    message: t(
                      'common.validation.pleaseSelectDepartment',
                      'Please Select Department',
                    ),
                  },
                ]}
              >
                <Select options={departments} />
              </Form.Item>
            </div>
          </Col>
        )}
      </Row>
      <Row gutter={[15, 0]}>
        {type === 'add' ? (
          <Col xs={24}>
            <div className={`${styles.inputContainer}`}>
              <Form.Item
                className={`${styles.formitem}`}
                label={t('common.label.departments', 'Departments')}
                name="department_id"
                rules={[
                  {
                    required: true,
                    message: t(
                      'common.validation.pleaseSelectDepartment',
                      'Please Select Department',
                    ),
                  },
                ]}
              >
                <Select options={departments} />
              </Form.Item>
            </div>
          </Col>
        ) : (
          ''
        )}
        <Col xs={24}>
          {/*
          <Row>
            <Col xs={24} xl={24}>
              <div className={`${styles.inputContainer}`}>
                <Form.List
                  name="ip_addresses"
                  rules={[
                    {
                      validator: async (_, names) => {
                        // if (!names || names.length < 1) {
                        //   return Promise.reject(new Error('At least 1 ip addresses'));
                        // }
                        if (names && names.length > 5) {
                          return Promise.reject(new Error('Max 5 ip addresses allow'));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      <Col sm={24} xl={24}>
                        {fields.map((field, index) => (
                          <Form.Item
                            className={`${styles.formitem} mb-0`}
                            label={t('common.label.ipAddress', 'IP Address')}
                            key={field.key}
                          >
                            <div className={styles.rowIpAddress}>
                              <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    validator: async (_, value) => {
                                      if (!value) {
                                        return Promise.reject(new Error('Please input IP address'));
                                      }
                                      if (!ValidateIPaddress(value)) {
                                        return Promise.reject(new Error('Invaild IP address'));
                                      }
                                    },
                                    // required: true,
                                    // message: toLocal('common.validation.pleaseIPAddress', 'Please Enter IP Address')
                                  },
                                ]}
                                className={styles.ipAddress}
                              >
                                <Input />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => {
                                    remove(field.name);
                                  }}
                                />
                              ) : (
                                <div className="mt-15" />
                              )}
                            </div>
                          </Form.Item>
                        ))}
                      </Col>
                      <Col sm={12} xl={12}>
                        <Button
                          // type="dashed"
                          onClick={() => add()}
                          // className="d-flex"
                          disabled={fields.length >= 5}
                        >
                          <img src={AddRoundIcon} className="cursor-pointer mr-10" alt="" /> Add IP
                          Address
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Col>
                    </>
                  )}
                </Form.List>
              </div>
            </Col>
          </Row>
          */}
        </Col>
      </Row>
      {changepassword ? (
        <Row gutter={[15, 0]} align="middle">
          <Col xs={20}>
            <div className={`${styles.inputContainer}`}>
              <Form.Item
                label={t('common.label.changepassword', 'Change Password')}
                name="password"
                rules={[
                  {
                    required: changepassword,
                    message: t('common.validation.pleaseEnterPassword', 'Please Enter Password'),
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={4} style={{ paddingTop: 22 }}>
            <MinusCircleOutlined className="dynamic-delete-button" onClick={togglePassword} />
          </Col>
        </Row>
      ) : (
        ''
      )}

      <Row>
        {type === 'edit' ? (
          <Col span={24}>
            <Button type="primary" onClick={togglePassword} disabled={changepassword}>
              {t('common.label.changepassword', 'Change Password')}
            </Button>
          </Col>
        ) : (
          ''
        )}
        <Col span={24} className={`${styles.createBtn}`}>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            {saveBtnText}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdministratorsModalContent;
