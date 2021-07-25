/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable dot-notation */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { getPayoutProvidersApi } from '@/services/reports/payoutReport';
import { Col, Row, Card, ButtonGroup, ColorPieChart, Empty, Spin } from '@/components';
import { asPrice } from '@/utils/text';
import PaymentLabelsCard from './PaymentLabelsCard';
import styles from '../PayoutReportPage.less';

let pieColors = ['#DE1463', '#40587D', '#FFD400', '#289DF5', '#45B854', '#8033D2'];

const PaymentCardView = () => {
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [type, setType] = useState('weekly');

  const [paymentData, setPaymentData] = useState({});
  const [totalPayment, setTotalPayment] = useState(0);

  const getPaymentProvider = (params) => {
    setIsLoadingPayment(true);
    getPayoutProvidersApi(params, onGetSuccessPaymentProvider, onGetFailedPaymentProvider);
  };

  const onGetSuccessPaymentProvider = (data) => {
    const payment = data.groups
    payment && payment.map((d) => {
      d['name'] = d.payout_provider.name
    })
    setPaymentData(payment);
    setTotalPayment(data.total_amount);
    setIsLoadingPayment(false);
  };

  const onGetFailedPaymentProvider = () => {
    setIsLoadingPayment(false);
  };

  const changPayoutType = (selectedType) => {
    setType(selectedType);
  };

  useEffect(() => {
    let params = {
      mode: type,
    };
    getPaymentProvider(params);
  }, [type]);

  return (
    <div className="payment-card">
      {isLoadingPayment ? (
        <Spin spinning={true} />
      ) : (
        <div className={styles.chartViewContainer}>
          <div className={`${styles.headerBox} header-box`}>
            <h4 className={`${styles.title}`}>
              {t("pages.reports.payments", "Payment")}
            </h4>
            <div>
              <ButtonGroup
                actions={[
                  {
                    label: 'Weekly',
                    onClick: () => changPayoutType('weekly'),
                    isSelected: type === 'weekly',
                  },
                  {
                    label: 'Monthly',
                    onClick: () => changPayoutType('monthly'),
                    isSelected: type === 'monthly',
                  },
                  {
                    label: 'Yearly',
                    onClick: () => changPayoutType('yearly'),
                    isSelected: type === 'yearly',
                  },
                ]}
              />
            </div>
          </div>
          <Card className={styles.pieCard}>
            <Row justify="center">
              <Col>
                <div className={styles.pieChartContainer}>
                  {paymentData && paymentData.length > 0 ? (
                    <ColorPieChart
                      data={paymentData}
                      angleField={'percent'}
                      colorField={'name'}
                      colors={pieColors}
                    />
                  ) : (
                    <Empty />
                  )}
                </div>
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <p className={styles.amountTypo}>{asPrice(totalPayment)}</p>
              </Col>
            </Row>
          </Card>
          {paymentData && paymentData.length > 0 && (
            <Card className={`card-payment ${styles.pieChartDetails}`}>
              <PaymentLabelsCard colors={pieColors} reportSideContainerValues={paymentData} />
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentCardView;
