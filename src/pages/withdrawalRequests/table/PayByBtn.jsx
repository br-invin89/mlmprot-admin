import React, { useState } from 'react';
import { Popconfirm, OutlineBtn, SuccessNotification } from '@/components';
import { t } from '@/utils/label';
import { withdrawRequestPayByApi } from '@/services/withdrawRequest';

export default function PayByBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = (d) => {
    SuccessNotification('Successfully paid');
    window.open(d.csv_file, '_blank');
    props.reloadTable();
  };

  const onFailUpdate = () => {
    setIsUpdating(false);
    props.reloadTable();
  };

  const handlePay = () => {
    setIsUpdating(true);
    withdrawRequestPayByApi(props.data.id, onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handlePay}>
      <OutlineBtn loading={isUpdating}>{t('common.label.pay', 'Pay')}</OutlineBtn>
    </Popconfirm>
  );
}
