/* eslint-disable no-undef */
/* eslint-disable no-empty */
import React from 'react';
import { Card, PageContainer } from '@/components';
import styles from './ProductSubPage.less';
import UploadProducts from './UploadProducts';
import UploadBenefits from './UploadBenefits';
import UploadDetails from './UploadDetails';

const ProductSubPage = () => {
  return (
    <PageContainer>
      <div className="page-content tools-container" style={{ marginTop: -8 }}>
        <Card className={`${styles.card}`}>
          <UploadProducts />
          <div className={styles.divider} />
          <UploadBenefits />
          <div className={styles.divider} />
          <UploadDetails />
        </Card>
      </div>
    </PageContainer>
  );
};

export default ProductSubPage;
