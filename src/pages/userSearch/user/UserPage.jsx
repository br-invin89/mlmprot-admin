import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import UserDetailsSubPage from './userDetails/UserDetailsSubPage';
import UserInfoSubPage from './changeUserInfo/UserInfoSubPage';
import OrderHistorySubPage from './orderHistory/OrderHistorySubPage';
import HistorySubPage from './history/HistorySubPage';
import FraudSubPage from './fraud/FraudSubPage';
import VerificationSubPage from './verification/VerificationSubPage';
import UserActionSubPage from './action/UserActionSubPage';
import PersonalEnrolleesSubPage from './personalEnrollees/PersonalEnrolleesSubPage';
import MinusBonusSubPage from './minusBonus/MinusBonusSubPage';

const UserPage = () => {
  const { userId } = useParams();
  const [tab, setTab] = useState('User Details');
  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} userId={userId} />
      {tab === 'User Details' && <UserDetailsSubPage userId={userId} />}
      {tab === 'Change User Info' && <UserInfoSubPage userId={userId} />}
      {tab === 'Order History' && <OrderHistorySubPage userId={userId} />}
      {tab === 'Fraud' && <FraudSubPage userId={userId} />}
      {tab === 'Verification' && <VerificationSubPage userId={userId} />}
      {tab === 'Personal Enrollees' && <PersonalEnrolleesSubPage userId={userId} />}
      {tab === 'History' && <HistorySubPage userId={userId} />}
      {tab === 'Minus Bonus' && <MinusBonusSubPage userId={userId} />}
      {tab === 'Action' && <UserActionSubPage userId={userId} />}
    </PageContainer>
  );
};

export default UserPage;
