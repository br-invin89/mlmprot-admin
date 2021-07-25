import { Tabs } from '@/components';

export default (props) => {
  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Merchants'} key={'Merchants'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Config'} key={'Config'}></Tabs.TabPane>
    </Tabs>
  );
};
