/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col, AddEditModal } from '@/components';
import { t } from '@/utils/label';
import BackofficeModalContent from './BackofficeModalContent';
import styles from './BackofficeSubPage.less';

const BackofficeSubPageHeader = (props) => {
  return (
    <>
      <Row gutter={[15, 5]} className="mb-15" align="middle">
        <Col span={24} className={styles.addProductBtn}>
          <AddEditModal
            triggerLabel={t(
              'pages.products.addProductAvailability',
              'Add Product Availability',
            )}
            triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
            modalTitle={t(
              'pages.products.addProductAvailability',
              'Add Product Availability',
            )}
            hideIcon
            toggle={props.toggle}
            open={props.open}
            width="450px"
          >
            <BackofficeModalContent
              paginationParam={props.paginationParam}
              searchParam={props.searchParam}
              loadTable={props.loadTable}
              toggle={props.toggle}
              allProductsOption={props.allProductsOption}
            />
          </AddEditModal>
        </Col>
      </Row>
    </>
  );
};

export default BackofficeSubPageHeader;
