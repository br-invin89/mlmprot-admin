import React, { useState } from 'react';
import { PageContainer } from '@/components';
import ConfigSubPage from './config/ConfigSubPage';
import MerchantsSubPage from './merchants/MerchantsSubPage';
import SubMenu from './SubMenu';
import './PaymentSettingsPage.less';

const PaymentSettingsPage = () => {
  const [tab, setTab] = useState('Merchants');

  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Merchants' && <MerchantsSubPage />}
      {tab === 'Config' && <ConfigSubPage />}
    </PageContainer>
  );
};

export default PaymentSettingsPage;
