/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { OutlineBtn, MonthPicker, Input } from '@/components';
import moment from 'moment';
import styles from '../MonthlyVolumePage.less';
import { exportMonthlyVolumeReportApi } from '@/services/reports/monthlyVolume';

export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);
  const [formData, setFormData] = useState(props.searchParam);

  const onFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [field]: value,
    });
  };

  const exportSummary = () => {
    setIsExporting(true);
    const params = {
      month: props.searchParam.month,
      uuid: props.searchParam.uuid,
    };
    exportMonthlyVolumeReportApi(params, onDoneExport, onFailExport);
  };
  const onDoneExport = (csvFile) => {
    window.open(csvFile, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <Input
          placeholder={'User ID'}
          value={formData.uuid}
          onChange={(e) => onFormChange('uuid', e.target.value)}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <MonthPicker
          onChange={(_, v) => onFormChange('month', v)}
          date={formData.month}
          width={164}
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
