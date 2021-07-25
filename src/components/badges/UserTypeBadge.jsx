import React from 'react';
import { snakeCase } from '@/utils/text';
import styles from './UserTypeBadge.less';

export default (props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.typeTag} ${styles[snakeCase(props.type)]}`}>{props.type}</div>
    </div>
  );
};
