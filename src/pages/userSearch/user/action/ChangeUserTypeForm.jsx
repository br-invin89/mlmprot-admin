import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Select, Row, Col, OutlineBtn, notification, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { varOptions } from '@/common/var';
import { changeUserTypeApi } from '@/services/userSearch/action';

const userTypeOptions = varOptions('user.type');
export default function ChangeUserTypeForm(props) {
  const [userType, setUserType] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: 'Success',
      description: 'User type has been changed',
    });
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleUpdate = () => {
    setIsUpdating(true);
    changeUserTypeApi(props.userData.id, { type: userType }, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    if (props.userData) {
      setUserType(props.userData.type);
    }
  }, [props.userData]);

  return (
    <>
      <div>
        <Row gutter={[24, 0]}>
          <Col>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Change User Type</div>
              <Select
                value={userType}
                onChange={(v) => setUserType(v)}
                className={`${styles.statusInput}`}
                options={userTypeOptions}
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
