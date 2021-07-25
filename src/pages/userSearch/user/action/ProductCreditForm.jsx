import React, { useState, useEffect } from 'react';
import { Input, OutlineBtn, Spin, Popconfirm, message, notification } from '@/components';
import styles from './UserActionSubPage.less';
import {
  addProductCreditApi,
  removeProductCreditApi,
  getProductCreditApi,
} from '@/services/userSearch/action';

export default function ProductCreditForm(props) {
  const [pcAmount, setPcAmount] = useState('');
  const [scAmount, setScAmount] = useState('');
  const [plusPcAmount, setPlusPcAmount] = useState(0);
  const [minusPcAmount, setMinusPcAmount] = useState(0);
  const [plusScAmount, setPlusScAmount] = useState(0);
  const [minusScAmount, setMinusScAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const onGetData = (data) => {
    setPcAmount(data.pc_amount);
    setScAmount(data.sc_amount);
    setIsLoading(false);
  };
  const onFailData = () => {
    setIsLoading(false);
  };
  const getProductCredit = () => {
    setIsLoading(true);
    getProductCreditApi(props.userData.id, onGetData, onFailData);
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
    if (
      Number.isNaN(plusPcAmount) ||
      plusPcAmount < 0 ||
      Number.isNaN(plusScAmount) ||
      plusScAmount < 0
    ) {
      message.error('Please input amount as numeric and should be greater than 0');
      return;
    }
    setIsAdding(true);
    addProductCreditApi(
      props.userData.id,
      { pc_amount: plusPcAmount, sc_amount: plusScAmount },
      onDoneUpdate,
      onFailUpdate,
    );
  };
  const handleRemove = () => {
    if (
      Number.isNaN(minusPcAmount) ||
      minusPcAmount < 0 ||
      Number.isNaN(minusScAmount) ||
      minusScAmount < 0
    ) {
      message.error('Please input amount as numeric and should be greater than 0');
      return;
    }
    setIsUpdating(true);
    removeProductCreditApi(
      props.userData.id,
      { pc_amount: minusPcAmount, sc_amount: minusScAmount },
      onDoneUpdate,
      onFailUpdate,
    );
  };

  useEffect(() => {
    if (props.userData) getProductCredit();
  }, [props.userData]);

  return (
    <div className={styles.walletContainer}>
      <p>
        Current Product Credit amount is {pcAmount !== undefined ? pcAmount : '-'},&nbsp;Sample
        Credit amount is {scAmount !== undefined ? scAmount : '-'}.
      </p>
      <div className={styles.walletInputWrapper}>
        <Input
          value={plusPcAmount}
          onChange={(e) => setPlusPcAmount(e.target.value)}
          placeholder={'PC Amount'}
          type="number"
          className={styles.inputField}
        />
        <Input
          value={plusScAmount}
          onChange={(e) => setPlusScAmount(e.target.value)}
          placeholder={'SC Amount'}
          type="number"
          className={styles.inputField}
        />
        <Popconfirm onConfirm={handleAdd}>
          <OutlineBtn loading={isAdding} disabled={isAdding} style={{ minWidth: 90 }}>
            Add
          </OutlineBtn>
        </Popconfirm>
      </div>
      <div className={styles.walletInputWrapper}>
        <Input
          value={minusPcAmount}
          onChange={(e) => setMinusPcAmount(e.target.value)}
          placeholder={'PC Amount'}
          type="number"
          className={styles.inputField}
        />
        <Input
          value={minusScAmount}
          onChange={(e) => setMinusScAmount(e.target.value)}
          placeholder={'SC Amount'}
          type="number"
          className={styles.inputField}
        />
        <Popconfirm onConfirm={handleRemove}>
          <OutlineBtn loading={isUpdating} disabled={isUpdating} style={{ minWidth: 90 }}>
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
