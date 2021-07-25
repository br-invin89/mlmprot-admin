/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, PageContainer, SuccessNotification, message } from '@/components';
import ProductDetailsForm from './ProductDetailsForm';
import PricingAndVolumeForm from './PricingAndVolumeForm';
import ShippingForm from './ShippingForm';
import TaxForm from './TaxForm';
import VisibilityForm from './VisibilityForm';
import styles from './AddProductPage.less';
import { createProductApi } from '@/services/products/product';
import { t } from '@/utils/label';

const AddProductPage = ({ history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdf_link: '',
    subtitle: '',
    priority: '',
    image: undefined,
    thumbnails: [],
    retail_price: '',
    member_price: '',
    cost_of_goods: '',
    pv: '',
    cv: '',
    sku: '',
    autoship_price: '',
    is_digital: 2,
    tax_code: '',
    general_shipping_price: '',
    shipping_prices: [],
    is_pc: 2,
    is_tc: 2,
    is_sample: 2,
    required_pc: '',
    required_sc: '',
    pc_amount: '',
    sc_amount: '',
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onFormData = (field, value) => {
    const formData0 = {
      ...formData,
      [field]: value,
    };
    let errorMessage = null;
    if (field === 'title') {
      if (value.trim().length < 4) {
        errorMessage = { type: 'title', message: 'Title should be input at least 4 characters' };
      }
    }

    if (field === 'priority') {
      if (!value) {
        errorMessage = { type: 'priority', message: 'Required' };
      }
      if (value <= 0) {
        errorMessage = { type: 'priority', message: 'Value should be greater than 0' };
      }
    }

    if (field === 'thumbnails') {
      if (!value) {
        errorMessage = { type: 'thumbnails', message: 'Required' };
      }
    }

    if (field === 'image') {
      if (!value) {
        errorMessage = { type: 'image', message: 'Required' };
      }
    }
    if (field === 'retail_price') {
      if (value === '') {
        errorMessage = { type: 'retail_price', message: 'Required' };
      }
    }

    if (field === 'member_price') {
      if (value === '') {
        errorMessage = { type: 'member_price', message: 'Required' };
      }
    }

    if (field === 'cost_of_goods') {
      if (!value) {
        errorMessage = { type: 'cost_of_goods', message: 'Required' };
      }
    }

    if (field === 'cv') {
      if (!value) {
        errorMessage = { type: 'cv', message: 'Required' };
      }
    }

    if (field === 'pv') {
      if (value === '') {
        errorMessage = { type: 'pv', message: 'Required' };
      }
    }
    if (field === 'general_shipping_price') {
      if (value === '') {
        errorMessage = { type: 'general_shipping_price', message: 'Required' };
      }
    }

    if (field === 'sku') {
      if (value === '') {
        errorMessage = { type: 'sku', message: 'Required' };
      }
    }

    if (errorMessage === null) {
      setErrorMessages([]);
    } else {
      setErrorMessages([errorMessage]);
    }
    setFormData(formData0);
  };

  const onCreateProduct = (res) => {
    SuccessNotification(res.message);
    history.push('/products/list');
    setIsLoading(false);
  };

  const onFailCreateProduct = (data, response) => {
    setIsLoading(false);
  };

  function validateForm() {
    let flag = false;
    let errorMessages0 = [...errorMessages];
    if (formData.title.length < 4) {
      if (errorMessages0.filter((el) => el.type === 'title').length === 0)
        errorMessages0.push({
          type: 'title',
          message: 'Title should be input at least 4 characters',
        });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'title').slice();
    }
    if (!formData.image) {
      if (errorMessages0.filter((el) => el.type === 'image').length === 0)
        errorMessages0.push({ type: 'image', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'image').slice();
    }

    if (!formData.priority) {
      if (errorMessages0.filter((el) => el.type === 'priority').length === 0)
        errorMessages0.push({ type: 'priority', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'priority').slice();
    }

    if (formData.required_pc === 1 && !formData.pc_amount) {
      if (errorMessages0.filter((el) => el.type === 'pc_amount').length === 0)
        errorMessages0.push({ type: 'pc_amount', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'pc_amount').slice();
    }

    if (formData.required_sc === 1 && !formData.sc_amount) {
      if (errorMessages0.filter((el) => el.type === 'sc_amount').length === 0)
        errorMessages0.push({ type: 'sc_amount', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'sc_amount').slice();
    }

    if (!formData.retail_price) {
      if (errorMessages0.filter((el) => el.type === 'retail_price').length === 0)
        errorMessages0.push({ type: 'retail_price', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'retail_price').slice();
    }

    if (!formData.member_price) {
      if (errorMessages0.filter((el) => el.type === 'member_price').length === 0)
        errorMessages0.push({ type: 'member_price', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'member_price').slice();
    }

    if (formData.is_digital === 2) {
      if (!formData.general_shipping_price) {
        if (errorMessages0.filter((el) => el.type === 'general_shipping_price').length === 0)
          errorMessages0.push({ type: 'general_shipping_price', message: 'Required' });
        flag = true;
      } else {
        errorMessages0 = errorMessages0
          .filter((el) => el.type !== 'general_shipping_price')
          .slice();
      }
    }

    if (!formData.cost_of_goods) {
      if (errorMessages0.filter((el) => el.type === 'cost_of_goods').length === 0)
        errorMessages0.push({ type: 'cost_of_goods', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'cost_of_good').slice();
    }

    if (!formData.pv) {
      if (errorMessages0.filter((el) => el.type === 'pv').length === 0)
        errorMessages0.push({ type: 'pv', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'pv').slice();
    }

    if (!formData.cv) {
      if (errorMessages0.filter((el) => el.type === 'cv').length === 0)
        errorMessages0.push({ type: 'cv', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'cv').slice();
    }

    if (!formData.sku) {
      if (errorMessages0.filter((el) => el.type === 'sku').length === 0)
        errorMessages0.push({ type: 'sku', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'sku').slice();
    }

    setErrorMessages(errorMessages0);
    return flag;
  }

  const handleSubmit = () => {
    if (validateForm()) {
      if (errorMessages[0]) {
        message.error(errorMessages[0].message);
      }
      return;
    }
    setIsLoading(true);

    let requestData = { ...formData };
    requestData.image = formData.image && formData.image.preview ? formData.image.preview : null;
    let thumbnails = [];
    formData.thumbnails.map((item) => {
      thumbnails.push(item.preview);
    });
    requestData.thumbnails = thumbnails;

    if (!requestData.tax_code) {
      delete requestData.tax_code;
    }

    if (requestData.is_digital === 1 && !requestData.general_shipping_price) {
      delete requestData.general_shipping_price;
    }
    createProductApi(requestData, onCreateProduct, onFailCreateProduct);
  };

  return (
    <PageContainer isLoading={isLoading}>
      <Row gutter={[15, 15]}>
        <Col xl={24}>
          <Row gutter={[15, 15]} className="product-container">
            <Col span={24}>
              <ProductDetailsForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>
            <Col span={24}>
              <PricingAndVolumeForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>

            <Col span={24}>
              <ShippingForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>
            <Col span={24}>
              <TaxForm formData={formData} onFormData={onFormData} errorMessages={errorMessages} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className={styles.productActionBtn}>
        <Col xs={24} sm={24} xl={24}>
          <Button type="primary" onClick={handleSubmit} loading={isLoading}>
            {t('pages.products.addProduct', 'Save Product')}
          </Button>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default withRouter(AddProductPage);
