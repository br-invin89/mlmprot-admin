/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col } from '@/components';
import { asPrice, asPercent } from '@/utils/text';
import styles from '../PayoutReportPage.less';

const PaymentLabelsCard = ({ reportSideContainerValues, colors }) => {
  return (
    <div style={{ marginTop: -3 }}>
      {reportSideContainerValues.map((val, idx) => {
        return (
          <Row justify="space-between" key={idx}>
            <Col span={11}>
              <div className={styles.labelContainer}>
                <div
                  className={styles.roundBox}
                  style={{
                    border: `2px solid ${colors[idx]}`,
                  }}
                ></div>
                <p className={styles.detailLabel}>{val.payout_provider.name}</p>
              </div>
            </Col>
            {val.amount && (
              <Col span={7}>
                <p className={styles.detailAmountLabel}>{asPrice(val.amount)}</p>
              </Col>
            )}
            <Col span={6}>
              <p className={styles.detailLabelEnd}>{asPercent(val.percent)}</p>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default PaymentLabelsCard;
