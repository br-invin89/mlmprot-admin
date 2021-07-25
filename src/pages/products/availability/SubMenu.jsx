import { Tabs } from '@/components';

export default (props) => {
  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Autoship'} key={'Autoship'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Enrollment'} key={'Enrollment'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Backoffice Shop'} key={'Backoffice Shop'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Credit Wallet'} key={'Credit Wallet'}></Tabs.TabPane>
    </Tabs>
  );
};
