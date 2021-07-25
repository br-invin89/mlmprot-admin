import {
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
  TagsOutlined,
  GlobalOutlined,
  HddOutlined,
  MailOutlined,
  BankOutlined,
  BarChartOutlined,
  DollarOutlined,
  IssuesCloseOutlined,
  ToolOutlined,
  DesktopOutlined,
  SettingOutlined,
  FileDoneOutlined,
  UsergroupDeleteOutlined,
  SlidersOutlined
} from '@ant-design/icons';

export default function MenuIcon(props) {
  return (
    <>
      {props.icon === 'dashboard2' ? <HomeOutlined /> : ''}
      {props.icon === 'user-search' ? <SearchOutlined /> : ''}
      {props.icon === 'genealogy' ? <SlidersOutlined /> : ''}
      {props.icon === 'administrators' ? <UserOutlined /> : ''}
      {props.icon === 'products' ? <TagsOutlined /> : ''}
      {props.icon === 'dist-centers' ? <GlobalOutlined /> : ''}
      {props.icon === 'inventory' ? <HddOutlined /> : ''}
      {props.icon === 'email-campaigns' ? <MailOutlined /> : ''}
      {props.icon === 'merchants' ? <BankOutlined /> : ''}
      {props.icon === 'reports' ? <BarChartOutlined /> : ''}
      {props.icon === 'pay-commissions' ? <DollarOutlined /> : ''}
      {props.icon === 'fraud-management' ? <IssuesCloseOutlined /> : ''}
      {props.icon === 'tools' ? <ToolOutlined /> : ''}
      {props.icon === 'website' ? <DesktopOutlined /> : ''}
      {props.icon === 'settings' ? <SettingOutlined /> : ''}
      {props.icon === 'compensation-plan' ? <FileDoneOutlined /> : ''}
      {props.icon === 'support' ? <UsergroupDeleteOutlined /> : ''}
    </>
  );
}
