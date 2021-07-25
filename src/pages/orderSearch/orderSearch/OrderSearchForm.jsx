import React, { useState } from 'react';
import { t } from '@/utils/label';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Card, OutlineBtn, Row, Col, message } from '@/components';
import { saveSearchParam } from '@/utils/localStorageMore/orderSearch';
import GeneralSubForm from './subforms/GeneralSubForm';
import ShippingSubForm from './subforms/ShippingSubForm';
import OrderSubForm from './subforms/OrderSubForm';
import PaymentSubForm from './subforms/PaymentSubForm';
import FraudSubForm from './subforms/FraudSubForm';
import styles from './OrderSearchPage.less';

const OrderSearchForm = (props) => {
  const [searchParam, setSearchParam] = useState({
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    user_type: null,
    shipping_country: null,
    dist_center_id: null,
    order_from: null,
    source: null,
    order_ip_address: null,
    tracking_number: null,
    order_number: null,
    status: null,
    merchant_id: null,
    merchant_response: null,
    transaction_id: null,
    shipstation_order_key: null,
    shipstation_order_id: null,
    is_flagged: null,
    is_digital: null,
    created_at_range: null,
    confirmed_at_range: null,
    shipped_at_range: null,
    failed_at_range: null,
    refunded_at_range: null,
    resent_at_range: null,
    cancelled_at_range: null,
    chargebacked_at_range: null,
    flagged_at_range: null,
    unflagged_at_range: null,
    order_total_amount_range: null,
    risk_score_range: null,
  });

  const validateSearch = () => {
    if (
      !searchParam.username &&
      !searchParam.first_name &&
      !searchParam.last_name &&
      !searchParam.email &&
      !searchParam.phone &&
      !searchParam.user_type &&
      !searchParam.shipping_country &&
      !searchParam.dist_center_id &&
      !searchParam.order_from &&
      !searchParam.order_number &&
      !searchParam.source &&
      !searchParam.status &&
      !searchParam.order_ip_address &&
      !searchParam.tracking_number &&
      !searchParam.merchant_id &&
      !searchParam.merchant_response &&
      !searchParam.transaction_id &&
      !searchParam.shipstation_order_key &&
      !searchParam.shipstation_order_id &&
      !searchParam.is_flagged &&
      !searchParam.is_digital &&
      !searchParam.created_at_range &&
      !searchParam.confirmed_at_range &&
      !searchParam.shipped_at_range &&
      !searchParam.failed_at_range &&
      !searchParam.refunded_at_range &&
      !searchParam.resent_at_range &&
      !searchParam.cancelled_at_range &&
      !searchParam.chargebacked_at_range &&
      !searchParam.flagged_at_range &&
      !searchParam.unflagged_at_range &&
      !searchParam.order_total_amount_range &&
      !searchParam.risk_score_range
    ) {
      message.error(
        t(
          'pages.userSearch.pleaseFillAtLeastOneSearchFields',
          'Please fill at least one search fields',
        ),
      );
      return false;
    } else if (searchParam.risk_score_range && (searchParam.risk_score_range.split('|').filter((e) => e)).length === 1) {
      message.error("Please Enter Correct Start and End Range")
      return false;      
    } else if (searchParam.order_total_amount_range && (searchParam.order_total_amount_range.split('|').filter((e) => e)).length === 1) {
      message.error("Please Enter Correct Start and End Range")
      return false;      
    }
    return true;
  };

  const handleSearch = () => {
    if (!validateSearch()) return;
    saveSearchParam(searchParam);
    setTimeout(() => {
      props.history.push('/order/results');
    }, 500);
  };

  const onPressEnter = (e) => {
    if (e.target.value) {
      handleSearch();
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Card colSpan={24} className={`${styles.card}`}>
          <Row gutter={[24, 0]}>
            <Col md={24} xs={24}>
              <OrderSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col>
          </Row>
          <div>
            <GeneralSubForm
              searchParam={searchParam}
              setSearchParam={setSearchParam}
              onPressEnter={onPressEnter}
            />
          </div>
          <Row gutter={[24, 0]}>
            <Col md={24} xs={24}>
              <PaymentSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={24} xs={24}>
              <ShippingSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={24} xs={24}>
              <FraudSubForm
                searchParam={searchParam}
                setSearchParam={setSearchParam}
                onPressEnter={onPressEnter}
              />
            </Col>
          </Row>
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

export default withRouter(OrderSearchForm);
