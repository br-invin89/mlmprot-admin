import { Select as Select_ } from 'antd';
import styles from './Input.less';

export const { Option } = Select_;
export const Select = ({ className, ...props }) => {
  return (
    <Select_
      {...props}
      className={`${styles.selectContainer} ${className}`}
      optionFilterProp="label"
    />
  );
};
