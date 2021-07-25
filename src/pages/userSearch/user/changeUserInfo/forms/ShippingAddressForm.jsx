import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Input, Select, Row, Col, FormItem, Button, Spin, notification } from '@/components';
import styles from '../UserInfoSubPage.less';
import { countryOptions, stateOptions as stateOptionsFunc } from '@/utils/country';
import { updateUserShippingDetailApi } from '@/services/userSearch/changeUser';

export default function ShippingAddressForm(props) {
  const [formData, setFormData] = useState({
    shipping_country: '',
    shipping_state: '',
    shipping_city: '',
    shipping_zipcode: '',
    shipping_address: '',
    shipping_address_line2: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const onDoneUpdate = () => {
    notification.success({
      message: 'Success',
      description: 'Shipping information updated successfully.',
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
    if (!formData.shipping_country) {
      errorMessages0.push({ type: 'shipping_country', message: 'Please input shipping country' });
      isValid = false;
    }
    if (!formData.shipping_state) {
      errorMessages0.push({ type: 'shipping_state', message: 'Please input shipping state' });
      isValid = false;
    }
    if (!formData.shipping_city) {
      errorMessages0.push({ type: 'shipping_city', message: 'Please input shipping city' });
      isValid = false;
    }
    if (!formData.shipping_zipcode) {
      errorMessages0.push({ type: 'shipping_zipcode', message: 'Please input shipping zipcode' });
      isValid = false;
    }
    if (!formData.shipping_address) {
      errorMessages0.push({ type: 'shipping_address', message: 'Please input shipping address' });
      isValid = false;
    }
    setErrorMessages(errorMessages0);
    return isValid;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
    setIsUpdating(true);
    updateUserShippingDetailApi(props.userData.id, formData, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    if (!props.data) return;
    setFormData({
      shipping_country: props.data.shipping_country,
      shipping_state: props.data.shipping_state,
      shipping_city: props.data.shipping_city,
      shipping_zipcode: props.data.shipping_zipcode,
      shipping_address: props.data.shipping_address,
      shipping_address_line2: props.data.shipping_address_line2,
    });
  }, [props.data]);

  useEffect(() => {
    if (formData.shipping_country) setStateOptions(stateOptionsFunc(formData.shipping_country));
  }, [formData.shipping_country]);

  return (
    <>
      <div className={styles.formContainer}>
        <Row>
          <Col>
            <div className={`${styles.userTitle}`}>
              {t('pages.userSearch.shippingAddress', 'Shipping Address')}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.Address', 'Address Line 1')}
                errorMessages={errorMessages.filter((el) => el.type === 'shipping_address')}
              >
                <Input
                  value={formData.shipping_address}
                  onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.AddressLine2', 'Address Line 2')}
                errorMessages={errorMessages.filter((el) => el.type === 'shipping_address_line2')}
              >
                <Input
                  value={formData.shipping_address_line2}
                  onChange={(e) =>
                    setFormData({ ...formData, shipping_address_line2: e.target.value })
                  }
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.Country', 'Country')}
                errorMessages={errorMessages.filter((el) => el.type === 'shipping_country')}
              >
                <Select
                  value={formData.shipping_country}
                  onChange={(v) => setFormData({ ...formData, shipping_country: v })}
                  options={countryOptions()}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.State', 'State/Province')}
                errorMessages={errorMessages.filter((el) => el.type === 'shipping_state')}
              >
                <Select
                  value={formData.shipping_state}
                  onChange={(v) => setFormData({ ...formData, shipping_state: v })}
                  options={stateOptions}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.City', 'City')}
                errorMessages={errorMessages.filter((el) => el.type === 'shipping_city')}
              >
                <Input
                  value={formData.shipping_city}
                  onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className={`${styles.inputContainer}`}>
              <FormItem
                label={t('pages.userSearch.ZipPostalCode', 'Zip/Postal Code')}
                errorMessages={errorMessages.filter((el) => el.type === 'shipping_zipcode')}
              >
                <Input
                  value={formData.shipping_zipcode}
                  onChange={(e) => setFormData({ ...formData, shipping_zipcode: e.target.value })}
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
}
