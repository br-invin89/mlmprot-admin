/* eslint-disable no-undef */
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { Popconfirm as Popconfirm_ } from 'antd';

export function Popconfirm({ children, ...props }) {
  return (
    <Popconfirm_
      cancelButtonProps={{ ghost: true, danger: true, size: 'small' }}
      okButtonProps={{ ghost: true, success: true, size: 'small' }}
      okText={props.okText || 'Yes'}
      cancelText={props.cancelText || 'No'}
      title={props.title || 'Are you sure?'}
      {...props}
    >
      {children}
    </Popconfirm_>
  );
}
