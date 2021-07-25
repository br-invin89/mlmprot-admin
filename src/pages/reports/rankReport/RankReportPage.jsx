import React, { useState } from 'react';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import CurrentSubPage from './current/CurrentSubPage';
import PastSubPage from './past/PastSubPage';

const RankReportPage = () => {
  const [tab, setTab] = useState('Current');

  return (
    <PageContainer>
      <CurrentSubPage />
      {/* <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Current' && <CurrentSubPage />}
      {tab === 'Past' && <PastSubPage />} */}
    </PageContainer>
  );
};

export default RankReportPage;
