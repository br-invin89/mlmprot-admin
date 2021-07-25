/* eslint-disable react/no-array-index-key */
import React from 'react';
import { UserStatusBadge, Card, CircularProgressBar, Row, Col } from '@/components';
import defaultUserImage from '@/assets/icons/user.svg';
import { ReactComponent as TopRatedBadgeIcon } from '@/assets/icons/top-rated-badge.svg';
import styles from './UserSearchInfoCard.less';
import UserCommentForm from './UserCommentForm';
import { varLabel } from '@/common/var';

export default (props) => {
  return (
    <Card className={`${styles.card}`}>
      <div className={`${styles.userSearchBody}`}>
        <h4 className={`${styles.title}`}>{props.label}</h4>
        <div className={`${styles.userLogoContainer}`}>
          <div className={`${styles.containerBottomMargin}`}>
            <CircularProgressBar
              strokeWidth="1"
              percentage={0}
              sqSize="160"
              render="image"
              image={props.data && props.data.image ? props.data.image : defaultUserImage}
              status="info"
            />
          </div>
          <div className={`${styles.topRatedContainer}`}>
            <div>{props.data ? `${props.data.first_name} ${props.data.last_name}` : '...'}</div>
            {props.data &&
            props.data.verification_status &&
            varLabel('user.verificationStatus', props.data.verification_status) === 'verified' ? (
              <TopRatedBadgeIcon />
            ) : (
              <></>
            )}
          </div>
          <div className={`${styles.usernameContainer}`}>
            <div>{props.data && props.data.uuid ? props.data.uuid : '...'}</div>
            <div className={`${styles.vLine}`}>|</div>
            <div>{props.data && props.data.username ? props.data.username : '...'}</div>
          </div>
          <div className={`${styles.circleContainer}`}>
            <UserStatusBadge
              status={props.data && props.data.status ? varLabel('user.status', props.data.status) : ''}
            />
          </div>
        </div>
        <div className={`${styles.divider}`} />
        <div className={`${styles.userSearchContent}`}>
          {props.columns &&
            props.columns.map((column, index) => {
              return (
                <Row className={`${styles.contentRow}`} key={index}>
                  <Col span={12}>
                    <div className={`${styles.heading}`}>{column.title}</div>
                  </Col>
                  <Col span={12} className={`${styles.circleTContainer}`}>
                    <div className={`${styles.text}`}>
                      {column.render ? (
                        <column.render data={props.data} rowIndex={index} />
                      ) : (
                        <span>
                          {props.data && props.data[column.dataIndex]
                            ? props.data[column.dataIndex]
                            : '...'}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              );
            })}
        </div>
        <UserCommentForm data={props.data} />
      </div>
    </Card>
  );
};
