import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, Input, Button, message, SuccessNotification } from '@/components';
import { refundOrderApi } from '@/services/userSearch/orderHistory';
import { varKey } from '@/common/var';
import { asPrice, asNumber } from '@/utils/text';
import styles from '../OrderHistorySubPage.less';

export default function RefundModalContent(props) {
  const [isFullRefund, setIsFullRefund] = useState(true);
  const [isOnlyFullRefund, setIsOnlyFullRefund] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [isFullClawback, setIsFullClawback] = useState(true);
  const [clawbackAmount, setClawbackAmount] = useState(0);
  const [minusPv, setMinusPv] = useState(0);
  const [minusCv, setMinusCv] = useState(0);
  const [isRefunding, setIsRefunding] = useState(false);

  const onRefundDone = () => {
    setIsRefunding(false);
    SuccessNotification('Order refunded');
    props.onDone();
  };

  const onRefundFail = () => {
    setIsRefunding(false);
  };

  const handleRefund = () => {
    if (
      !isFullRefund &&
      (refundAmount === 0 ||
        Number(refundAmount) > Number(props.data.order_total_amount) ||
        Number.isNaN(refundAmount))
    ) {
      message.error('Please input refund amount more than 0 and less than order total amount');
      return;
    }
    if (!isFullClawback && (clawbackAmount === 0 || Number.isNaN(clawbackAmount))) {
      message.error('Please input clawback amount more than 0');
      return;
    }
    setIsRefunding(true);
    const data = {
      is_full_refund: isFullRefund,
      is_full_clawback: isFullClawback,
      refund_amount: refundAmount,
      clawback_amount: clawbackAmount,
      minus_pv: minusPv,
      minus_cv: minusCv,
    };
    refundOrderApi(props.data.user_id, props.data.id, data, onRefundDone, onRefundFail);
  };

  useEffect(() => {
    setMinusPv(props.data.order_total_pv);
    setMinusCv(props.data.order_total_cv);
    setIsFullRefund(true);
    setIsFullClawback(true);
    setClawbackAmount(0);
    if (varKey('order.isPc', props.data.is_pc) === 'yes') {
      setIsOnlyFullRefund(true);
    }
  }, [props.data]);

  return (
    <div className={styles.refundContainer}>
      <Row className={styles.refundRow} gutter={[16, 4]}>
        <Col xs={24}>
          <label>Order Number:&nbsp;</label>
          <span className={styles.refundOrderNum}>#{props.data.order_number}</span>
          &nbsp;&nbsp;&nbsp;
          <label>Order Amount:&nbsp;</label>
          <span className={styles.refundOrderNum}>{asPrice(props.data.order_total_amount)}</span>
          &nbsp;&nbsp;&nbsp;
          <label>PV:&nbsp;</label>
          <span className={styles.refundOrderNum}>{asNumber(props.data.order_total_pv)}</span>
          &nbsp;&nbsp;&nbsp;
          <label>CV:&nbsp;</label>
          <span className={styles.refundOrderNum}>{asNumber(props.data.order_total_cv)}</span>
        </Col>
        <Col xs={24}>
          <Radio checked={isFullRefund} onChange={(e) => setIsFullRefund(e.target.checked)}>
            Full Refund
          </Radio>
          &nbsp;
          <Radio
            checked={!isFullRefund}
            onChange={(e) => setIsFullRefund(!e.target.checked)}
            disabled={isOnlyFullRefund}
          >
            Partial Refund
          </Radio>
        </Col>
        {!isFullRefund && (
          <Col xs={24}>
            <label>Partial Refund Amount:&nbsp;</label>
            <Input
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
            />
          </Col>
        )}
        <Col xs={24} style={{ marginTop: 8 }}>
          <Radio checked={isFullClawback} onChange={(e) => setIsFullClawback(e.target.checked)}>
            Full Clawback
          </Radio>
          &nbsp;
          <Radio checked={!isFullClawback} onChange={(e) => setIsFullClawback(!e.target.checked)}>
            Partial Clawback
          </Radio>
        </Col>
        {!isFullClawback && (
          <Col xs={24}>
            <label>Partial Clawback Amount:&nbsp;</label>
            <Input
              type="number"
              value={clawbackAmount}
              onChange={(e) => setClawbackAmount(e.target.value)}
            />
          </Col>
        )}
        <Col xs={12}>
          <label>Minus PV Amount:</label>
          <Input type="number" value={minusPv} onChange={(e) => setMinusPv(e.target.value)} />
        </Col>
        <Col xs={12}>
          <label>Minus CV Amount:</label>
          <Input type="number" value={minusCv} onChange={(e) => setMinusCv(e.target.value)} />
        </Col>
        <Col xs={24}>
          <div className={styles.refundActionRoot}>
            <Button onClick={handleRefund} loading={isRefunding}>
              Refund
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
