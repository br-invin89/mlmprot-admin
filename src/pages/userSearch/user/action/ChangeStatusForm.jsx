import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Select, Row, Col, OutlineBtn, notification, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { varOptions } from '@/common/var';
import { changeUserStatusApi } from '@/services/userSearch/action';

const userStatusOptions = varOptions('user.status');
export default function ChangeStatusForm(props) {
  const [status, setStatus] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [changeInStatus, setChangeInStataus] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    if (changeInStatus) {
      notification.success({
        message: 'Success',
        description: 'User status has been changed',
      });
      setChangeInStataus(false)
    }
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleUpdate = () => {
    setIsUpdating(true);
    changeUserStatusApi(props.userData.id, { status }, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    if (props.userData) {
      setStatus(props.userData.status);
    }
  }, [props.userData]);

  return (
    <>
      <div>
        <Row gutter={[24, 0]}>
          <Col>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Change Status</div>
              <Select
                value={status}
                onChange={(v) => {
                  setChangeInStataus(true)
                  setStatus(v)
                }}
                className={`${styles.statusInput}`}
                options={userStatusOptions}
              />
            </div>
          </Col>
          <Col>
            <div className={`${styles.statusBtn}`}>
              <Popconfirm onConfirm={handleUpdate}>
                <OutlineBtn
                  className={`${styles.button} mb-12`}
                  loading={isUpdating}
                  disabled={isUpdating}
                >
                  {t('pages.userSearch.saveBtn', 'Save')}
                </OutlineBtn>
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
