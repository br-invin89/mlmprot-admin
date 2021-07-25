import React from 'react';
import { Alert } from 'antd';
import styles from './Alert.less';

export default (props) => {
  return (
    <div className={`${styles.alertContainer}`}>
      <Alert
        description={props.content}
        type={props.color}
        message={props.title}
        showIcon={!props.hideIcon}
      />
    </div>
  );
};
