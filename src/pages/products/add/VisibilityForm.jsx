/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, Checkbox, CheckboxGroup, FormItem } from '@/components';
import styles from './AddProductPage.less';
import { varOptions } from '@/common/var';

const userTypeOptions = varOptions('user.type');
const VisibilityForm = (props) => {
  const visibilityUserTypeOptions = userTypeOptions.map((item) => ({
    label: `Show to ${item.label}`,
    value: item.value,
  }));

  const [formData, setFormData] = useState({
    eligible_user_types: '',
    is_featured: 2,
    is_best_seller: 2,
    is_new: 2,
  });

  const [eligibleUserTypes, setEligibleUserTypes] = useState([]);

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
        eligible_user_types: props.formData.eligible_user_types,
        is_featured: props.formData.is_featured,
        is_best_seller: props.formData.is_best_seller,
        is_new: props.formData.is_new,
      });

      if (props.formData.eligible_user_types) {
        const eligibleUserTypes0 = [];
        for (const type of props.formData.eligible_user_types) {
          eligibleUserTypes0.push(type * 1);
        }
        setEligibleUserTypes(eligibleUserTypes0);
      }
    }
  }, [props.formData]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">
                {t("pages.products.visibility", "Visibility")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24}>
              <Checkbox
                className={styles.visibilityCheckbox}
                label={
                  t("pages.products.featuredProduct", "Featured Product")
                }
                name="is_featured"
                checked={formData.is_featured === 1}
                onChange={(e) => onFormData('is_featured', e.target.checked ? 1 : 2)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24}>
              <Checkbox
                className={styles.visibilityCheckbox}
                label={
                  t("pages.products.newArrivalProduct", "New Arrival Product")
                }
                name="is_new"
                checked={formData.is_new === 1}
                onChange={(e) => onFormData('is_new', e.target.checked ? 1 : 2)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24}>
              <Checkbox
                className={styles.visibilityCheckbox}
                label={
                  t("pages.products.bestSellerProduct", "Best Selling Product")
                }
                name="is_best_seller"
                checked={formData.is_best_seller === 1}
                onChange={(e) => onFormData('is_best_seller', e.target.checked ? 1 : 2)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <FormItem
                errorMessages={props.errorMessages.filter(
                  (el) => el.type === "eligible_user_types",
                )}
              >
                <CheckboxGroup
                  className="mb-12 product-usertype"
                  options={visibilityUserTypeOptions}
                  value={eligibleUserTypes}
                  onChange={(values) => {
                    onFormData("eligible_user_types", values.join(','));
                    setEligibleUserTypes(values);
                  }}
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default VisibilityForm;
