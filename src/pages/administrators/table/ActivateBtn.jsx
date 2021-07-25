import React, { useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, Popconfirm, notification } from '@/components';
import styles from '../AdministratorsPage.less';
import { changeAdministratorsStatusApi } from '@/services/administrators/administrators';
import { varValue, varKey } from '@/common/var';

export default function ActivateBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onActiveAdministrators = () => {
    setIsUpdating(false);
    notification.success({
      message: t('pages.administrators.success', 'Success'),
      description: t('pages.administrators.updatedSuccess', 'Administrators updated successfully'),
    });
    props.onHandleStatusChange();
  };
  const onFailActiveAdministrators = () => {
    setIsUpdating(false);
  };

  const handleActivate = () => {
    setIsUpdating(true);
    const status =
      varKey('admin.status', props.data.status) === 'active'
        ? varValue('admin.status', 'inactive')
        : varValue('admin.status', 'active');
    changeAdministratorsStatusApi(
      props.data.id,
      { status },
      onActiveAdministrators,
      onFailActiveAdministrators,
    );
  };

  return (
    <div>
      <Popconfirm onConfirm={handleActivate}>
        <OutlineBtn
          loading={isUpdating}
          danger={varKey('admin.status', props.data.status) === 'active'}
          success={varKey('admin.status', props.data.status) === 'inactive'}
          className={styles.activateBtn}
        >
          {varKey('admin.status', props.data.status) === 'active' ? (
            <>{isUpdating ? ' Deactivating now...' : 'Deactivate'}</>
          ) : (
            <>{isUpdating ? ' Activating now...' : 'Activate'}</>
          )}
        </OutlineBtn>
      </Popconfirm>
    </div>
  );
}
