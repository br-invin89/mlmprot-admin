/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, Row, Spin } from '@/components';
import { t } from '@/utils/label';
import { varLabel, varColor } from '@/common/var';
import { asPrice } from '@/utils/text';
import SalesProgressPieChart from '../SalesProgressPieChart';
import styles from '../SalesReportPage.less';
import { BackgroundColor, white } from 'chalk';

const getWidth = () =>
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export default function AffiliateToCustomerCardView(props) {
  return (
    <div className={styles.affiliateToCustomerCardView}>
      {props.isLoadingUserDistribution ? (
        <Spin spinning={true} className="mb-15" />
      ) : (
        <div className={styles.salesCardMaginRight}>
          <Row className={styles.affiliateCard}>
            <h5>{t('pages.reports.affiliateToCustomer', 'Affiliate to Customer Ratio')}</h5>
          </Row>
          <Row className={`${styles.affiliateCardContent} affiliate-card-content`}>
            {props.userDistributionData &&
              props.userDistributionData.length > 0 &&
              props.userDistributionData.map((val, idx) => {
                return (
                  <>
                    <Col
                      span={24 / props.userDistributionData.length}
                      key={idx}
                      className="large-width"
                    >
                      <div className={styles.affiliateCol}>
                        <SalesProgressPieChart
                          value={val.percent}
                          fill={varColor('user.type', val.user_type)}
                        />
                        <h5>
                          {varLabel('user.type', val.user_type)
                            ? varLabel('user.type', val.user_type).split(' ')[0]
                            : ''}
                        </h5>
                      </div>
                    </Col>
                    <Col
                      span={48 / props.userDistributionData.length}
                      key={idx}
                      className="small-width"
                    >
                      <div className={styles.affiliateCol}>
                        <SalesProgressPieChart
                          value={val.percent}
                          fill={varColor('user.type', val.user_type)}
                        />
                        <h5>
                          {varLabel('user.type', val.user_type)
                            ? varLabel('user.type', val.user_type).split(' ')[0]
                            : ''}
                        </h5>
                      </div>
                    </Col>
                  </>
                );
              })}
          </Row>
          <div className={styles.affiliateTextContainer}>
            {props.userDistributionData &&
              props.userDistributionData.map((val, idx) => {
                return (
                  <div className={`${styles.affiliateNumberTextContainer}`} key={idx}>
                    <div>
                      <div className={styles.affiliateText}>
                        <div
                          className={styles.affiliateRoundContainer}
                          style={{
                            border: `2px solid ${varColor('user.type', val.user_type)}`,
                          }}
                        />
                        <span className={styles.affiliateRoundTextDesc}>
                          Active {varLabel('user.type', val.user_type)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className={styles.affiliateRoundTextVal}>
                        {asPrice(val.sales_amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
