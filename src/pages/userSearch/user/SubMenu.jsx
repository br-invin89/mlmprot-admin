/* eslint-disable no-undef */
import { Tabs } from '@/components';
import { checkActionAccess } from '@/utils/authority';
import { getUser } from '@/utils/localStorage';
import { sudoUserApi, sudoEnrollerApi } from '@/services/userSearch/sudo';

export default (props) => {
  const myUser = getUser();

  const onSudoUser = (token) => {
    window.open(`${REACT_APP_BACKOFFICE}/login?auto-token-login&token=${token}`, '_blank');
  };

  const onSudoEnroller = (token) => {
    window.open(`${REACT_APP_BACKOFFICE}/login?auto-token-login&token=${token}`, '_blank');
  };

  const onFailSudoEnroller = () => {};

  const onChangeTab = (tab_) => {
    if (tab_ === 'Sudo') {
      sudoUserApi(props.userId, onSudoUser);
    } else if (tab_ === 'Enroller') {
      sudoEnrollerApi(props.userId, onSudoEnroller, onFailSudoEnroller);
    } else {
      props.setTab(tab_);
    }
  };

  return (
    <Tabs className="page-sub-menu" activeKey={props.tab} onChange={onChangeTab}>
      {checkActionAccess(myUser, 'sudo') && <Tabs.TabPane tab={'Sudo'} key={'Sudo'}></Tabs.TabPane>}
      <Tabs.TabPane tab={'Enroller'} key={'Enroller'}></Tabs.TabPane>
      <Tabs.TabPane tab={'User Details'} key={'User Details'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Change User Info'} key={'Change User Info'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Order History'} key={'Order History'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Fraud'} key={'Fraud'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Verification'} key={'Verification'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Personal Enrollees'} key={'Personal Enrollees'}></Tabs.TabPane>
      <Tabs.TabPane tab={'History'} key={'History'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Minus Bonus'} key={'Minus Bonus'}></Tabs.TabPane>
      <Tabs.TabPane tab={'Action'} key={'Action'}></Tabs.TabPane>
    </Tabs>
  );
};
