import { Tabs } from '@/components';

export default (props) => {
  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Inventory Levels'} key={'Inventory Levels'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Inventory Logs'} key={'Inventory Logs'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Daily Unit Numbers'} key={'Daily Unit Numbers'}></Tabs.TabPane>
    </Tabs>
  );
};
