/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { t } from '@/utils/label';
import { TablePanel, Modal, UserAvatar, UserStatusBadge, Tooltip } from '@/components';
import { asPrice, asDate, asNumber } from '@/utils/text';
import { varLabel } from '@/common/var';
import styles from '../OrderSearchResultsPage.less';
import DetailModalContent from './DetailModalContent';
// import RecordModalContent from './RecordModalContent';
import Toolbar from './Toolbar';
import ActionSection from './ActionSection';

export default function TableView(props) {
  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (text, record) => (
        <Modal
          modalTitle={
            <div>
              <div className={styles.detailModalTitle}>
                Order #{text}
                <div style={{ width: 12 }} />
                <UserStatusBadge status={varLabel('order.status', record.status)} />
              </div>
              <div>Ordered On {asDate(record.created_at)}</div>
            </div>
          }
          triggerLabel={text}
          width={800}
        >
          <DetailModalContent data={record} />
        </Modal>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div className={styles.actionGroup}>
          <ActionSection
            userId={props.userId}
            data={record}
            onSearch={() => props.loadTable(props.paginationParam)}
          />
        </div>
      ),
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <div className={`d-flex align-items-center`}>
          <UserAvatar
            image={record.user.image}
            title={`${record.user.first_name} ${record.user.last_name}`}
            link={`/user/detail/${record.user.id}`}
          />
        </div>
      ),
    },
    {
      title: 'Ordered On',
      dataIndex: 'created_at',
      key: 'date',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: 'Merchant',
      key: 'merchant_name',
      render: (_, record) => <span>{record.merchant ? record.merchant.name : '-'}</span>,
    },
    {
      title: 'Merchant Response',
      dataIndex: 'merchant_response',
      key: 'merchant_response',
      render: (text) => <UserStatusBadge status={varLabel('order.merchantResponse', text)} />,
    },
    {
      title: 'Merchant Trans. ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'Tax Trans. Response',
      dataIndex: 'tax_response',
      key: 'tax_response',
      render: (text) => {
        if (text) {
          return <UserStatusBadge status={text === 1 ? 'Success' : 'Failed'} />;
        }
        return <span>-</span>;
      },
    },
    {
      title: 'Tax Trans. ID',
      dataIndex: 'tax_transaction_id',
      key: 'tax_transaction_id',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'Tracking Number',
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      render: (text) =>
        text ? (
          <Link style={{ textDecoration: 'underline' }} to="">
            {text}
          </Link>
        ) : (
          <span>{'-'}</span>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <Tooltip placement="bottom" title={record.note}>
            <span>
              <UserStatusBadge status={varLabel('order.status', text)} />
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'order_total_amount',
      key: 'order_total_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'PV',
      dataIndex: 'order_total_pv',
      key: 'order_total_pv',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'CV',
      dataIndex: 'order_total_cv',
      key: 'order_total_cv',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'PC',
      dataIndex: 'pc_amount',
      key: 'pc_amount',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'TC',
      dataIndex: 'tc_amount',
      key: 'tc_amount',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'Cost',
      dataIndex: 'order_total_cost',
      key: 'order_total_cost',
      render: (text) => <span>{text ? asPrice(text) : '-'}</span>,
    },
    {
      title: 'Tax Amount',
      dataIndex: 'tax_amount',
      key: 'tax_amount',
      render: (text) => <span>{text ? asPrice(text) : '-'}</span>,
    },
    {
      title: 'Shipping Price',
      dataIndex: 'shipping_price',
      key: 'shipping_price',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Discount Price',
      dataIndex: 'order_total_discount',
      key: 'order_total_discount',
      render: (text) => <span>{text ? asPrice(text) : '-'}</span>,
    },
    {
      title: 'Refunded Amount',
      dataIndex: 'refunded_amount',
      key: 'refunded_amount',
      render: (text) => <span>{text ? asPrice(text) : '-'}</span>,
    },
    {
      title: 'Dist Center',
      dataIndex: 'dist_center',
      key: 'dist_center',
      render: (_, record) => <span>{(record.dist_center && record.dist_center.name) || '-'}</span>,
    },
    {
      title: 'Order From',
      dataIndex: 'order_from',
      key: 'order_from',
      render: (text) => <span>{varLabel('order.orderFrom', text)}</span>,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (text) => <span>{varLabel('order.source', text)}</span>,
    },
    {
      title: 'Last CC 4',
      dataIndex: 'last_cc_4',
      key: 'last_cc_4',
      render: (text) => <span>{text === 'none' ? 'N/A' : text}</span>,
    },
    {
      title: 'Risk Score',
      dataIndex: 'risk_score',
      key: 'risk_score',
      render: (text) => <span>{asNumber(text)}</span>,
    },
    {
      title: 'Is Flagged?',
      dataIndex: 'is_flagged',
      key: 'is_flagged',
      render: (text) => (
        <span style={{ width: '100%', textAlign: 'center', display: 'block' }}>
          {text === 1 ? (
            <UserStatusBadge status={varLabel('order.isFlagged', text)} />
          ) : (
            varLabel('order.isFlagged', text)
          )}
        </span>
      ),
    },
    {
      title: 'Order IP Address',
      dataIndex: 'order_ip_address',
      key: 'order_ip_address',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      title: 'Confirmed On',
      dataIndex: 'confirmed_at',
      key: 'confirmed_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Shipped On',
      dataIndex: 'shipped_at',
      key: 'shipped_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Failed On',
      dataIndex: 'failed_at',
      key: 'failed_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Refunded On',
      dataIndex: 'refunded_at',
      key: 'refunded_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Partial Refunded On',
      dataIndex: 'partial_refunded_at',
      key: 'partial_refunded_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Resent On',
      dataIndex: 'resent_at',
      key: 'resent_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Cancelled On',
      dataIndex: 'cancelled_at',
      key: 'cancelled_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Chargebacked On',
      dataIndex: 'chargebacked_at',
      key: 'chargebacked_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Flagged On',
      dataIndex: 'flagged_at',
      key: 'flagged_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
    {
      title: 'Unflagged On',
      dataIndex: 'unflagged_at',
      key: 'unflagged_at',
      render: (text) => <span>{text ? asDate(text) : '-'}</span>,
    },
  ];

  const [hideColumns, setHideColumns] = useState([]);

  const onPageChange = (currentPage) => {
    const paginationParam = { ...props.paginationParam, currentPage };
    props.loadTable(paginationParam);
  };

  const toggleColumns = (hideColumns0) => {
    const cookies = new Cookies();
    cookies.set('bepicAdminOrderSearchHidenColumns', hideColumns0, { path: '/', maxAge: 2592000 });
  };

  useEffect(() => {
    const cookies = new Cookies();
    const hideColumns0 = cookies.get('bepicAdminOrderSearchHidenColumns');
    if (hideColumns0 && hideColumns0.length > 0) {
      setHideColumns(hideColumns0);
    } else {
      setHideColumns([
        'merchant_name',
        'merchant_response',
        'transaction_id',
        'tax_response',
        'tax_transaction_id',
        'order_total_cost',
        'tax_amount',
        'shipping_price',
        'order_total_discount',
        'refunded_amount',
        'dist_center',
        'order_ip_address',
        'confirmed_at',
        'shipped_at',
        'failed_at',
        'refunded_at',
        'partial_refunded_at',
        'resent_at',
        'cancelled_at',
        'chargebacked_at',
        'flagged_at',
        'unflagged_at',
      ]);
    }
  }, []);

  return (
    <TablePanel
      title={t('pages.userSearch.orderHistory', 'Order History')}
      toolbar={<Toolbar searchParam={props.searchParam} setSearchParam={props.setSearchParam} />}
      showHeaderIcon
      loading={props.isLoading}
      data={props.tableData}
      columns={columns}
      hideColumns={hideColumns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      toggleColumns={toggleColumns}
    />
  );
}
