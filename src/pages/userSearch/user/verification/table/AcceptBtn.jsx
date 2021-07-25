import React, { useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, Popconfirm, notification } from '@/components';
import { acceptUserVerificationApi } from '@/services/userSearch/verification';

export default function AcceptBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: t('messages.success', 'Success'),
      description: t(
        'pages.userSearch.userVerification.acceptSuccess',
        'Verification accepted successfully',
      ),
    });
    props.loadTableData();
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handleSubmit = () => {
    setIsUpdating(true);
    acceptUserVerificationApi(props.userId, props.verificationId, onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handleSubmit}>
      <OutlineBtn loading={isUpdating} success={true} className={'mr-10'}>
        Accept
      </OutlineBtn>
    </Popconfirm>
  );
}
