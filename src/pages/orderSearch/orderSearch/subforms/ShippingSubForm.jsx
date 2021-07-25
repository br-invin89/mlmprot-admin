import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Input, Select, Row, Col, StartEndDatePicker } from '@/components';
import moment from 'moment';
import styles from '../OrderSearchPage.less';
import { countryOptions } from '@/utils/country';
import { getDistCentersApi } from '@/services/distCenters';

export default function ShippingSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);
  const [distCenters, setDistCenters] = useState([]);

  const [dateRange, setDateRange] = useState({
    start_shipped_at_range: '',
    end_shipped_at_range: '',
  });

  const onGetDistCenters = (tableData_) => {
    const disCenter = tableData_.data.map((item) => {
      return { value: item.id, label: item.name };
    });
    setDistCenters(disCenter);
  };

  const onFailDistCenters = () => {};

  const loadDistCenters = (param) => {
    getDistCentersApi(param, onGetDistCenters, onFailDistCenters);
  };

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

  useEffect(() => {
    setFormData(props.searchParam);
  }, [props.searchParam]);

  useEffect(() => {
    loadDistCenters('');
  }, []);

  return (
    <>
      <div>
        <Row>
          <Col>
            <div className={`${styles.title}`}>
              {t('pages.userSearch.shippingAddress', 'Shipment Info')}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Dist Centers</div>
              <Select
                value={formData.dist_center_id}
                onChange={(v) => onFormData('dist_center_id', v)}
                options={[{ label: '', value: '' }, ...distCenters]}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Shipping Country</div>
              <Select
                value={formData.shipping_country}
                onChange={(v) => onFormData('shipping_country', v)}
                options={[{ label: '', value: '' }, ...countryOptions()]}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Tracking Number</div>
              <Input
                value={formData.tracking_number}
                onChange={(e) => onFormData('tracking_number', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Shipstation Order Key</div>
              <Input
                value={formData.shipstation_order_key}
                onChange={(e) => onFormData('shipstation_order_key', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Shipstation Order ID</div>
              <Input
                value={formData.shipstation_order_id}
                onChange={(e) => onFormData('shipstation_order_id', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>

          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Shipped Between</div>
              <StartEndDatePicker
                value={[dateRange.start_shipped_at_range, dateRange.end_shipped_at_range]}
                onChange={(dates) =>
                  onChangeCreatedAtRange(
                    dates,
                    'start_shipped_at_range',
                    'end_shipped_at_range',
                    'shipped_at_range',
                  )
                }
                width="100%"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
