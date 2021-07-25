/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import { TablePanel, Popconfirm, OutlineBtn, Popover } from '@/components';
import { asDateTime } from '@/utils/text';
import styles from '../FlaggedUsersPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
          <span>
            <Link style={{ textDecoration: 'underline' }} to={`/user/detail/${text}`}>
              {record.uuid}
            </Link>
          </span>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_, record) => <span>{`${record.first_name} ${record.last_name}`}</span>,
    },
    {
      title: 'Requested At',
      dataIndex: 'verification_requested_at',
      key: 'verification_requested_at',
      render: (text) => {
        return <span>{asDateTime(text)}</span>;
      },
    },
    {
      title: 'ID Photo',
      dataIndex: 'verifications',
      key: 'verifications',
      render: (text) => {
        return (
          <span>
            {text && text.length > 0 ? (
              <Popover content={<img src={text[0].id_photo} width={400} />}>
                <div className={styles.avatarImage}>
                  <img src={text[0].id_photo} className={`${styles.productImage}`} />
                </div>
              </Popover>
            ) : (
              '-'
            )}
          </span>
        );
      },
    },
    {
      title: 'CC Photo',
      dataIndex: 'verifications',
      key: 'verifications',
      render: (text) => {
        return (
          <span>
            {text && text.length > 0 ? (
              <Popover content={<img src={text[0].cc_photo} width={400} />}>
                <div className={styles.avatarImage}>
                  <img src={text[0].cc_photo} className={`${styles.productImage}`} />
                </div>
              </Popover>
            ) : (
              '-'
            )}
          </span>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <div style={{ display: 'flex' }}>
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.acceptFlaggedUser(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn loading={props.isLoadingAccept && id === props.flaggedId}>
                Accept
              </OutlineBtn>
            </Popconfirm>
            <div style={{ width: 12 }} />
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.rejectFlaggedUser(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn danger loading={props.isLoadingReject && id === props.flaggedId}>
                Reject
              </OutlineBtn>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.fraudMangement.flaggedUsers', 'Flagged Users')}
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
