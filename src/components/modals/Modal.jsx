/* eslint-disable no-undef */
/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import { OutlineBtn } from '@/components';
import { Modal } from 'antd';

const CustomModal = (props) => {
  const {
    triggerLabel,
    triggerClass,
    modalClass,
    modalTitle,
    children,
    icon,
    width,
    isButton,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      {icon ? (
        <span onClick={toggle}>{icon}</span>
      ) : isButton ? (
        <OutlineBtn style={{ minWidth: 100 }} onClick={toggle}>
          {triggerLabel}
        </OutlineBtn>
      ) : (
        <a
          href="#"
          className={triggerClass}
          color="danger"
          onClick={toggle}
          style={{ textDecoration: 'underline' }}
        >
          {triggerLabel}
        </a>
      )}
      <Modal
        centered
        title={modalTitle}
        width={width ? width : '600px'}
        visible={modal}
        onCancel={toggle}
        className={`${modalClass} modal-responsive`}
        footer={null}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
