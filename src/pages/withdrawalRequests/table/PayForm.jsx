import React, { useEffect, useState } from 'react';
import { Select, Popconfirm, OutlineBtn, message } from '@/components';
import { withdrawRequestPayApi } from '@/services/withdrawRequest';
import { loadPayoutProvidersApi } from '@/services/common';

export default function PayForm(props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [payoutProviders, setPayoutProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(undefined);

  const onGetPayoutProviders = (data) => {
    setPayoutProviders(data);
  };

  const onDoneUpdate = (data) => {
    props.reloadTable();
    setIsUpdating(false);
    window.open(data.csv_file, '_target');
  };

  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handlePay = () => {
    if (!selectedProviderId) {
      message.error('Please select payout provider to pay on this time');
      return;
    }
    setIsUpdating(true);
    const data = {
      payout_provider_id: selectedProviderId,
    };
    withdrawRequestPayApi(data, onDoneUpdate, onFailUpdate);
  };

  useEffect(() => {
    loadPayoutProvidersApi(onGetPayoutProviders);
  }, []);

  return (
    <>
      <div className="toolbar-sub-container">
        <label>Payout Provider:</label>
      </div>
      <div className="toolbar-sub-container">
        <Select
          value={selectedProviderId}
          onChange={(v) => setSelectedProviderId(v)}
          options={[
            { label: 'Please select', value: '' },
            ...payoutProviders.map((el) => ({ label: el.name, value: el.id })),
          ]}
          size="middle"
          style={{ minWidth: '162px' }}
          placeholder={'Please select'}
        />
      </div>
      <div className="toolbar-sub-container">
        <Popconfirm onConfirm={handlePay}>
          <OutlineBtn loading={isUpdating}>{'Pay All'}</OutlineBtn>
        </Popconfirm>
      </div>
    </>
  );
}
