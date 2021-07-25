/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StartEndDatePicker, Select, OutlineBtn } from '@/components';
import moment from 'moment';
import { t } from '@/utils/label';
import { exportInventoriesLogApi } from '@/services/inventories';

export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format()}|${moment(v[1]).format()}`;
    } else {
      setStartDate('');
      setEndDate('');
    }
    const searchParam = { ...props.searchParam, date_range: dateRange };
    props.setSearchParam(searchParam);
  };

  const exportSummary = () => {
    setIsExporting(true);
    const searchParams = {
      'filter[dist_center_id]': props.searchParam.dist_center_id,
      'filter[product_id]': props.searchParam.product_id,
      'filter[date_range]': props.searchParam.date_range,
    };
    exportInventoriesLogApi(searchParams, onDoneExport, onFailExport);
  };
  const onDoneExport = (csvFile) => {
    window.open(csvFile, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  const handleDistCentersChange = (value) => {
    const searchParam = { ...props.searchParam, dist_center_id: value };
    props.setSearchParam(searchParam);
  };

  const handleProductsChange = (value) => {
    const searchParam = { ...props.searchParam, product_id: value };
    props.setSearchParam(searchParam);
  };

  return (
    <div className="toolbar-container-for-md-filters">
      <div className="toolbar-sub-container">
        <Select
          placeholder="All Dist. Centers"
          style={{ minWidth: '162px' }}
          size="medium"
          options={[
            {
              label: 'All Dist. Centers',
              value: '',
            },
            ...props.distCenters,
          ]}
          onChange={handleDistCentersChange}
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          options={[
            {
              label: 'All Products',
              value: '',
            },
            ...props.products,
          ]}
          onChange={handleProductsChange}
          size="medium"
          placeholder="All Products"
          style={{ minWidth: '162px' }}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" loading={isExporting} onClick={exportSummary}>
          {t('pages.merchant.export', 'Export')}
        </OutlineBtn>
      </div>
    </div>
  );
}
