import React, { useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, Popconfirm, notification } from '@/components';
import styles from '../VideosPage.less';
import { changeVideoStatusApi } from '@/services/tools/videos'

export default function ActivateBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onActiveEvent = () => {
    setIsUpdating(false);
    notification.success({
      message: t('messages.success', 'Success'),
      description: t({
        id: 'pages.video.activateSuccess',
        defaultMessage: 'Video activation changed successfully',
      }),
    });
    props.handleSearch();    
  };
  const onFailActiveEvent = () => {
    setIsUpdating(false);
  };

  const handleActivate = () => {
    setIsUpdating(true);
    const status = props.data.status === 1 ? 2 : 1;
    changeVideoStatusApi(props.data.id, { status }, onActiveEvent, onFailActiveEvent);
  };

  return (
      <Popconfirm onConfirm={handleActivate}>
        <OutlineBtn
          loading={isUpdating}
          danger={props.data.status === 1}
          success={props.data.status === 2}
          className={styles.activateBtn || 'mr-10'}
          style={{minWidth: 100}}
        >
          {props.data.status === 1 ? (
            <>{isUpdating ? ' Deactivating now...' : 'Deactivate'}</>
          ) : (
            <>{isUpdating ? ' Activating now...' : 'Activate'}</>
          )}
        </OutlineBtn>
      </Popconfirm>
  );
}
