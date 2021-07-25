/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StartEndDatePicker, Select, OutlineBtn } from '@/components';
import moment from 'moment';
import { exportInventoriesDailyApi } from '@/services/inventories';
import { t } from '@/utils/label';


export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(6, 'days'));
  const [endDate, setEndDate] = useState(moment().subtract(0, 'days'));

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format().slice(0, 10)}|${moment(v[1]).format().slice(0, 10)}`;
    } else {
      setStartDate('');
      setEndDate('');
    }
    const searchParam = { ...props.searchParam, date_range: dateRange };
    props.setSearchParam(searchParam);
    // props.loadTable(props.paginationParam, searchParam);
  };

  const exportSummary = () => {
    setIsExporting(true);
    const params = {
      date_range: props.searchParam.date_range,
    };
    exportInventoriesDailyApi(params, onDoneExport, onFailExport);
  };
  const onDoneExport = (data) => {
    window.open(data.csv_file, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" loading={isExporting} onClick={exportSummary}>
          {t('pages.merchant.export', 'Export' )}
        </OutlineBtn>
      </div>
    </div>
  );
}
