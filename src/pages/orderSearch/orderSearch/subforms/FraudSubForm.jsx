import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { Input, Select, Row, Col, InputRange } from '@/components';
import styles from '../OrderSearchPage.less';
import { varOptions } from '@/common/var';

export default function OrderSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);
  const [numberRange, setNumberRange] = useState({
    start_risk_score: '',
    end_risk_score: '',
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
            <div className={`${styles.title}`}>
              <FormattedMessage id="pages.userSearch.fraudInfo" defaultMessage="Fraud Info" />
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Order IP Address</div>
              <Input
                value={formData.order_ip_address}
                onChange={(e) => onFormData('order_ip_address', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Is Flagged</div>
              <Select
                value={formData.is_flagged}
                onChange={(v) => onFormData('is_flagged', v)}
                options={[{ label: '', value: '' }, ...varOptions('order.isFlagged')]}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Risk Score</div>
              <InputRange
                type="number"
                startValue={numberRange.start_risk_score}
                endValue={numberRange.end_risk_score}
                onStartChange={(e) =>
                  onStartChange(e, 'start_risk_score', 'end_risk_score', 'risk_score_range')
                }
                onEndChange={(e) =>
                  onEndChange(e, 'end_risk_score', 'start_risk_score', 'risk_score_range')
                }
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
