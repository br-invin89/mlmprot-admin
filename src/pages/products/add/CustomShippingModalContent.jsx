/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Select, OutlineBtn, FormItem, Popconfirm, message } from '@/components';
import { countryOptions } from '@/utils/country';
import { ReactComponent as DeleteIcon } from '@/assets/icons/deleteRed.svg';
import { ReactComponent as AddIcon } from '@/assets/icons/addRound.svg';
import styles from './AddProductPage.less';
import { t } from '@/utils/label';

export default function CustomShippingModalContent(props) {
  const [shippingPrices, setShippingPrices] = useState([]);

  const onChangeData = (index, field, value) => {
    if (value !== ' ') {
      const shippingPrices0 = [...shippingPrices];
      const priceRow = shippingPrices0[index];
      priceRow[field] = value;
      setShippingPrices(shippingPrices0);
    }
  };

  const handleSave = () => {
    for (const priceRow of shippingPrices) {
      if (
        !priceRow.country ||
        !priceRow.units_start ||
        !priceRow.units_end ||
        !priceRow.shipping_price
      ) {
        message.error('Please input all input fields');
        return;
      }
      if (priceRow.units_start <= 0 || priceRow.units_end <= 0 || priceRow.shipping_price <= 0) {
        message.error('Units Start, Units Until and Shipping Price should be greater than 0');
        return;
      }
    }
    const shippingPrices0 = props.shipping_prices.filter(
      (el) => el.dist_center_id !== props.dist_center_id,
    );
    for (const priceRow of shippingPrices) {
      shippingPrices0.push(priceRow);
    }
    props.onFormData('shipping_prices', shippingPrices0);
    setShippingPrices([]);
    props.toggle();
  };

  const addRow = () => {
    const shippingPrices0 = [...shippingPrices];
    shippingPrices0.push({
      dist_center_id: props.dist_center_id,
      country: '',
      units_start: '',
      units_end: '',
      shipping_price: '',
    });
    setShippingPrices(shippingPrices0);
  };
  const removeRow = (index) => {
    const shippingPrices0 = shippingPrices.filter((_, index2) => index2 !== index);
    setShippingPrices(shippingPrices0);
  };

  useEffect(() => {
    const shippingPrices0 = [
      ...props.shipping_prices.filter((el) => el.dist_center_id === props.dist_center_id),
    ];

    if (shippingPrices0.length === 0) {
      shippingPrices0.push({
        dist_center_id: props.dist_center_id,
        country: '',
        units_start: '',
        units_end: '',
        shipping_price: '',
      });
    }
    setShippingPrices(shippingPrices0);
  }, [props.shipping_prices, props.dist_center_id, props.showEdit]);

  return (
    <div
      className={styles.shippingContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {shippingPrices.map((el, index) => (
        <Row gutter={[15, 0]} key={index}>
          <Col xs={12} sm={8}>
            <div className={`${styles.inputContainer}`}>
              <FormItem label={t('pages.products.deliveryCountry', '*Delivery Country')}>
                <Select
                  options={countryOptions()}
                  value={shippingPrices[index].country}
                  onChange={(v) => onChangeData(index, 'country', v)}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={12} sm={4}>
            <div className={`${styles.inputContainer}`}>
              <FormItem label={t('pages.products.units_start', '*Units Start')}>
                <Input
                  value={shippingPrices[index].units_start}
                  onChange={(e) => onChangeData(index, 'units_start', e.target.value)}
                  type="number"
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={12} sm={4}>
            <div className={`${styles.inputContainer}`}>
              <FormItem label={t('pages.products.units_end', '*Units Until')}>
                <Input
                  value={shippingPrices[index].units_end}
                  onChange={(e) => onChangeData(index, 'units_end', e.target.value)}
                  type="number"
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={10} sm={6}>
            <div className={`${styles.inputContainer}`}>
              <FormItem label={t('pages.products.shippingPrice', '*Shipping Price')}>
                <Input
                  value={shippingPrices[index].shipping_price}
                  onChange={(e) => onChangeData(index, 'shipping_price', e.target.value)}
                  type="number"
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={2} sm={2} className={styles.iconCol}>
            {shippingPrices.length - 1 === index ? (
              <AddIcon onClick={addRow} style={{ cursor: 'pointer', marginRight: 12 }} />
            ) : (
              <DeleteIcon onClick={() => removeRow(index)} style={{ cursor: 'pointer' }} />
            )}
          </Col>
        </Row>
      ))}
      <Row gutter={[15, 0]} justify="center">
        <Col span={24} className={`${styles.inputBtn}`}>
          <Popconfirm onConfirm={handleSave}>
            <OutlineBtn htmlType="submit">{t('common.label.save', 'Save')}</OutlineBtn>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
}
