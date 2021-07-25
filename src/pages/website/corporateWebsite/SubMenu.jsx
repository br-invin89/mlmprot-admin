import { Tabs } from 'antd';

export default (props) => {
  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={props.setTab}>
      <Tabs.TabPane tab={'Settings'} key={'settings'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Menus'} key={'menus'}></Tabs.TabPane>
    </Tabs>
  );
};
