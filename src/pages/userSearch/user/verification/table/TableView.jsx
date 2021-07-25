/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Card, TablePanel, Button, StartEndDatePicker, Input, Popover } from '@/components';
import { asDateTime } from '@/utils/text';
import { UserStatusBadge } from '@/components';
import { varLabel } from '@/common/var';
import { getVerificationsApi } from '@/services/userSearch/verification';
import AcceptBtn from './AcceptBtn';
import RejectBtn from './RejectBtn';
import styles from '../VerificationSubPage.less';

export default function TableView(props) {
  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: 'Requested At',
      dataIndex: 'requested_at',
      render: (text) => <span>{text ? asDateTime(text) : '-'}</span>,
    },
    {
      title: 'Verified At',
      dataIndex: 'accepted_at',
      render: (text) => <span>{text ? asDateTime(text) : '-'}</span>,
    },
    {
      title: 'ID Photo',
      dataIndex: 'id_photo',
      render: (text) =>
        text ? (
          <Popover content={<img src={text} width={400} />}>
            <div className={styles.avatarImage}>
              <img src={text} className={`${styles.productImage}`} />
            </div>
          </Popover>
        ) : (
          '-'
        ),
    },
    {
      title: 'Credit Card Photo',
      dataIndex: 'cc_photo',
      render: (text) =>
        text ? (
          <Popover content={<img src={text} width={400} />}>
            <div className={styles.avatarImage}>
              <img src={text} className={`${styles.productImage}`} />
            </div>
          </Popover>
        ) : (
          '-'
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => <UserStatusBadge status={varLabel('userVerification.status', text)} />,
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className={styles.actionGroup}>
          {record.status === 1 && (
            <>
              <AcceptBtn
                userId={props.userId}
                verificationId={record.id}
                // eslint-disable-next-line no-use-before-define
                loadTableData={() => loadTableData(paginationParam)}
              />
              <RejectBtn
                userId={props.userId}
                verificationId={record.id}
                // eslint-disable-next-line no-use-before-define
                loadTableData={() => loadTableData(paginationParam)}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  const onGetTableData = (data) => {
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTableData = (paginationParam0) => {
    setIsLoading(true);
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    };
    getVerificationsApi(props.userId, params, onGetTableData, onFailTableData);
  };

  const onPageChange = (currentPage) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage,
    };
    loadTableData(paginationParam0);
  };

  useEffect(() => {
    if (props.userId) {
      loadTableData(paginationParam);
    }
  }, [props.userId]);

  return (
    <TablePanel
      title={t('pages.userSearch.verification', 'Verification')}
      data={tableData}
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={paginationParam}
      loading={isLoading}
    />
  );
}
