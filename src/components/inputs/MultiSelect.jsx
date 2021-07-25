/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Select, Tag } from 'antd';
import styles from './Input.less'

const { Option } = Select;

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  return (
    <Tag
      color={'#0599ca'}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, marginBottom: 3 }}
    >
      {label}
    </Tag>
  );
};

const MultiSelect = ({  options = [], ...props }) => {
  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      className={`${styles.selectContainer}`}
      {...props}
      optionFilterProp="label"
      options={options}
    />
  )
};

export default MultiSelect;
