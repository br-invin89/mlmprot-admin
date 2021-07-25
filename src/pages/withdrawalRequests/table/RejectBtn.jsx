import React, { useState } from 'react';
import { Popconfirm, OutlineBtn } from '@/components';
import { t } from '@/utils/label';
import { withdrawRequestChangeStatusApi } from '@/services/withdrawRequest';

export default function RejectBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    props.reloadTable();
    setIsUpdating(false);
  };

  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handleReject = () => {
    setIsUpdating(true);
    const data = {
      status: 2,
    };
    withdrawRequestChangeStatusApi(props.data.id, data, onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handleReject}>
      <OutlineBtn loading={isUpdating} danger>
        {t('common.label.reject', 'Reject')}
      </OutlineBtn>
    </Popconfirm>
  );
}
