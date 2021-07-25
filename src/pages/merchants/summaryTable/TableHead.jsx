/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, StartEndDatePicker, Select } from '@/components';
import moment from 'moment';
import styles from '../MerchantsPage.less';
import { exportMerchantDailySummaryApi } from '@/services/merchants';
import { getMerchantsApi } from '@/services/settings/merchants';

export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [merchantOptions, setMerchantOptions] = useState([]);

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
    const paginationParam = { ...props.paginationParam, currentPage: 1 };
    props.setSearchParam(searchParam);
    props.loadTable(paginationParam, searchParam);
  };

  const exportSummary = () => {
    setIsExporting(true);
    const params = {
      date_range: props.searchParam.date_range,
      merchant_id: props.searchParam.merchant_id,
    };
    exportMerchantDailySummaryApi(params, onDoneExport, onFailExport);
  };
  const onDoneExport = (csvFile) => {
    window.open(csvFile, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  const loadMerchants = () => {
    getMerchantsApi(onGetMerchants);
  };
  const onGetMerchants = (data) => {
    const merchantOptionsTemp = [
      { label: 'All Merchants', value: '' },
      ...data.data.map((el) => ({ label: el.name, value: el.id })),
    ];
    setMerchantOptions(merchantOptionsTemp);
  };
  const onChangeMerchant = (merchantId) => {
    const searchParam = { ...props.searchParam, merchant_id: merchantId };
    const paginationParam = { ...props.paginationParam, currentPage: 1 };
    props.setSearchParam(searchParam);
    props.loadTable(paginationParam, searchParam);
  };

  useEffect(() => {
    loadMerchants();
  }, []);

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <Select
          placeholder={t('pages.merchant.allMerchants', 'All Merchants')}
          className={styles.selectBox}
          size="medium"
          options={merchantOptions}
          onChange={onChangeMerchant}
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
