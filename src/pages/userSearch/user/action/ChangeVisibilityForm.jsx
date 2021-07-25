import React, { useState, useEffect } from 'react';
import { Select, Row, Col, OutlineBtn, notification, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { varOptions } from '@/common/var';
import { changeShowLeaderboardApi } from '@/services/userSearch/action';
import { t } from '@/utils/label';

const userShowLeaderboardOptions = varOptions('user.showLeaderboard');
export default function ChangeVisibilityForm(props) {
  const [showLeaderboard, setShowLeaderboard] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: 'Success',
      description: 'Visibility on Leaderboard has been changed',
    });
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleUpdate = () => {
    setIsUpdating(true);
    changeShowLeaderboardApi(
      props.userData.id,
      { show_leaderboard: showLeaderboard },
      onDoneUpdate,
      onFailUpdate,
    );
  };

  useEffect(() => {
    if (props.userData) {
      setShowLeaderboard(props.userData.show_leaderboard);
    }
  }, [props.userData]);

  return (
    <>
      <div>
        <Row gutter={[24, 0]}>
          <Col>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Show in Leaderboard?</div>
              <Select
                className={`${styles.statusInput}`}
                value={showLeaderboard}
                onChange={(v) => setShowLeaderboard(v)}
                options={userShowLeaderboardOptions}
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
