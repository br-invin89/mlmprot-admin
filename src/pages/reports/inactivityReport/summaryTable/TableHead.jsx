/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, StartEndDatePicker, Select } from '@/components';
import moment from 'moment';
import styles from '../InactivityReportPage.less';
import { exportInactivityReportApi } from '@/services/reports/inactivityReport';

export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format().slice(0, 10)}|${moment(v[1]).format().slice(0, 10)}`;
    } else {
      setStartDate(moment().clone().startOf('month'));
      setEndDate(moment().clone());
      dateRange = `${moment().clone().startOf('month').format('YYYY-MM-DD')}|${moment()
        .clone()
        .format('YYYY-MM-DD')}`;
    }
    const searchParam = { ...props.searchParam, date_range: dateRange };
    const paginationParam = { ...props.paginationParam, currentPage: 1 };
    props.setSearchParam(searchParam);
    props.loadTable(paginationParam, searchParam);
  };

  const exportSummary = () => {
    setIsExporting(true);
    const params = {
      date_range: props.searchParam.date_range,
    };
    exportInactivityReportApi(params, onDoneExport, onFailExport);
  };
  const onDoneExport = (csvFile) => {
    window.open(csvFile, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  useEffect(() => {
    const dateRange = props.searchParam.date_range;
    setStartDate(moment(dateRange.split('|')[0]));
    setEndDate(moment(dateRange.split('|')[1]));
  }, []);

  return (
    <div className="toolbar-container">
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
