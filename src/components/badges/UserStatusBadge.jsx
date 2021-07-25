import React from 'react';
import { snakeCase } from '@/utils/text';
import styles from './UserStatusBadge.less';

export default (props) => {
  return (
    <div className={`${props.className}`}>
      <div className={`${styles.statusTag} ${styles[snakeCase(props.status)]}`}>{props.status}</div>
    </div>
  );
};
