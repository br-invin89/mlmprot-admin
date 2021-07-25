/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {OutlineBtn} from '@/components';
import { t } from '@/utils/label';
import {getInventoriesExportApi} from "@/services/inventories";

export default function TableHead(props) {
  const [isExporting, setIsExporting] = useState(false);

  const exportSummary = () => {
    setIsExporting(true);
    getInventoriesExportApi(props.searchParam, onDoneExport, onFailExport);
  };
  const onDoneExport = (data) => {
    window.open(data.csv_file, '_blank');
    setIsExporting(false);
  };
  const onFailExport = () => {
    setIsExporting(false);
  };

  return (
    <div className="toolbar-container-for-md-filters">
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" loading={isExporting} onClick={exportSummary}>
          {t('pages.merchant.export', 'Export' )}
        </OutlineBtn>
      </div>
    </div>
  );
}
