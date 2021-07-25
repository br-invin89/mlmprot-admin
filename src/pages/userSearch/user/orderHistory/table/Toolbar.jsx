/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { StartEndDatePicker, Input, Select, OutlineBtn } from '@/components';
import { varOptions } from '@/common/var';

const orderStatusOptions = varOptions('order.status');

function Toolbar(props) {
  const [formData, setFormData] = useState({
    order_number: '',
    tracking_number: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const onChangeData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [field]: value,
    });
  };
  const onChangeDateRange = (values) => {
    let startDate0 = '';
    let endDate0 = '';
    let createdAtRange = '';
    if (values) {
      startDate0 = moment(values[0]);
      endDate0 = moment(values[1]);
      createdAtRange = `${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`;
    }
    setFormData({
      ...formData,
      startDate: startDate0,
      endDate: endDate0,
    });
    props.setSearchParam({
      ...props.searchParam,
      created_at_range: createdAtRange,
    });
  };

  const goBack = () => {
    props.history.push('/user/search');
  }

  return (
    <div className="toolbar-container-for-lg-filters">
      <div className={`toolbar-sub-container`}>
        <Input
          placeholder="Order Number"
          style={{ minWidth: '162px' }}
          size="medium"
          value={formData.order_number}
          onChange={(e) => onChangeData('order_number', e.target.value)}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <Input
          placeholder="Tracking Number"
          size="medium"
          style={{ minWidth: '162px' }}
          value={formData.tracking_number}
          onChange={(e) => onChangeData('tracking_number', e.target.value)}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <Select
          size="medium"
          style={{ minWidth: '162px' }}
          options={[{ label: 'All Statuses', value: '' }, ...orderStatusOptions]}
          value={formData.status}
          onChange={(v) => onChangeData('status', v)}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker
          startDate={formData.startDate}
          endDate={formData.endDate}
          onChange={onChangeDateRange}
        />
      </div>
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" onClick={goBack}>
          Go Back
        </OutlineBtn>
      </div>
    </div>
  );
}
export default withRouter(Toolbar);
