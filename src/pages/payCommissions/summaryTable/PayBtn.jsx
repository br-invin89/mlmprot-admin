import React, { useState } from 'react';
import { Popconfirm, OutlineBtn, SuccessNotification } from '@/components';
import { payPayoutCommissionApi } from '@/services/payoutCommission';

export default function PayBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onPaySuccess = () => {
    SuccessNotification('Payout successfully');
    setIsUpdating(false);
    props.reloadTable();
  };

  const onPayFail = () => {
    setIsUpdating(false);
  };

  const handlePayout = () => {
    setIsUpdating(true);
    payPayoutCommissionApi(props.data.id, props.providerName, onPaySuccess, onPayFail);
  };

  return (
    <Popconfirm
      title={'Are you sure ?'}
      onConfirm={handlePayout}
      okText="Yes"
      placement="top"
      cancelText="No"
    >
      <OutlineBtn loading={isUpdating} disabled={props.disabled}>
        {props.label}
      </OutlineBtn>
    </Popconfirm>
  );
}
