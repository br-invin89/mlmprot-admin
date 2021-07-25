import React, { useState } from 'react';
import { t } from '@/utils/label';
import { TextArea, Input, Row, Col, OutlineBtn, message, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { addCommissionApi } from '@/services/userSearch/action';

const AddCommissionSection = (props) => {
  const [formData, setFormData] = useState({
    amount: '',
    comment: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handleSubmit = () => {
    if (!formData.amount || Number.isNaN(formData.amount)) {
      message.error('Please input amount as numeric');
      return;
    }
    setIsUpdating(true);
    addCommissionApi(props.userData.id, formData, onDoneUpdate, onFailUpdate);
  };

  return (
    <>
      <div>
        <Row>
          <Col xs={24} md={24} lg={16} xl={12}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>*Amount</div>
              <Input
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: e.target.value,
                  })
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={22} xl={20}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Comment (Optional)</div>
              <TextArea
                rows={3}
                value={formData.comment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comment: e.target.value,
                  })
                }
              />
            </div>
          </Col>
        </Row>
        <div style={{ display: 'flex' }}>
          <Popconfirm onConfirm={handleSubmit}>
            <OutlineBtn loading={isUpdating} disabled={isUpdating}>
              {t('pages.userSearch.addCommission', 'Add Commission')}
            </OutlineBtn>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default AddCommissionSection;
