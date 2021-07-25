import React, { useState } from 'react';
import { PageContainer, Tabs } from '@/components';
import PendingSubPage from './pending/PendingSubPage';
import HistorySubPage from './history/HistorySubPage';

export default function GenealogyPage() {
  const [tab, setTab] = useState('pending');

  return (
    <PageContainer>
      <Tabs activeKey={tab} onChange={(tab0) => setTab(tab0)}>
        <Tabs.TabPane tab={'Pending'} key={'pending'}></Tabs.TabPane>
        <Tabs.TabPane tab={'History'} key={'history'}></Tabs.TabPane>
      </Tabs>
      {tab === 'pending' && <PendingSubPage />}
      {tab === 'history' && <HistorySubPage />}
    </PageContainer>
  );
}
