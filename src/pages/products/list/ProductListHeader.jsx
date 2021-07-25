/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { withRouter } from 'react-router-dom';
import { Row, Col, OutlineBtn, SearchInput } from '@/components';
import styles from './ProductsPage.less';
import { Link } from 'react-router-dom';

const ProductListHeader = ({ handleSearchData, history }) => {
  let delayDebounceFn = null;
  const handleOnChange = (e) => {
    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => {
      handleSearchData(e.target.value);
    }, 1000);
  };
  return (
    <>
      <Row gutter={[15, 5]} className="mb-15" align="middle">
        <Col xs={24} sm={12} lg={12}>
          <SearchInput
            className={`${styles.searchProducts}`}
            type="text"
            onChange={handleOnChange}
            placeholder="Search Products"
          />
        </Col>
        <Col xs={24} sm={12}  lg={12} className={styles.addProductBtn}>
          <OutlineBtn onClick={() => history.push('/products/add')} className="ant-btn ant-btn-primary">
            {t("pages.products.addProduct", "Add Product")}
          </OutlineBtn>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(ProductListHeader);
