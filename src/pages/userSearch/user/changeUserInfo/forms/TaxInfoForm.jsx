import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Input, Select, Row, Col, Button, notification, Spin, FormItem } from '@/components';
import styles from '../UserInfoSubPage.less';
import { stateOptions } from '@/utils/country';
import { varOptions } from '@/common/var';
import { updateUserTaxFormApi } from '@/services/userSearch/changeUser';

const userTaxFormTypeOptions = varOptions('userTaxForm.type');
const userTaxFormStatusOptions = varOptions('userTaxForm.status');
export default function TaxInfoForm(props) {
  const [formData, setFormData] = useState({
    type: 1,
    first_name: '',
    middle_name: '',
    last_name: '',
    business_name: '',
    ssn_tax_id: '',
    phone: '',
    email: '',
    address: '',
    address_line2: '',
    state: '',
    city: '',
    zip_code: '',
    status: 1,
  });
  const [ssnTaxIdChanged, setSsnTaxIdChanged] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const onDoneUpdate = () => {
    notification.success({
      message: 'Success',
      description: 'Tax info form updated successfully.',
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
    if (!formData.type) {
      errorMessages0.push({ type: 'type', message: 'Please input shipping type' });
      isValid = false;
    }
    if (ssnTaxIdChanged && !formData.ssn_tax_id) {
      errorMessages0.push({ type: 'ssn_tax_id', message: 'Please input tax/ssn id' });
      isValid = false;
    }
    if (formData.type === 1) {
      if (!formData.first_name) {
        errorMessages0.push({ type: 'first_name', message: 'Please input first name' });
        isValid = false;
      }
      // if (!formData.middle_name) {
      //   errorMessages0.push({ type: 'middle_name', message: 'Please input middle name' });
      //   isValid = false;
      // }
      if (!formData.last_name) {
        errorMessages0.push({ type: 'last_name', message: 'Please input last name' });
        isValid = false;
      }
    }
    if (formData.type === 2) {
      if (!formData.business_name) {
        errorMessages0.push({ type: 'business_name', message: 'Please input business name' });
        isValid = false;
      }
    }
    if (!formData.phone) {
      errorMessages0.push({ type: 'phone', message: 'Please input phone' });
      isValid = false;
    }
    if (!formData.status) {
      errorMessages0.push({ type: 'status', message: 'Please Select Status' });
      isValid = false;
    }
    if (!formData.address) {
      errorMessages0.push({ type: 'address', message: 'Please input address' });
      isValid = false;
    }
    if (!formData.state) {
      errorMessages0.push({ type: 'state', message: 'Please input state' });
      isValid = false;
    }
    if (!formData.city) {
      errorMessages0.push({ type: 'city', message: 'Please input city' });
      isValid = false;
    }
    if (!formData.zip_code) {
      errorMessages0.push({ type: 'zip_code', message: 'Please input zip code' });
      isValid = false;
    }
    setErrorMessages(errorMessages0);
    return isValid;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
    setIsUpdating(true);
    const data = {
      ...formData,
    };
    data.ssn_tax_id = null;
    updateUserTaxFormApi(props.userData.id, data, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    if (!props.data) return;
    setFormData({
      type: props.data.type,
      status: props.data && props.data.status ? Number(props.data.status) : 1,
      first_name: props.data.first_name,
      middle_name: props.data.middle_name,
      last_name: props.data.last_name,
      business_name: props.data.business_name,
      ssn_tax_id: `******${props.data.last_2_ssn}`,
      phone: props.data.phone,
      address: props.data.address,
      address_line2: props.data.address_line2,
      state: props.data.state,
      city: props.data.city,
      zip_code: props.data.zip_code,
    });
  }, [props.data]);

  return (
    <div className={styles.formContainer}>
      <Row>
        <Col>
          <div className={`${styles.userTitle}`}>
            {t('pages.userSearch.taxInfoForm', 'Tax Info')}
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.Type', 'Type')}
              errorMessages={errorMessages.filter((el) => el.type === 'type')}
            >
              <Select
                value={formData.type}
                onChange={(v) => setFormData({ ...formData, type: v })}
                options={userTaxFormTypeOptions}
              />
            </FormItem>
          </div>
        </Col>
        {formData.type === 1 && (
          <>
            <Col xs={24} sm={12} md={6} lg={6}>
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
            <Col xs={24} sm={12} md={6} lg={6}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={t('pages.userSearch.middleName', 'Middle Name')}
                  // errorMessages={errorMessages.filter((el) => el.type === 'middle_name')}
                >
                  <Input
                    value={formData.middle_name}
                    onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                  />
                </FormItem>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
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
          </>
        )}
        {formData.type === 2 && (
          <>
            <Col xs={24} sm={12} md={6} lg={6}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={t('pages.userSearch.businessName', 'Business Name')}
                  errorMessages={errorMessages.filter((el) => el.type === 'business_name')}
                >
                  <Input
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  />
                </FormItem>
              </div>
            </Col>
          </>
        )}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.ssnTaxId', 'SSN/Tax ID')}
              errorMessages={errorMessages.filter((el) => el.type === 'ssn_tax_id')}
            >
              <Input
                value={formData.ssn_tax_id}
                disabled
                onChange={(e) => {
                  setFormData({ ...formData, ssn_tax_id: e.target.value });
                  setSsnTaxIdChanged(true);
                }}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.phone', 'Phone')}
              errorMessages={errorMessages.filter((el) => el.type === 'phone')}
            >
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.status', 'Status')}
              errorMessages={errorMessages.filter((el) => el.type === 'status')}
            >
              <Select
                value={formData.status}
                onChange={(v) => setFormData({ ...formData, status: v })}
                options={userTaxFormStatusOptions}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.address', 'Address Line 1')}
              errorMessages={errorMessages.filter((el) => el.type === 'address')}
            >
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.addressLine2', 'Address Line 2')}
              errorMessages={errorMessages.filter((el) => el.type === 'address_line2')}
            >
              <Input
                value={formData.address_line2}
                onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={4}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.state', 'State/Province')}
              errorMessages={errorMessages.filter((el) => el.type === 'state')}
            >
              <Select
                value={formData.state}
                onChange={(v) => setFormData({ ...formData, state: v })}
                options={stateOptions('US')}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={4}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.city', 'City')}
              errorMessages={errorMessages.filter((el) => el.type === 'city')}
            >
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={4}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.userSearch.zipCode', 'Zip/Postal Code')}
              errorMessages={errorMessages.filter((el) => el.type === 'zip_code')}
            >
              <Input
                value={formData.zip_code}
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
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
  );
}
