import { Button as Button_ } from 'antd';
import styles from './Button.less';

export function Button({ ...props }) {
  return (
      <Button_
        type="primary"
        ghost
        {...props}
        className={`${styles.btnContainer} ${props.success ? 'ant-btn-success' : ''} ${
          props.className
        }`}
      />
  );
}
