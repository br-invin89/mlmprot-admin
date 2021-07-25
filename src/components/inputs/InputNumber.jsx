import { InputNumber as InputNumber_ } from 'antd';
import styles from './Input.less';

export const InputNumber = ({ error, className, ...props }) => {
  return (
    <>
      <InputNumber_ {...props} className={`${className} ${styles.input} ${error && 'has-error'}`} />
      {error && <span className="error">{error}</span>}
    </>
  );
};
