/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Popconfirm, notification, Modal, AddEditModal } from '@/components';
import { LoadingOutlined } from '@ant-design/icons';
import {
  // refundOrderApi,
  cancelOrderApi,
  reshipOrderApi,
  chargebackOrderApi,
  flagOrderApi,
  unflagOrderApi,
} from '@/services/userSearch/orderHistory';
import RecordModalContent from './RecordModalContent';
import RefundModalContent from './RefundModalContent';
import styles from '../OrderSearchResultsPage.less';

export default function ActionSection(props) {
  const [isReship, setIsReship] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  // const [isRefund, setIsRefund] = useState(false);
  const [isChargeback, setIsChargeback] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [isOpenedRefund, setIsOpenedRefund] = useState(false);

  const onDonReship = () => {
    notification.success({
      message: 'Success',
      description: 'Order reshipped',
    });
    setIsReship(false);
    props.onSearch();
  };
  const onFailReship = () => {
    setIsReship(false);
  };
  const handleReship = () => {
    setIsReship(true);
    reshipOrderApi(props.userId, props.data.id, onDonReship, onFailReship);
  };

  const onDoneCancel = () => {
    notification.success({
      message: 'Success',
      description: 'Order cancelled',
    });
    setIsCancel(false);
    props.onSearch();
  };
  const onFailCancel = () => {
    setIsCancel(false);
  };
  const handleCancel = () => {
    setIsCancel(true);
    cancelOrderApi(props.userId, props.data.id, onDoneCancel, onFailCancel);
  };

  const onDoneChargeback = () => {
    notification.success({
      message: 'Success',
      description: 'Order chargebacked',
    });
    setIsChargeback(false);
    props.onSearch();
  };
  const onFailChargeback = () => {
    setIsChargeback(false);
  };
  const handleChargeback = () => {
    setIsChargeback(true);
    chargebackOrderApi(props.userId, props.data.id, onDoneChargeback, onFailChargeback);
  };

  /*
  const onDoneRefund = () => {
    notification.success({
      message: 'Success',
      description: 'Order refunded',
    });
    setIsRefund(false);
    props.onSearch();
  };
  const onFailRefund = () => {
    setIsRefund(false);
  };
  const handleRefund = () => {
    setIsRefund(true);
    refundOrderApi(props.userId, props.data.id, onDoneRefund, onFailRefund);
  };
  */

  const onDoneFlag = () => {
    notification.success({
      message: 'Success',
      description: 'Order flagged',
    });
    setIsFlag(false);
    props.onSearch();
  };
  const onFailFlag = () => {
    setIsFlag(false);
  };
  const handleFlag = () => {
    setIsFlag(true);
    flagOrderApi(props.userId, props.data.id, onDoneFlag, onFailFlag);
  };

  const onDoneUnflag = () => {
    notification.success({
      message: 'Success',
      description: 'Order unflagged',
    });
    setIsFlag(false);
    props.onSearch();
  };
  const onFailUnflag = () => {
    setIsFlag(false);
  };
  const handleUnflag = () => {
    setIsFlag(true);
    unflagOrderApi(props.userId, props.data.id, onDoneUnflag, onFailUnflag);
  };
  const onRefundDone = () => {
    props.onSearch();
    setIsOpenedRefund(false);
  };

  return (
    <span className={`action-modal ${styles.actionB}`}>
      <Popconfirm onConfirm={handleReship}>
        <a
          href="javascript:void(0)"
          style={{ marginRight: 10, textDecoration: 'underline', color: '#1890FF' }}
        >
          {isReship ? <LoadingOutlined /> : 'Reship'}
        </a>
      </Popconfirm>
      <Popconfirm onConfirm={handleCancel}>
        <a href="javascript:void(0)" style={{ textDecoration: 'underline', color: '#1890FF' }}>
          {isCancel ? <LoadingOutlined /> : 'Cancel'}
        </a>
      </Popconfirm>
      <AddEditModal
        modalTitle={`Refund`}
        triggerLabel={'Refund'}
        triggerClass={styles.modalAction}
        open={isOpenedRefund}
        isLink
        toggle={() => setIsOpenedRefund(!isOpenedRefund)}
      >
        <RefundModalContent data={props.data} onDone={onRefundDone} />
      </AddEditModal>
      <span style={{ width: 10, display: 'inline-block' }} />
      {/*
      <Popconfirm onConfirm={handleRefund}>
        <a
          href="javascript:void(0)"
          style={{ marginRight: 10, textDecoration: 'underline', color: '#1890FF' }}
        >
          {isRefund ? <LoadingOutlined /> : 'Refund'}
        </a>
      </Popconfirm>
      */}
      <Popconfirm onConfirm={handleChargeback}>
        <a
          href="javascript:void(0)"
          style={{ marginRight: 10, textDecoration: 'underline', color: '#1890FF' }}
        >
          {isChargeback ? <LoadingOutlined /> : 'Chargeback'}
        </a>
      </Popconfirm>
      <br />
      {props.data.is_flagged === 2 && (
        <Popconfirm onConfirm={handleFlag}>
          <a
            href="javascript:void(0)"
            style={{ marginRight: 10, textDecoration: 'underline', color: '#1890FF' }}
          >
            {isFlag ? <LoadingOutlined /> : 'Flag'}
          </a>
        </Popconfirm>
      )}
      {props.data.is_flagged === 1 && (
        <Popconfirm onConfirm={handleUnflag}>
          <a
            href="javascript:void(0)"
            style={{ marginRight: 10, textDecoration: 'underline', color: '#1890FF' }}
          >
            {isFlag ? <LoadingOutlined /> : 'Unflag'}
          </a>
        </Popconfirm>
      )}
      <Modal
        modalTitle={`Details`}
        triggerLabel={'Details'}
        width={1400}
        triggerClass={styles.modalAction}
      >
        <RecordModalContent data={props.data} />
      </Modal>
    </span>
  );
}
