/* eslint-disable no-script-url */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import {
  FormItem,
  Input,
  OutlineBtn,
  Checkbox,
  Row,
  Col,
  StartEndDatePicker,
  MultiSelect,
  CheckboxGroup,
} from '@/components';
import styles from './PromotionsPage.less';
import moment from 'moment';
import { varOptions } from '@/common/var';
import { t } from '@/utils/label';

const userTypeOptions = varOptions('user.type');

const PromotionsModalContent = ({ data, onSave, saveBtnText, productList }) => {
  const [formData, setFormData] = useState({
    name: '',
    discount_code: '',
    discount_value: '',
    // discount_pv: 0,
    // discount_cv: 0,
    discount_type: 2,
    eligible_user_types: '',
    discount_applicable_to: 1,
    product_ids: '',
    start_at: '',
    end_at: '',
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eligibleUserTypes, setEligibleUserTypes] = useState([]);
  // const [discountApplyTo, setDiscountApplyTo] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const onChangeDate = (v) => {
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      setFormData({
        ...formData,
        start_at: moment(v[0]).format('YYYY-MM-DD'),
        end_at: moment(v[1]).format('YYYY-MM-DD'),
      });
    } else {
      setStartDate('');
      setEndDate('');
      setFormData({
        ...formData,
        start_at: '',
        end_at: '',
      });
    }
  };

  const onSaveSuccess = () => {
    setIsUpdating(false);
    setFormData({
      name: '',
      discount_code: '',
      discount_value: '',
      // discount_pv: 0,
      // discount_cv: 0,
      discount_type: 2,
      eligible_user_types: '',
      discount_applicable_to: 1,
      product_ids: '',
      start_at: '',
      end_at: '',
    });
    setStartDate('');
    setEndDate('');
    // setDiscountApplyTo(1);
    setEligibleUserTypes([]);
    setSelectedProductIds([]);
  };

  const onSaveError = () => {
    setIsUpdating(false);
  };

  const getProductsList = () => {
    return productList.map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    });
  };

  const validateForm = () => {
    const errorMessages0 = [];
    let isValid = true;
    if (!formData.name) {
      errorMessages0.push({
        name: 'name',
        message: 'Please input name',
      });
      isValid = false;
    }
    if (!formData.discount_code) {
      errorMessages0.push({
        name: 'discount_code',
        message: 'Please input discount code',
      });
      isValid = false;
    }
    const regex = /^[a-zA-Z0-9_]*$/i;
    if (regex.exec(formData.discount_code) == null) {
      errorMessages0.push({
        name: 'discount_code',
        message: 'Please input discount code as alphanumeric',
      });
      isValid = false;
    }
    if (!formData.discount_value) {
      errorMessages0.push({
        name: 'discount_value',
        message: 'Please input discount value',
      });
      isValid = false;
    }
    // if (formData.discount_pv === '') {
    //   errorMessages0.push({
    //     name: 'discount_pv',
    //     message: 'Please input discount pv',
    //   });
    //   isValid = false;
    // }
    // if (formData.discount_cv === '') {
    //   errorMessages0.push({
    //     name: 'discount_cv',
    //     message: 'Please input discount cv',
    //   });
    //   isValid = false;
    // }
    if (!formData.discount_type) {
      errorMessages0.push({
        name: 'discount_type',
        message: 'Please input discount type',
      });
      isValid = false;
    }
    if (!formData.start_at || !formData.end_at) {
      errorMessages0.push({
        name: 'date_range',
        message: 'Please input start date & end date',
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
    if (!formData.product_ids) {
      errorMessages0.push({
        name: 'product_ids',
        message: 'Please select products',
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
      if (data.eligible_user_types) {
        const eligibleUserTypes0 = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const type of data.eligible_user_types) {
          eligibleUserTypes0.push(type * 1);
        }
        setEligibleUserTypes(eligibleUserTypes0);
      }
      if (data.products) {
        const productIds0 = [];
        let productIds = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const product of data.products) {
          productIds0.push(product.id * 1);
          productIds = `${productIds},${product.id}`;
        }
        const formData0 = {
          ...data,
          eligible_user_types: data.eligible_user_types.join(','),
          product_ids: productIds.slice(1),
        };
        setFormData(formData0);
        setSelectedProductIds(productIds0);
      }
      if (data.start_at) {
        setStartDate(moment(data.start_at));
      }
      if (data.end_at) {
        setEndDate(moment(data.end_at));
      }
    }
  }, [data]);

  return (
    <div className={styles.modalContainer}>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputLabel}`}
              label={t('common.table.promotionName', 'Promotion Name')}
              errorMessages={errorMessages.filter((el) => el.name === 'name')}
            >
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'name')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputLabel}`}
              label={t('pages.promotions.promotionCode', 'Promotion Code')}
              errorMessages={errorMessages.filter((el) => el.name === 'discount_code')}
            >
              <Input
                value={formData.discount_code}
                onChange={(e) => setFormData({ ...formData, discount_code: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'discount_code')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 0]} className={styles.checkboxContainer}>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputLabel}`}
              label={t('pages.promotions.discountPrice', 'Discount Price')}
              errorMessages={errorMessages.filter((el) => el.name === 'discount_value')}
            >
              <Input
                type="number"
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'discount_value')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
        <Col span={12} className={`align-items-center d-flex ${styles.checked}`}>
          <FormItem
            className="mt-12 mb-0"
            errorMessages={errorMessages.filter((el) => el.name === 'discount_type')}
          >
            <Checkbox
              checked={formData.discount_type === 1}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData({ ...formData, discount_type: 1 });
                } else {
                  setFormData({ ...formData, discount_type: 2 });
                }
              }}
              label={t('pages.promotions.discountType', 'Fixed Amount')}
              className={`${styles.discountTypeContainer}`}
            />
          </FormItem>
        </Col>
      </Row>
      {/* <Row gutter={[24, 0]}>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputLabel}`}
              label={t('pages.promotions.discountPv', 'Discount PV')}
              errorMessages={errorMessages.filter((el) => el.name === 'discount_pv')}
            >
              <Input
                type="number"
                value={formData.discount_pv}
                onChange={(e) => setFormData({ ...formData, discount_pv: e.target.value })}
              />
            </FormItem>
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputLabel}`}
              label={t('pages.promotions.discountCv', 'Discount CV')}
              errorMessages={errorMessages.filter((el) => el.name === 'discount_cv')}
            >
              <Input
                type="number"
                value={formData.discount_cv}
                onChange={(e) => setFormData({ ...formData, discount_cv: e.target.value })}
              />
            </FormItem>
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col span={24} className={`${styles.inputContainer}`}>
          <FormItem
            className={`${styles.inputContainer}`}
            label={t('common.label.userType', 'User Type')}
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
        <Col span={12} className={`${styles.inputContainer}`}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputContainer}`}
              label={t('app.settings.basic.Period', 'Period')}
              errorMessages={errorMessages.filter((el) => el.name === 'date_range')}
            >
              <StartEndDatePicker
                style={{ width: '100%' }}
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDate}
                className={(errorMessages.filter((el) => el.name === 'discount_value')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={`${styles.inputContainer}`}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className={`${styles.inputContainer} mt-0 mb-10`}
              label={t('common.label.selectProducts', 'Select Products')}
              errorMessages={errorMessages.filter((el) => el.name === 'product_ids')}
            >
              <MultiSelect
                options={getProductsList()}
                onChange={(values) => {
                  setFormData({ ...formData, product_ids: values.join(',') });
                  setSelectedProductIds(values);
                }}
                value={selectedProductIds}
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

export default PromotionsModalContent;
