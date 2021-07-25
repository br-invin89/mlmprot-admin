/* eslint-disable no-undef */
/* eslint-disable no-empty */
import React from 'react';
import { Card, PageContainer } from '@/components';
import styles from './UsersSubPage.less';
import UploadUsers from './UploadUsers';

const UsersSubPage = () => {
  return (
    <PageContainer>
      <div className="page-content tools-container" style={{ marginTop: -8 }}>
        <Card className={`${styles.card}`}>
          <UploadUsers />
        </Card>
      </div>
    </PageContainer>
  );
};

export default UsersSubPage;
