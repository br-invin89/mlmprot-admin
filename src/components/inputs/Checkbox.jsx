import { Checkbox } from 'antd';

export default ({ label, ...props }) => {
  return <Checkbox {...props}>{label}</Checkbox>;
};
