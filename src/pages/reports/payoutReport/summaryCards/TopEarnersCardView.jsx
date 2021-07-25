/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Card, ButtonGroup, Col, Row, Spin, Empty } from '@/components';
import { getPayoutTopEarnerApi } from '@/services/reports/payoutReport';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { asPrice } from '@/utils/text';
import { ReactComponent as Polygon } from '@/assets/icons/previous.svg';
import { ReactComponent as Polygon2 } from '@/assets/icons/next.svg';
import styles from '../PayoutReportPage.less';
import defaultUserImage from '@/assets/icons/user.svg'

const TopEarnersCardView = () => {
  const [isLoadingEarningCard, setIsLoadingEarningCard] = useState(false);
  const [type, setType] = useState('weekly');

  const [topEarningData, setTopEarningData] = useState([]);

  const getPayoutTopEarnerList = (params) => {
    setIsLoadingEarningCard(true);
    getPayoutTopEarnerApi(params, onGetSuccessTopEarner, onGetFailedTopEarner);
  };

  const onGetSuccessTopEarner = (data) => {
    setTopEarningData(data);
    setIsLoadingEarningCard(false);
  };

  const onGetFailedTopEarner = () => {
    setIsLoadingEarningCard(false);
  };

  const changEarnersType = (selectedType) => {
    setType(selectedType);
  };
  useEffect(() => {
    const params = {
      mode: type,
    };
    getPayoutTopEarnerList(params);
  }, [type]);

  return (
    <div className="top-earners">
      {isLoadingEarningCard ? (
        <Spin spinning={true} />
      ) : (
        <div className={styles.chartViewContainer}>
          <div className={`${styles.headerBox} header-box`}>
            <h4 className={styles.title}>
              {t("pages.reports.topTenEarners", "Top 10 Earners")}
            </h4>
            <div>
              <ButtonGroup
                actions={[
                  {
                    label: 'Weekly',
                    onClick: () => changEarnersType('weekly'),
                    isSelected: type === 'weekly',
                  },
                  {
                    label: 'Monthly',
                    onClick: () => changEarnersType('monthly'),
                    isSelected: type === 'monthly',
                  },
                  {
                    label: 'Yearly',
                    onClick: () => changEarnersType('yearly'),
                    isSelected: type === 'yearly',
                  },
                ]}
              />
            </div>
          </div>
          <Card className={styles.earnersCard}>
            <Row justify="space-between" className={styles.iconsContainer}>
              {topEarningData && topEarningData.length > 0 ? (
                <AwesomeSlider
                  bullets={false}
                  buttonContentLeft={<Polygon className={styles.carousalIcons} />}
                  buttonContentRight={<Polygon2 className={styles.carousalIcons} />}
                  infinite={false}
                >
                  {topEarningData &&
                    topEarningData.map((user) => {
                      return (
                        <div className={styles.cardCarousel}>
                          <Col span={24} className={styles.carousalImageCol}>
                            <Row className={styles.carousalImageRow}>
                              <Col>
                                <img
                                  width={80}
                                  height={80}
                                  src={user.user.image || defaultUserImage}
                                  className={styles.carouselImg}
                                />
                              </Col>
                              <Col>
                                <span
                                  className={styles.carousalLabel}
                                >{`${user.user.first_name} ${user.user.last_name}`}</span>
                                <p className={styles.carousalAmount}>{asPrice(user.amount)}</p>
                              </Col>
                            </Row>
                          </Col>
                        </div>
                      );
                    })}
                </AwesomeSlider>
              ) : (
                <Col span={24}>
                  <Empty style={{ marginTop: '-10px' }} />
                </Col>
              )}
            </Row>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TopEarnersCardView;
