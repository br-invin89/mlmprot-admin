/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { Button, Modal } from 'antd';
import { OutlineBtn } from '@/components';

const AddEditModal = (props) => {
  const {
    isEdit,
    editText,
    triggerLabel,
    modalClass,
    modalTitle,
    children,
    width,
    open,
    toggle,
    onClose,
    isLink,
    editAction,
  } = props;

  return (
    <div>
      {isLink ? (
        <a
          href="javascript:void(0)"
          onClick={toggle}
          style={{ textDecoration: 'underline', marginLeft: 15 }}
          className="pl-3 pr-3"
        >
          {triggerLabel}
        </a>
      ) : isEdit ? (
        <OutlineBtn
          onClick={() => {
            editAction();
            toggle();
          }}
        >
          {editText || 'Edit'}
        </OutlineBtn>
      ) : (
        <OutlineBtn
          onClick={toggle}
        >
          {triggerLabel}
        </OutlineBtn>
      )}
      <Modal
        centered
        title={modalTitle}
        width={width ? width : '600px'}
        visible={open}
        footer={null}
        onCancel={toggle}
        afterClose={onClose}
        className={`${modalClass} modal-responsive`}
      >
        {children}
      </Modal>
    </div>
  );
};

export default AddEditModal;
