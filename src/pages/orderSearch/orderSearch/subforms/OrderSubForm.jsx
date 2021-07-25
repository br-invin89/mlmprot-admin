import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Input, Select, Row, Col, StartEndDatePicker, InputRange } from '@/components';
import styles from '../OrderSearchPage.less';
import { varOptionsWithDefault } from '@/common/var';
import { t } from '@/utils/label';

export default function OrderSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);
  const [numberRange, setNumberRange] = useState({
    start_order_total_amount: '',
    end_order_total_amount: '',
    start_risk_score: '',
    end_risk_score: '',
  });

  const [dateRange, setDateRange] = useState({
    start_created_at_range: '',
    end_created_at_range: '',
    start_confirmed_at_range: '',
    end_confirmed_at_range: '',
    start_failed_at_range: '',
    end_failed_at_range: '',
    start_refunded_at_range: '',
    end_refunded_at_range: '',
    start_resent_at_range: '',
    end_resent_at_range: '',
    start_cancelled_at_range: '',
    end_cancelled_at_range: '',
    start_chargebacked_at_range: '',
    end_chargebacked_at_range: '',
    start_flagged_at_range: '',
    end_flagged_at_range: '',
    start_unflagged_at_range: '',
    end_unflagged_at_range: '',
    start_deleted_at_range: '',
    end_deleted_at_range: '',
  });

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [field]: value,
    });
  };

  const onChangeCreatedAtRange = (dates, start, end, keyName) => {
    if (dates) {
      setDateRange({
        ...dateRange,
        [start]: dates[0],
        [end]: dates[1],
      });
      props.setSearchParam({
        ...props.searchParam,
        [keyName]: `${moment(dates[0]).format('YYYY-MM-DD')}|${moment(dates[1]).format(
          'YYYY-MM-DD',
        )}`,
      });
    } else {
      setDateRange({
        ...dateRange,
        [start]: '',
        [end]: '',
      });
      props.setSearchParam({
        ...props.searchParam,
        [keyName]: ``,
      });
    }
  };

  const onStartChange = (e, start, end, keyName) => {
    const { value } = e.target;
    if (value > 0) {
      setNumberRange({
        ...numberRange,
        [start]: value,
      });
      props.setSearchParam({
        ...props.searchParam,
        [keyName]: `${value}|${numberRange[end]}`,
      });
    }
  };

  const onEndChange = (e, end, start, keyName) => {
    const { value } = e.target;
    if (value > 0) {
      setNumberRange({
        ...numberRange,
        [end]: value,
      });
      props.setSearchParam({
        ...props.searchParam,
        [keyName]: `${numberRange[start]}|${value}`,
      });
    }
  };

  useEffect(() => {
    setFormData(props.searchParam);
  }, [props.searchParam]);
  return (
    <>
    <div>
      <Row>
        <Col>
          <div className={`${styles.title}`}>{t('pages.userSearch.orderInfo', 'Order Info')}</div>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Order Number</div>
            <Input
              value={formData.order_number}
              onChange={(e) => onFormData('order_number', e.target.value)}
              onPressEnter={props.onPressEnter}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Order Status</div>
            <Select
              options={varOptionsWithDefault('order.status')}
              value={formData.status}
              onChange={(v) => onFormData('status', v)}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Order From</div>
            <Select
              value={formData.order_from}
              onChange={(v) => onFormData('order_from', v)}
              options={varOptionsWithDefault('order.orderFrom')}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Source</div>
            <Select
              value={formData.source}
              onChange={(v) => onFormData('source', v)}
              options={varOptionsWithDefault('order.source')}
            />
          </div>
        </Col>
        {/* <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Is Digital</div>
            <Select
              value={formData.is_digital}
              onChange={(v) => onFormData('is_digital', v)}
              options={varOptionsWithDefault('order.isFlagged')}
            />
          </div>
        </Col> */}
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Created Between</div>
            <StartEndDatePicker
              value={[dateRange.start_created_at_range, dateRange.end_created_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_created_at_range',
                  'end_created_at_range',
                  'created_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Confirmed Between</div>
            <StartEndDatePicker
              value={[dateRange.start_confirmed_at_range, dateRange.end_confirmed_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_confirmed_at_range',
                  'end_confirmed_at_range',
                  'confirmed_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Failed Between</div>
            <StartEndDatePicker
              value={[dateRange.start_failed_at_range, dateRange.end_failed_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_failed_at_range',
                  'end_failed_at_range',
                  'failed_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Refunded Between</div>
            <StartEndDatePicker
              value={[dateRange.start_refunded_at_range, dateRange.end_refunded_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_refunded_at_range',
                  'end_refunded_at_range',
                  'refunded_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Resent Between</div>
            <StartEndDatePicker
              value={[dateRange.start_resent_at_range, dateRange.end_resent_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_resent_at_range',
                  'end_resent_at_range',
                  'resent_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Cancelled Between</div>
            <StartEndDatePicker
              value={[dateRange.start_cancelled_at_range, dateRange.end_cancelled_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_cancelled_at_range',
                  'end_cancelled_at_range',
                  'cancelled_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Chargeback Between</div>
            <StartEndDatePicker
              value={[dateRange.start_chargebacked_at_range, dateRange.end_chargebacked_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_chargebacked_at_range',
                  'end_chargebacked_at_range',
                  'chargebacked_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Flagged Between</div>
            <StartEndDatePicker
              value={[dateRange.start_flagged_at_range, dateRange.end_flagged_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_flagged_at_range',
                  'end_flagged_at_range',
                  'flagged_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Unflagged Between</div>
            <StartEndDatePicker
              value={[dateRange.start_unflagged_at_range, dateRange.end_unflagged_at_range]}
              onChange={(dates) =>
                onChangeCreatedAtRange(
                  dates,
                  'start_unflagged_at_range',
                  'end_unflagged_at_range',
                  'unflagged_at_range',
                )
              }
              width="100%"
            />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Order Total Amount</div>
            <InputRange
              type="number"
              startValue={numberRange.start_order_total_amount}
              endValue={numberRange.end_order_total_amount}
              onStartChange={(e) =>
                onStartChange(
                  e,
                  'start_order_total_amount',
                  'end_order_total_amount',
                  'order_total_amount_range',
                )
              }
              onEndChange={(e) =>
                onEndChange(
                  e,
                  'end_order_total_amount',
                  'start_order_total_amount',
                  'order_total_amount_range',
                )
              }
            />
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
}
