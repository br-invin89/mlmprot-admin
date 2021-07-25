import { Tabs } from '@/components';

export default (props) => {
  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Products'} key={'Products'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Users'} key={'Users'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Autoships'} key={'Autoships'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Orders'} key={'Orders'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Commissions'} key={'Commissions'}></Tabs.TabPane>
    </Tabs>
  );
};
