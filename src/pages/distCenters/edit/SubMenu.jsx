import { Tabs } from '@/components';

export default (props) => {
  return (
    <Tabs className={`page-sub-menu`} activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Batches'} key={'Batches'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Upload  Shippments'} key={'Upload  Shippments'}></Tabs.TabPane>
      {/* <Tabs.TabPane tab={'Shipping Groups'} key={'Shipping Groups'}></Tabs.TabPane> */}
      <Tabs.TabPane tab={'Details'} key={'Details'}></Tabs.TabPane>
    </Tabs>
  );
};
