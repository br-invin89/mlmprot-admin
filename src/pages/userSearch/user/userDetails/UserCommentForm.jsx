/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { TextArea, Row, Col, OutlineBtn, notification } from '@/components';
import styles from './UserSearchInfoCard.less';
import { updateUserCommentApi } from '@/services/userSearch/userDetail';

export default (props) => {
  const [commentData, setCommentData] = useState({
    comment: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdateComment = (message) => {
    notification.success({
      message: 'Success',
      description: message,
    });
    setIsUpdating(false);
  };

  const onFailUpdateComment = () => {
    setIsUpdating(false);
  };

  const updateComment = () => {
    if (!commentData.comment) {
      notification.error({
        message: 'Error',
        description: 'Please input comment',
      });
      return;
    }
    setIsUpdating(true);
    updateUserCommentApi(props.data.id, commentData, onDoneUpdateComment, onFailUpdateComment);
  };

  useEffect(() => {
    if (!props.data) return;
    setCommentData({
      ...commentData,
      comment: props.data.comment,
    });
  }, [props.data]);

  return (
    <div className={`${styles.userSearchContent} ${styles.userSearchComment}`}>
      <div className={`${styles.heading}`}>{t('pages.userSearch.comment', 'Comment')}</div>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <TextArea
            rows={4}
            value={commentData.comment}
            onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
          />
        </Col>
      </Row>
      <div className={`${styles.commentBtn} mt-12`}>
        <OutlineBtn
          className={`${styles.btnContainer}`}
          loading={isUpdating}
          onClick={updateComment}
        >
          {t('pages.userSearch.addCommentBtn', 'Update Comment')}
        </OutlineBtn>
      </div>
    </div>
  );
};
