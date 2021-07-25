import React, { useState } from 'react';
import { Popconfirm, OutlineBtn } from '@/components';
import { t } from '@/utils/label';
import { withdrawRequestChangeStatusApi } from '@/services/withdrawRequest';

export default function AcceptBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneAccept = () => {
    props.reloadTable();
    setIsUpdating(false);
  };

  const onFailAccept = () => {
    setIsUpdating(false);
  };

  const handleAccept = () => {
    setIsUpdating(true);
    const data = {
      status: 1,
    };
    withdrawRequestChangeStatusApi(props.data.id, data, onDoneAccept, onFailAccept);
  };

  return (
    <Popconfirm onConfirm={handleAccept}>
      <OutlineBtn loading={isUpdating}>{t('common.label.accept', 'Accept')}</OutlineBtn>
    </Popconfirm>
  );
}
