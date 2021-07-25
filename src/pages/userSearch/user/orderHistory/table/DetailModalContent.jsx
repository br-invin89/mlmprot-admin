import React, { useEffect, useState } from 'react';
import styles from '../OrderHistorySubPage.less';
import { Table, Spin } from '@/components';
import { getOrderDetailApi } from '@/services/userSearch/orderHistory';
import { asPrice } from '@/utils/text';

export default function DetailModal(props) {
  const [orderData, setOrderData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: '#',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Name',
      render: (_, data) => <span>{data.product.title}</span>,
    },
    {
      title: 'Line Total',
      dataIndex: 'total_amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'QTY',
      dataIndex: 'quantity',
    },
    {
      title: 'PV',
      dataIndex: 'total_pv',
    },
    {
      title: 'CV',
      dataIndex: 'total_cv',
    },
    {
      title: 'PC',
      dataIndex: 'pc_amount',
    },
    {
      title: 'Shipping Price',
      dataIndex: 'shipping_price',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Discount Amount',
      dataIndex: 'total_discount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
    {
      title: 'Promotion Code',
      render: (_, data) => <span>{data.promotion ? data.promotion.discount_code : '-'}</span>,
    },
  ];

  const onGetDetail = (data) => {
    setIsLoading(false);
    setOrderData(data);
  };

  const onFailDetail = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.data) {
      setOrderData(undefined);
      setIsLoading(true);
      getOrderDetailApi(props.userId, props.data.id, onGetDetail, onFailDetail);
    }
  }, [props.data]);

  return (
    <div className={styles.detailContainer}>
      {orderData && (
        <>
          <div className={styles.detailHeader}>
            <div>
              Tracking Number:&nbsp;
              <a>{orderData.tracking_number || '-'}</a>
            </div>
          </div>
          <Table
            className={styles.detailTable}
            columns={columns}
            dataSource={orderData.details}
            pagination={false}
          />
          <div className={styles.detailFooter}>
            <p>
              <strong>Total:&nbsp;</strong>
              <span>&nbsp;</span>
              {asPrice(orderData.order_total_amount)}
              &nbsp;&nbsp;&nbsp;
              <span>PV:&nbsp;</span>
              {orderData.order_total_pv} &nbsp;&nbsp;&nbsp;
              <span>CV:&nbsp;</span>
              {orderData.order_total_cv} &nbsp;&nbsp;&nbsp;
              <span>PC:&nbsp;</span>
              {orderData.pc_amount || '-'}
              &nbsp;&nbsp;&nbsp;
              <span>TC:&nbsp;</span>
              {orderData.tc_amount || '-'}
              <br />
              <span>Shipping Price:&nbsp;</span>
              {asPrice(orderData.shipping_price)}
              &nbsp;&nbsp;&nbsp;
              <span>Tax Amount:&nbsp;</span>
              {asPrice(orderData.tax_amount)}
              &nbsp;&nbsp;&nbsp;
              <span>Discount Amount:&nbsp;</span>
              {asPrice(orderData.order_total_discount)}
              &nbsp;&nbsp;&nbsp;
              <span>Refunded Amount:&nbsp;&nbsp;</span>
              {asPrice(orderData.refunded_amount) || '-'}
            </p>
          </div>
        </>
      )}
      <Spin spinning={isLoading} />
    </div>
  );
}
