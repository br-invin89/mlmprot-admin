import React, { useState } from 'react';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import ProductSubPage from './products/ProductSubPage';
import UsersSubPage from './users/UsersSubPage';

const ImportPage = () => {
  const [tab, setTab] = useState('Products');

  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Products' && <ProductSubPage />}
      {tab === 'Users' && <UsersSubPage />}
    </PageContainer>
  );
};

export default ImportPage;
