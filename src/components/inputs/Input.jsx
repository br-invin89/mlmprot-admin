import { Input as Input_ } from 'antd';
import styles from './Input.less';

export const Input = ({ error, className, ...props }) => {
  return (
    <>
      <Input_ {...props} className={`${className} ${styles.input} ${error && 'has-error'}`} />
      {error && <span className="error">{error}</span>}
    </>
  );
};
