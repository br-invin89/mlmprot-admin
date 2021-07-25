/* eslint-disable no-nested-ternary */
import React from 'react';
import { Card, Skeleton } from '@/components';
import { asPrice } from '@/utils/text';
import styles from './StatsCard.less';

export default (props) => {
  return (
    <Card bordered className={`${styles.card}`}>
      <div className={`${styles.percentStats}`}>
        <p className={`${styles.title}`}>{props.title}</p>
        {props.showPercent && (
          <p className={`${props.percent >= 0 ? 'positive-percent' : 'negative-percent'}`}>
            {props.percent >= 0 ? `+${props.percent}` : `-${props.percent}`}
            {'%'}
          </p>
        )}
      </div>
      <h4 className={`${styles.priceText}`}>
        {!props.loading ? (
          props.hideCurrency ? (
            props.amount
          ) : (
            asPrice(props.amount)
          )
        ) : (
          <Skeleton.Input style={{ width: 100 }} active={true} />
        )}
      </h4>
    </Card>
  );
};
