import React, { useState } from 'react';
import { OutlineBtn } from '@/components';
import { payoutCommissionExportApi } from '@/services/payoutCommission';

export default function ExportBtn(props) {
  const [isLoading, setIsLoading] = useState(false);

  const onGetCsv = (data) => {
    setIsLoading(false);
    window.open(data.csv_file, '_blank');
  };

  const onFailCsv = () => {
    setIsLoading(false);
  };

  const exportCsv = () => {
    setIsLoading(true);
    payoutCommissionExportApi(props.data.id, props.providerName, onGetCsv, onFailCsv);
  };

  return (
    <OutlineBtn loading={isLoading} success onClick={exportCsv}>
      {props.label}
    </OutlineBtn>
  );
}
