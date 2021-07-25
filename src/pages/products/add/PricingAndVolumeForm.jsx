/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, Input, FormItem } from '@/components';
import styles from './AddProductPage.less';

const PricingAndVolumeForm = (props) => {
  const [formData, setFormData] = useState({
    retail_price: '',
    member_price: '',
    required_pc: '',
    required_sc: '',
    cost_of_goods: '',
    cv: '',
    pv: '',
    sku: '',
    keep_active_months: '',
    term_length: '',
    autoship_retail_price: '',
    autoship_member_price: '',
    max_order_quantity: '',
    max_autoship_quantity: '',
    max_personal_sales_quantity: '',
    first_order_bonus: '',
    fast_start_bonus: '',
    autoship_price: '',
  });

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.onFormData(field, value);
  };

  useEffect(() => {
    if (props.formData) {
      setFormData({
        retail_price: props.formData.retail_price,
        member_price: props.formData.member_price,
        required_pc: props.formData.required_pc,
        required_sc: props.formData.required_sc,
        cost_of_goods: props.formData.cost_of_goods,
        cv: props.formData.cv,
        pv: props.formData.pv,
        sku: props.formData.sku,
        keep_active_months: props.formData.keep_active_months,
        term_length: props.formData.term_length,
        autoship_retail_price: props.formData.autoship_retail_price,
        autoship_member_price: props.formData.autoship_member_price,
        max_order_quantity: props.formData.max_order_quantity,
        max_autoship_quantity: props.formData.max_autoship_quantity,
        max_personal_sales_quantity: props.formData.max_personal_sales_quantity,
        first_order_bonus: props.formData.first_order_bonus,
        fast_start_bonus: props.formData.fast_start_bonus,
        autoship_price: props.formData.autoship_price,
      });
    }
  }, [props.formData]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.cards}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">{t('pages.products.pricingVolume', 'Pricing and Volume')}</div>
            </Col>
          </Row>
          <Row gutter={[24, 15]} className={'mt-12 mb-12'}>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'* Member Price'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'member_price')}
              >
                <Input
                  name="member_price"
                  type="number"
                  value={formData.member_price}
                  onChange={(e) => onFormData('member_price', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'member_price').length > 0
                      ? styles.memberPriceError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'* Retail Price'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'retail_price')}
              >
                <Input
                  name="retail_price"
                  type="number"
                  value={formData.retail_price}
                  onChange={(e) => onFormData('retail_price', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'retail_price').length > 0
                      ? styles.retailPriceError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'Autoship Price (Optional)'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'autoship_price')}
              >
                <Input
                  name="autoship_price"
                  type="number"
                  value={formData.autoship_price}
                  onChange={(e) => onFormData('autoship_price', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'autoship_price').length > 0
                      ? styles.autoshipRetailPriceError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'* PV'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'pv')}
              >
                <Input
                  name="pv"
                  type="number"
                  value={formData.pv}
                  onChange={(e) => onFormData('pv', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'pv').length > 0
                      ? styles.pvError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'* CV'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'cv')}
              >
                <Input
                  name="cv"
                  type="number"
                  value={formData.cv}
                  onChange={(e) => onFormData('cv', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'cv').length > 0
                      ? styles.cvError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'Required PC (Optional)'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'required_pc')}
              >
                <Input
                  name="required_pc"
                  type="number"
                  value={formData.required_pc}
                  onChange={(e) => onFormData('required_pc', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'required_pc').length > 0
                      ? styles.cvError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'Required SC (Optional)'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'required_sc')}
              >
                <Input
                  name="required_sc"
                  type="number"
                  value={formData.required_sc}
                  onChange={(e) => onFormData('required_sc', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'required_sc').length > 0
                      ? styles.cvError
                      : ''
                  }
                />
              </FormItem>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'* SKU'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'sku')}
              >
                <Input
                  name="sku"
                  value={formData.sku}
                  onChange={(e) => onFormData('sku', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'sku').length > 0
                      ? styles.skuError
                      : ''
                  }
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <FormItem
                label={'* Cost'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'cost_of_goods')}
              >
                <Input
                  name="cost_of_goods"
                  type="number"
                  value={formData.cost_of_goods}
                  onChange={(e) => onFormData('cost_of_goods', e.target.value)}
                  className={
                    props.errorMessages.filter((el) => el.type === 'cost_of_goods').length > 0
                      ? styles.costError
                      : ''
                  }
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default PricingAndVolumeForm;
