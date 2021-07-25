import React from 'react';
import { Card, Row, Col, UserStatusBadge, Spin } from '@/components';
import { asDateTime } from '@/utils/text';
import { varLabel } from '@/common/var';
import styles from './MessagesSubPage.less';

const MessagesSubPage = ({isLoading, data}) => {
  return (
    <div>
      {isLoading ? (
        <Spin spinning={true} className="mb-15" />
      ) : (
        <Card>
          <Row>
            <Col span={12}>
              <div className={styles.ticketTitle}>Requester</div>
            </Col>
            <Col span={12}>
              <div className={styles.ticketCoontent}>
                {data?.requested_by === 2
                  ? `${data?.admin?.first_name} ${data?.admin?.last_name}`
                  : `${data?.user?.first_name} ${data?.user?.last_name}`}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.ticketTitle}>Created</div>
            </Col>
            <Col span={12}>
              <div className={styles.ticketCoontent}>{asDateTime(data.created_at)}</div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.ticketTitle}>Last Activity</div>
            </Col>
            <Col span={12}>
              <div className={styles.ticketCoontent}>
                {data.last_activity?.created_at ? asDateTime(data.last_activity.created_at) : ''}
              </div>
            </Col>
          </Row>
          <div className={styles.divider} />
          <Row>
            <Col span={12}>
              <div className={styles.ticketTitle}>Ticket ID</div>
            </Col>
            <Col span={12}>
              <div className={styles.ticketCoontent}>#{data.uuid}</div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.ticketTitle}>Status</div>
            </Col>
            <Col span={12}>
              <div className={styles.ticketCoontent}>
                <UserStatusBadge status={varLabel('support.status', data.status)} />
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default MessagesSubPage;
