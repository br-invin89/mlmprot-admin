import React from 'react';
import styles from '../OrderSearchResultsPage.less';
import { Row, Col, UserStatusBadge } from '@/components';
import { varLabel } from '@/common/var';
import { asPrice, asDate, asNumber } from '@/utils/text';

export default function RecordModalContent(props) {
  return (
    <div className={styles.recordContainer}>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Order Number:</label>
            <span>{props.data.order_number}</span>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>User:</label>
            <span>{`${props.data.user.first_name} ${props.data.user.last_name}`}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Ordered On:</label>
            <span>{asDate(props.data.created_at)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Merchant:</label>
            <span>{props.data.merchant ? props.data.merchant.name : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Merchant Response:</label>
            <UserStatusBadge
              status={varLabel('order.merchantResponse', props.data.merchant_response)}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Merchant Trans. ID:</label>
            <span className={styles.labelId}>{props.data.transaction_id || '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Tax Trans. Response:</label>
            {
              props.data.tax_response ?
                <UserStatusBadge
                  status={props.data.tax_response === 1 ? 'Success' : 'Failed'}
                />
                : '-'
            }
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Tax Trans. ID:</label>
            <span>{props.data.tax_transaction_id || '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Tracking Number:</label>
            <span>{props.data.tracking_number || '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Status:</label>
            <UserStatusBadge status={varLabel('order.status', props.data.status)} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Amount:</label>
            <span>{asPrice(props.data.order_total_amount)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>PV:</label>
            <span>{props.data.order_total_pv}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>CV:</label>
            <span>{props.data.order_total_cv}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Cost:</label>
            <span>{asPrice(props.data.order_total_cost)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Tax Amount:</label>
            <span>{asPrice(props.data.tax_amount)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Shipping Price:</label>
            <span>{asPrice(props.data.shipping_price)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Discount Price:</label>
            <span>
              {props.data.order_total_discount ? asPrice(props.data.order_total_discount) : '-'}
            </span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Refunded Amount:</label>
            <span>{props.data.refunded_amount ? asPrice(props.data.refunded_amount) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Dist Center:</label>
            <span className={styles.labelId}>{(props.data.dist_center && props.data.dist_center.name) || '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Order From:</label>
            <span>{varLabel('order.orderFrom', props.data.order_from)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Source:</label>
            <span>{varLabel('order.source', props.data.source)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Last CC 4:</label>
            <span>{props.data.last_cc_4 === 'none' || !props.data.last_cc_4 ? 'N/A' : props.data.last_cc_4}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Risk Score:</label>
            <span>{asNumber(props.data.risk_score)}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Is Flagged:</label>
            <span>
              {props.data.is_flagged === 1 ? (
                <UserStatusBadge status={varLabel('order.isFlagged', props.data.is_flagged)} />
              ) : (
                  varLabel('order.isFlagged', props.data.is_flagged)
                )}
            </span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Order IP Address:</label>
            <span>{props.data.order_ip_address}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Confirmed On:</label>
            <span>{props.data.confirmed_at ? asDate(props.data.confirmed_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Shipped On:</label>
            <span>{props.data.shipped_at ? asDate(props.data.shipped_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Failed On:</label>
            <span>{props.data.failed_at ? asDate(props.data.failed_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Refunded On:</label>
            <span>{props.data.refunded_at ? asDate(props.data.refunded_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Partial Refunded On:</label>
            <span>
              {props.data.partial_refunded_at ? asDate(props.data.partial_refunded_at) : '-'}
            </span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Resent On:</label>
            <span>{props.data.resent_at ? asDate(props.data.resent_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Cancelled On:</label>
            <span>{props.data.cancelled_at ? asDate(props.data.cancelled_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Chargebacked On:</label>
            <span>{props.data.chargebacked_at ? asDate(props.data.chargebacked_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Flagged On:</label>
            <span>{props.data.flagged_at ? asDate(props.data.flagged_at) : '-'}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className={styles.recordCellContainer}>
            <label>Unflagged On:</label>
            <span>{props.data.unflagged_at ? asDate(props.data.unflagged_at) : '-'}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: 20 }}>
          <label style={{ paddingRight: 20 }}><b>Note:</b></label>
          <span>{props.data.note}</span>
        </Col>
      </Row>
    </div>
  );
}
