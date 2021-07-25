import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input } from '@/components';
import { t } from '@/utils/label';
import styles from './AddProductPage.less';

const TaxForm = (props) => {
  const [formData, setFormData] = useState({
    tax_code: '',
  });

  const onFormData = (field, value) => {
    if (value !== ' ') {
      setFormData({
        ...formData,
        [field]: value,
      });
      props.onFormData(field, value);
    }
  };

  useEffect(() => {
    if (props.formData) {
      setFormData({
        tax_code: props.formData.tax_code,
      });
    }
  }, [props.formData]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">
                {t("pages.products.tax", "Tax")}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>Tax Code (Optional)</div>
                <Input
                  value={formData.tax_code}
                  onChange={(e) => onFormData('tax_code', e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default TaxForm;
