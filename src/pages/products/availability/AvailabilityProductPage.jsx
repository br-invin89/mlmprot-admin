import React, { useState } from 'react';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import AutoshipSubPage from './autoship/AutoshipSubPage'
import EnrollmentSubPage from './enrollment/EnrollmentSubPage'
import BackofficeShopSubPage from './backofficeShop/BackofficeSubPage'
import CreditWalletSubPage from './creditWallet/CreditWalletSubPage'

const AvailabilityProductPage = () => {
  const [tab, setTab] = useState('Autoship');

  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Autoship' && <AutoshipSubPage />}
      {tab === 'Enrollment' && <EnrollmentSubPage />}
      {tab === 'Backoffice Shop' && <BackofficeShopSubPage />}
      {tab === 'Credit Wallet' && <CreditWalletSubPage />}
    </PageContainer>
  );
};

export default AvailabilityProductPage;
