/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { t } from '@/utils/label';
import { Input, OutlineBtn, message } from '@/components';
import { getChargerbackExportApi } from '@/services/fraudManagement/chargeback';
import styles from '../ChargebackPage.less';

export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  const exportSummary = () => {
    if (props.tableData && props.tableData.length > 0) {
      setIsExporting(true);
      const params = {
        date_range: props.searchParam.date_range,
        order_ip_address: props.searchParam.order_ip_address,
      };
      getChargerbackExportApi(params, onDoneExport, onFailExport);
    } else {
      message.error("You cannot export with empty data")
    }
  };
  const onDoneExport = (data) => {
    window.open(data.csv_file, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  const onHandleChange = (e) => {
    setIpAddress(e.target.value);
    const searchParam = { ...props.searchParam, order_ip_address: e.target.value };
    props.setSearchParam(searchParam);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <Input
          placeholder={'IP Address'}
          size="medium"
          onChange={onHandleChange}
          name="ipAddress"
          value={ipAddress}
        />
      </div>
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" loading={isExporting} onClick={exportSummary}>
          {t('pages.merchant.export', 'Export')}
        </OutlineBtn>
      </div>
    </div>
  );
}
