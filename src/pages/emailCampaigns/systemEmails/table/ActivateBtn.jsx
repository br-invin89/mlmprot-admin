import React, { useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, Popconfirm, notification } from '@/components';
import styles from '../SystemEmailsPage.less';
import { activateSystemEmailApi } from '@/services/emailCampaigns/systemEmails';
import { varKey, varValue } from '@/common/var';

export default function ActivateBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onActiveSystemEmail = () => {
    setIsUpdating(false);
    notification.success({
      message: t('messages.success', 'Success'),
      description: t('pages.systemEmail.activateSuccess', 'Email activation changed successfully'),
    });
    props.handleSearch();
  };
  const onFailActiveSystemEmail = () => {
    setIsUpdating(false);
  };

  const handleActivate = () => {
    setIsUpdating(true);
    const status =
      varKey('systemEmail.status', props.data.status) === 'active'
        ? varValue('systemEmail.status', 'inactive')
        : varValue('systemEmail.status', 'active');
    activateSystemEmailApi(props.data.id, { status }, onActiveSystemEmail, onFailActiveSystemEmail);
  };

  return (
    <div>
      <Popconfirm onConfirm={handleActivate}>
        <OutlineBtn
          loading={isUpdating}
          danger={props.data.status === varValue('systemEmail.status', 'active')}
          success={props.data.status === varValue('systemEmail.status', 'inactive')}
          className={styles.activateBtn}
        >
          {props.data.status === varValue('systemEmail.status', 'active') ? (
            <>{isUpdating ? ' Deactivating now...' : 'Deactivate'}</>
          ) : (
            <>{isUpdating ? ' Activating now...' : 'Activate'}</>
          )}
        </OutlineBtn>
      </Popconfirm>
    </div>
  );
}
