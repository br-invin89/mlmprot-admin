/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { Row, Col, Progress, Skeleton, StartEndDatePicker } from '@/components';
import star from '@/assets/icons/start.svg';
import tag from '@/assets/icons/tag.svg';
import userIcon from '@/assets/icons/user-icon.svg';
import styles from './DashboardPage.less';
import { getDashboardActiveUserCountApi } from '@/services/dashboard';
import moment from 'moment';
import { t } from '@/utils/label';

export default function CustomersBarChart() {
  const customerDataLayout = {
    1: {
      title: 'Affiliate',
      icon: userIcon,
      strokeColor: '#7CA7FF',
    },
    2: {
      title: 'Customer',
      icon: star,
      strokeColor: '#5AC8FA',
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [customerData, setCustomerData] = useState([]);

  const onGetCustomerData = (data) => {
    const group = data.group;
    const totalUsers = data.total_users;
    const graphData = [];
    Object.keys(customerDataLayout).map((key) =>
      graphData.push({
        ...customerDataLayout[key],
        value: group[key],
        percent: (group[key] * 100) / totalUsers,
      }),
    );
    setCustomerData(graphData);
    setIsLoading(false);
  };

  const onFailCustomerData = () => {
    setIsLoading(false);
  };

  const loadCustomerData = (dateRange) => {
    setIsLoading(true);
    const params = {
      date_range: dateRange,
    };
    getDashboardActiveUserCountApi(params, onGetCustomerData, onFailCustomerData);
  };

  const onChangeDateRanage = (date) => {
    let startDate0 = moment().subtract(30, 'days');
    let endDate0 = moment();
    if (date) {
      startDate0 = date[0];
      endDate0 = date[1];
    }
    setStartDate(startDate0);
    setEndDate(endDate0);
    const dateRange = `${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`;
    loadCustomerData(dateRange);
  };

  useEffect(() => {
    const startDate0 = moment().subtract(30, 'days');
    const endDate0 = moment();
    const dateRange = `${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`;
    loadCustomerData(dateRange);
  }, []);

  return (
    <>
      <Row className={`${styles.payoutContainer} dashboard-customers-chart`}>
        <Col xs={24} lg={24} xxl={10}>
          <div className={`${styles.title}`}>
            {t("pages.dashboard.affiliatesCustomer", "Affiliates & Customers")}
          </div>
        </Col>
        <Col xs={24} lg={24} xxl={14}>
          <StartEndDatePicker value={[startDate, endDate]} onChange={onChangeDateRanage} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {isLoading ? (
            <Skeleton active={true} size="large" />
          ) : (
            customerData.map((data, index) => (
              <CustomerBar
                key={index}
                title={data.title}
                value={data.value}
                strokeColor={data.strokeColor}
                icon={data.icon}
                percent={data.percent}
              />
            ))
          )}
        </Col>
      </Row>
    </>
  );
}

const CustomerBar = (props) => {
  return (
    <div className={`${styles.customerContainer}`}>
      <Row>
        <Col span={24}>
          <div className={`${styles.progressContainer}`}>
            <span className={`${styles.progressIconContainer}`}>
              <img src={props.icon} width={16} height={16} />
              <span className={`${styles.progressIconText}`}>{props.title}</span>
            </span>
            <span className={`${styles.progressLabel}`}>{props.value}</span>
          </div>
          <Progress percent={props.percent} showInfo={false} strokeColor={props.strokeColor} />
        </Col>
      </Row>
    </div>
  );
};
