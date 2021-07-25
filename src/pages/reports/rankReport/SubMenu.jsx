import { Tabs } from '@/components';

export default (props) => {
  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Current'} key={'Current'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Past'} key={'Past'}></Tabs.TabPane>
    </Tabs>
  );
};
