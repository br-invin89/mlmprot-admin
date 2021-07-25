import React from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, Input, Select, Button } from '@/components';
import styles from './AddProductPage.less';

const CollectionsForm = ({ handleChange, formError }) => {
  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">
                {t("pages.products.collections", "Collections")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>Collection</div>
                <Select
                  name="collection"
                  onChange={handleChange}
                  error={formError.collection}
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-7">
            <Col xs={24} sm={24} className="d-flex align-items-center">
              <div className="label">
                {t("pages.products.orCreateCollectionText", "or Create a Collection")}
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>Name</div>
                <Input />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} xl={24}>
              <Button tytpe="primary" className={`${styles.collectionCreateBtn}`}>
                Create
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default CollectionsForm;
