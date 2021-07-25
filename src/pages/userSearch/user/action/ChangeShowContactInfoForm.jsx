import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Select, Row, Col, OutlineBtn, notification, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { varOptions } from '@/common/var';
import { changeShowContactInfoApi } from '@/services/userSearch/action';

const userShowContactInfoOptions = varOptions('user.showContactInfo');
export default function ChangeShowContactInfoForm(props) {
  const [showContactInfo, setShowContactInfo] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: 'Success',
      description: 'Visibility Contact Info on corporate site has been changed',
    });
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleUpdate = () => {
    setIsUpdating(true);
    changeShowContactInfoApi(
      props.userData.id,
      { show_contact_info: showContactInfo },
      onDoneUpdate,
      onFailUpdate,
    );
  };

  useEffect(() => {
    if (props.userData) {
      setShowContactInfo(props.userData.show_contact_info);
    }
  }, [props.userData]);

  return (
    <>
      <div>
        <Row gutter={[24, 0]}>
          <Col>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Show Contact Info on corporate site?</div>
              <Select
                // className={`${styles.statusInput}`}
                value={showContactInfo}
                onChange={(v) => setShowContactInfo(v)}
                options={userShowContactInfoOptions}
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
