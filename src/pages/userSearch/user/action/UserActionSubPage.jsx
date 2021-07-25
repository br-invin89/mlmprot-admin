import React, { useState, useEffect } from 'react';
import { Card, Spin } from '@/components';
import ChangeStatusForm from './ChangeStatusForm';
// import ChangeEnrollerForm from './ChangeEnrollerForm'
import GeneratePasswordForm from './GeneratePasswordForm';
// import AddCommissionForm from './AddCommissionForm';
import PayoutSettingForm from './PayoutSettingForm';
import CreditWalletForm from './CreditWalletForm';
import ChangeRankForm from './ChangeRankForm';
import ChangeVisibilityForm from './ChangeVisibilityForm';
import ChangeShowContactInfoForm from './ChangeShowContactInfoForm';
import ChangeUserTypeForm from './ChangeUserTypeForm';
import RequestVerificationForm from './RequestVerificationForm';
import ProductCreditForm from './ProductCreditForm';
import styles from './UserActionSubPage.less';
import { getUserDetailApi } from '@/services/userSearch/userDetail';

const UserActionSubPage = (props) => {
  const [tab, setTab] = useState('Status');
  const tabs = [
    'Status',
    'Password',
    'Payout',
    'Credit Wallet',
    'Product Credit',
    'Rank',
    'Visibility',
    'Show Contact Info',
    'User Type',
    'Verification & Tax',
  ];
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onGetData = (data) => {
    setUserData(data);
    setIsLoading(false);
  };

  const onFailData = () => {
    setIsLoading(false);
  };

  const getUserDetail = () => {
    setIsLoading(true);
    getUserDetailApi(props.userId, onGetData, onFailData);
  };

  useEffect(() => {
    if (props.userId) {
      getUserDetail();
    }
  }, [props.userId, tab]);

  return (
    <>
      <div className={styles.actionWrapper}>
        <div className={styles.actionTabs}>
          <ul>
            {tabs.map((el) => (
              <li
                key={el}
                className={`${el === tab ? styles.activeTab : ''}`}
                onClick={() => setTab(el)}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <Card className={`${styles.card}`}>
          {tab === 'Status' && <ChangeStatusForm userData={userData} />}
          {tab === 'Password' && <GeneratePasswordForm userData={userData} />}
          {tab === 'Payout' && (
            <PayoutSettingForm userData={userData} getUserDetail={getUserDetail} />
          )}
          {tab === 'Credit Wallet' && (
            <CreditWalletForm userData={userData} getUserDetail={getUserDetail} />
          )}
          {tab === 'Product Credit' && (
            <ProductCreditForm userData={userData} getUserDetail={getUserDetail} />
          )}
          {tab === 'Rank' && <ChangeRankForm userData={userData} getUserDetail={getUserDetail} />}
          {tab === 'Visibility' && <ChangeVisibilityForm userData={userData} />}
          {tab === 'Show Contact Info' && <ChangeShowContactInfoForm userData={userData} />}
          {tab === 'User Type' && <ChangeUserTypeForm userData={userData} />}
          {tab === 'Verification & Tax' && (
            <RequestVerificationForm userData={userData} getUserDetail={getUserDetail} />
          )}
        </Card>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Spin spinning={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserActionSubPage;
