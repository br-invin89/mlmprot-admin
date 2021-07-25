/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { t } from '@/utils/label';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  TablePanel,
  UserAvatar,
  Tooltip,
  Input,
  StartEndDatePicker,
  OutlineBtn,
} from '@/components';
import { asPrice } from '@/utils/text';
import styles from '../ClawbackReportPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: t('common.table.user', 'User'),
      key: 'user_id',
      render: (_, record) => {
        return (
          <UserAvatar
            title={`${record.user.first_name} ${record.user.last_name}`}
            image={record.user.image}
            link={`/user/detail/${record.user.id}`}
          />
        );
      },
    },
    {
      title: t('common.table.orderNumber', 'Order Number'),
      key: 'order_id',
      render: (_, record) => {
        return <span>{record.order ? record.order.order_number : ''}</span>;
      },
    },
    {
      title: t('common.table.sourceUser', 'Source User'),
      key: 'source_user_id',
      render: (_, record) => {
        return record.source_user ? (
          <UserAvatar
            title={`${record.source_user.first_name} ${record.source_user.last_name}`}
            image={record.source_user.image}
            link={`/user/detail/${record.source_user.id}`}
          />
        ) : (
          '-'
        );
      },
    },
    {
      title: t('common.table.amount', 'Amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: t('common.table.comment', 'Comment'),
      dataIndex: 'comment',
      key: 'comment',
      render: (text) => (
        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: text }} />}>
          <div className={styles.commentText} dangerouslySetInnerHTML={{ __html: text }} />
        </Tooltip>
      ),
    },
  ];

  const [formData, setFormData] = useState({
    'user.username': '',
    'source_user.username': '',
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
  });

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({ ...props.searchParam, [field]: value });
  };

  const onDateChange = (v) => {
    if (!v) {
      setFormData({
        ...formData,
        startDate: '',
        endDate: '',
      });
      props.setSearchParam({ ...props.searchParam, created_at_range: '' });
    } else {
      setFormData({
        ...formData,
        startDate: v[0],
        endDate: v[1],
      });
      props.setSearchParam({
        ...props.searchParam,
        created_at_range: `${moment(v[0]).format('YYYY-MM-DD')}|${moment(v[1]).format(
          'YYYY-MM-DD',
        )}`,
      });
    }
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.clawbackUsers', 'Clawback Users')}
      applyPadding
      columns={columns}
      onPageChange={props.onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
      toolbar={
        <div className="toolbar-container">
          <div className={`toolbar-sub-container ${styles.headerSearch}`}>
            <Input
              size="medium"
              onChange={(e) => onFormData('user.username', e.target.value)}
              value={formData['user.username']}
              placeholder={'Username'}
            />
          </div>
          <div className={`toolbar-sub-container ${styles.headerSearch}`}>
            <Input
              size="medium"
              onChange={(e) => onFormData('source_user.username', e.target.value)}
              value={formData['source_user.username']}
              placeholder={'Source Username'}
            />
          </div>
          <div className={`toolbar-sub-container ${styles.headerSearch}`}>
            <StartEndDatePicker
              onChange={onDateChange}
              startDate={formData.startDate}
              endDate={formData.endDate}
            />
          </div>
          <div className={`toolbar-sub-container ${styles.headerSearch}`}>
            <OutlineBtn
              className="btn-34"
              loading={props.isLoading}
              onClick={() => props.loadTable(props.paginationParam, props.searchParam)}
            >
              {t('common.search', 'Search')}
            </OutlineBtn>
          </div>
        </div>
      }
    />
  );
}
