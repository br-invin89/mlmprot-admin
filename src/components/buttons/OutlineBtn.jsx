import { Button as Button_ } from '@/components';
import './Button.less';
import styles from './OutlineBtn.less';

export function OutlineBtn({ customStyle, ...props }) {
  return (
    <div className={styles.container} style={customStyle}>
      <Button_
        type="primary"
        ghost
        {...props}
        className={`${styles.btnContainer} ${props.success ? 'ant-btn-success' : ''} ${
          props.className
        }`}
      />
    </div>
  );
}
