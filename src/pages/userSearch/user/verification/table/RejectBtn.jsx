import React, { useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, Popconfirm, notification } from '@/components';
import { rejectUserVerificationApi } from '@/services/userSearch/verification';

export default function RejectBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: t('messages.success', 'Success'),
      description: t('pages.userSearch.userVerification.rejectSuccess', 'Verification rejected'),
    });
    props.loadTableData();
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handleSubmit = () => {
    setIsUpdating(true);
    rejectUserVerificationApi(props.userId, props.verificationId, onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handleSubmit}>
      <OutlineBtn loading={isUpdating} danger={true} className={'mr-10'}>
        Reject
      </OutlineBtn>
    </Popconfirm>
  );
}
