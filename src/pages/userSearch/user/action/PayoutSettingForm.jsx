import React, { useState, useEffect } from 'react';
import { Button, OutlineBtn, Popconfirm, notification } from '@/components';
import styles from './UserActionSubPage.less';
import { changePaymentOptionApi } from '@/services/userSearch/action';
import { varOptions } from '@/common/var';

const userIsPayoutAllowedOptions = varOptions('user.isPayoutAllowed');

export default function PayoutSettingForm(props) {
  const [formData, setFormData] = useState({
    is_payout_allowed: 1,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    notification.success({
      message: 'Success',
      description: 'Payout Availability has been changed',
    });
    props.getUserDetail();
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleChange = (isPayoutAllowed) => {
    setIsUpdating(true);
    changePaymentOptionApi(
      props.userData.id,
      { is_payout_allowed: isPayoutAllowed },
      onDoneUpdate,
      onFailUpdate,
    );
  };

  useEffect(() => {
    if (props.userData) {
      setFormData({
        ...formData,
        is_payout_allowed: props.userData.is_payout_allowed,
      });
    }
  }, [props.userData]);

  return (
    <div className={`${styles.payoutContainer}`}>
      <div className={`${styles.label}`}>Payout Availability</div>
      <div className={styles.payoutOptionWrapper}>
        {userIsPayoutAllowedOptions.map((el) => (
          <div key={el.value}>
            {el.value !== formData.is_payout_allowed ? (
              <Popconfirm onConfirm={() => handleChange(el.value)}>
                <OutlineBtn success={el.value === 1} danger={el.value === 2} loading={isUpdating} disabled={isUpdating} style={{ minWidth: 70 }}>
                  {el.label}
                </OutlineBtn>
              </Popconfirm>
            ) : (
                <OutlineBtn className={el.value === 1 ? 'success-disabled' : 'danger-disabled'}  disabled style={{ minWidth: 70, borderRadius: '3px', marginRight: el.value === 2 ? 0 : 10, marginLeft: el.value === 2 ? 10 : 0 }}>
                  {el.label}
                </OutlineBtn>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
