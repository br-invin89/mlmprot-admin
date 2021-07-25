import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Card, OutlineBtn, Row, Col, message } from '@/components';
import { saveSearchParam } from '@/utils/localStorageMore/userSearch';
import GeneralSubForm from './subforms/GeneralSubForm';
import CCSubForm from './subforms/CCSubForm';
import ShippingSubForm from './subforms/ShippingSubForm';
import OrderSubForm from './subforms/OrderSubForm';
// import EnrollmentSubForm from './subforms/EnrollmentSubForm';
import styles from './UserSearchPage.less';
import { t } from '@/utils/label';

const UserSearchForm = (props) => {
  const [searchParam, setSearchParam] = useState({
    uuid: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    type: null,
    status: null,
    risk_score: null,
    ip_risk_score: null,
    is_payout_allowed: null,
    verification_status: null,
    tax_status: null,
    show_leaderboard: null,
    rank_id: null,
    sponsor_uuid: null,
    parent_uuid: null,
    first_order_ip: null,
    created_at: null,
    'billing_detail.last_cc_4': null,
    'billing_detail.billing_country': null,
    'order.order_number': null,
    'order.status': null,
    'order.order_ip_address': null,
    'order.tracking_number': null,
    'order.last_cc_4': null,
    'order.shipping_country': null,
    'order.shipping_state': null,
    'order.shipping_zipcode': null,
    'order.transaction_id': null,
  });

  const validateSearch = () => {
    if (
      (!searchParam.uuid || !searchParam.uuid.trim()) &&
      (!searchParam.username || !searchParam.username.trim()) &&
      (!searchParam.email || !searchParam.email.trim()) &&
      (!searchParam.first_name || !searchParam.first_name.trim()) &&
      (!searchParam.last_name || !searchParam.last_name.trim()) &&
      !searchParam.type &&
      !searchParam.status &&
      (!searchParam.risk_score || !searchParam.risk_score.trim()) &&
      (!searchParam.ip_risk_score || !searchParam.ip_risk_score.trim()) &&
      (!searchParam.is_payout_allowed || !searchParam.is_payout_allowed.trim()) &&
      !searchParam.verification_status &&
      !searchParam.tax_status &&
      !searchParam.show_leaderboard &&
      !searchParam.rank_id &&
      (!searchParam.sponsor_uuid || !searchParam.sponsor_uuid.trim()) &&
      (!searchParam.parent_uuid || !searchParam.parent_uuid.trim()) &&
      (!searchParam.first_order_ip || !searchParam.first_order_ip.trim()) &&
      !searchParam.created_at &&
      (!searchParam['billing_detail.last_cc_4'] ||
        !searchParam['billing_detail.last_cc_4'].trim()) &&
      !searchParam['billing_detail.billing_country'] &&
      (!searchParam['order.order_number'] || !searchParam['order.order_number'].trim()) &&
      !searchParam['order.status'] &&
      (!searchParam['order.order_ip_address'] || !searchParam['order.order_ip_address'].trim()) &&
      (!searchParam['order.tracking_number'] || !searchParam['order.tracking_number'].trim()) &&
      (!searchParam['order.last_cc_4'] || !searchParam['order.last_cc_4'].trim()) &&
      !searchParam['order.shipping_country'] &&
      (!searchParam['order.shipping_state'] || !searchParam['order.shipping_state'].trim()) &&
      (!searchParam['order.shipping_zipcode'] || !searchParam['order.shipping_zipcode'].trim()) &&
      (!searchParam['order.transaction_id'] || !searchParam['order.transaction_id'].trim())
    ) {
      message.error(
        t(
          'pages.userSearch.pleaseFillAtLeastOneSearchFields',
          'Please fill at least one search fields',
        ),
      );
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!validateSearch()) return;
    saveSearchParam(searchParam);
    setTimeout(() => {
      props.history.push('/user/results');
    }, 500);
  };

  const onPressEnter = () => {
      handleSearch();
  };

  return (
    <Row>
      <Col span={24}>
        <Card colSpan={24} className={`${styles.card}`}>
          <div>
            <GeneralSubForm
              searchParam={searchParam}
              setSearchParam={setSearchParam}
              onPressEnter={onPressEnter}
            />
          </div>
          <Row gutter={[24, 0]}>
            <Col xs={24}>
              <CCSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            {/* <Col md={12} xs={24}>
              <ShippingSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col> */}
            <Col xs={24}>
              <OrderSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col>
          </Row>
          {/*
          <div>
            <EnrollmentSubForm 
              searchParam={searchParam}
              setSearchParam={setSearchParam}
            />
          </div>
          */}
        </Card>
        <div className={`${styles.userSearchBtn}`}>
          <OutlineBtn onClick={handleSearch} size="large" icon={<SearchOutlined />}>
            {t('pages.userSearch.searchBtn', 'Search')}
          </OutlineBtn>
        </div>
      </Col>
    </Row>
  );
};

export default withRouter(UserSearchForm);
