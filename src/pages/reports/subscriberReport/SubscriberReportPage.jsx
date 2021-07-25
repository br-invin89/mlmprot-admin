import React, { /* useState */ } from 'react';
// import { Tabs } from '@/components';
// import ProcessedSubPage from './processed/ProcessedSubPage'
// import PendingSubPage from './pending/PendingSubPage'
import { styles } from './SubscriberReportPage.less';

export default function SubscriberReportPage() {
  // const [tab, setTab] = useState('processed')

  return (
    <div className={styles.pageRoot}>
      {/* <Tabs activeKey={tab} onChange={v=>setTab(v)}>
        <Tabs.TabPane tab={'Processed'} key={'processed'}></Tabs.TabPane>
        <Tabs.TabPane tab={'Pending'} key={'pending'}></Tabs.TabPane>
      </Tabs>
      {tab==='processed' && 
        <ProcessedSubPage />
      }
      {tab==='pending' && 
        <PendingSubPage />
      } */}
    </div>
  )
}
