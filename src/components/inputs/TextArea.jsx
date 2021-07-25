import { Input } from 'antd';

const { TextArea } = Input;

const TextAreaComponent = ({...props}) => {
  return <TextArea {...props} />;
};

export default TextAreaComponent;
