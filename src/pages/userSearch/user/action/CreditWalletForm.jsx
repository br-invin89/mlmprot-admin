import React, { useState, useEffect } from 'react';
import { Input, OutlineBtn, Spin, Popconfirm, message, notification } from '@/components';
import { asPrice } from '@/utils/text';
import styles from './UserActionSubPage.less';
import {
  addCreditWalletApi,
  removeCreditWalletApi,
  getCreditWalletApi,
} from '@/services/userSearch/action';

export default function CreditWalletForm(props) {
  const [amount, setAmount] = useState('');
  const [plusAmount, setPlusAmount] = useState('');
  const [minusAmount, setMinusAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const onGetData = (data) => {
    setAmount(data.current_balance);
    setIsLoading(false);
  };
  const onFailData = () => {
    setIsLoading(false);
  };
  const getCreditWallet = () => {
    setIsLoading(true);
    getCreditWalletApi(props.userData.id, onGetData, onFailData);
  };

  const onDoneUpdate = () => {
    setIsUpdating(false);
    setIsAdding(false);
    notification.success({
      message: 'Success',
      description: 'Credit wallet amount has been changed',
    });
    props.getUserDetail();
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
    setIsAdding(false);
    notification.error({
      message: 'Error',
      description: 'Something wrong',
    });
  };
  const handleAdd = () => {
    if (!plusAmount || Number.isNaN(plusAmount) || plusAmount <= 0) {
      message.error('Please input amount as numeric and should be greater than 0');
      return;
    }
    setIsAdding(true);
    addCreditWalletApi(props.userData.id, { amount: plusAmount }, onDoneUpdate, onFailUpdate);
  };
  const handleRemove = () => {
    if (!minusAmount || Number.isNaN(minusAmount) || minusAmount <= 0) {
      message.error('Please input amount as numeric and should be greater than 0');
      return;
    }
    setIsUpdating(true);
    removeCreditWalletApi(props.userData.id, { amount: minusAmount }, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    if (props.userData) getCreditWallet();
  }, [props.userData]);

  return (
    <div className={styles.walletContainer}>
      <p>Current credit wallet amount is {amount !== undefined ? asPrice(amount) : '-'}</p>
      <div className={styles.walletInputWrapper}>
        <Input
          value={plusAmount}
          onChange={(e) => setPlusAmount(e.target.value)}
          placeholder={'Amount'}
          type="number"
          className={styles.inputField}
        />
        <Popconfirm onConfirm={handleAdd}>
          <OutlineBtn loading={isAdding} disabled={isAdding} style={{ minWidth: 90}}>
            Add
          </OutlineBtn>
        </Popconfirm>
      </div>
      <div className={styles.walletInputWrapper}>
        <Input
          value={minusAmount}
          onChange={(e) => setMinusAmount(e.target.value)}
          placeholder={'Amount'}
          type="number"
          className={styles.inputField}          
        />
        <Popconfirm onConfirm={handleRemove}>
          <OutlineBtn loading={isUpdating} disabled={isUpdating} style={{ minWidth: 90}}>
            Remove
          </OutlineBtn>
        </Popconfirm>
      </div>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <Spin spinning={true} />
        </div>
      )}
    </div>
  );
}
