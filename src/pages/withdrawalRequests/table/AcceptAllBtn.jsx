import React, { useState } from 'react';
import { Popconfirm, OutlineBtn } from '@/components';
import { t } from '@/utils/label';
import { withdrawRequestAcceptAllApi } from '@/services/withdrawRequest';

export default function AcceptAllBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    props.reloadTable();
    setIsUpdating(false);
  };

  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handleAccept = () => {
    setIsUpdating(true);
    withdrawRequestAcceptAllApi(onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handleAccept}>
      <OutlineBtn loading={isUpdating}>
        {t('common.label.acceptAll', 'Accept All')}
      </OutlineBtn>
    </Popconfirm>
  );
}
