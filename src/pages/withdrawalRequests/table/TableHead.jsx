import React, { useState, useEffect } from 'react';
import { Input, Select, OutlineBtn } from '@/components';
import { varOptions } from '@/common/var';
import { loadPayoutProvidersApi } from '@/services/common';
import ExportBtn from './ExportBtn';
import PayForm from './PayForm';

const creditWithdrawRequestStatusOptions = varOptions('creditWithdrawRequest.status');
export default function TableHead(props) {
  const [formData, setFormData] = useState({
    username: '',
    status: '',
    payout_provider_id: '',
  });
  const [payoutProviders, setPayoutProviders] = useState([]);

  const onFormData = (field, value) => {
    const formData0 = {
      ...formData,
      [field]: value,
    };
    setFormData(formData0);
    const searchParam = {
      ...props.searchParam,
      ...formData0,
    };
    props.setSearchParam(searchParam);
    // props.handleSearch(searchParam);
  };

  const onGetPayoutProviders = (data) => {
    setPayoutProviders(data);
  };

  useEffect(() => {
    setFormData({
      username: props.searchParam.username,
      status: props.searchParam.status,
      payout_provider_id: props.searchParam.payout_provider_id,
    });
  }, [props.searchParam]);

  useEffect(() => {
    loadPayoutProvidersApi(onGetPayoutProviders);
  }, []);

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <label>Search:</label>
      </div>
      <div className="toolbar-sub-container">
        <Input
          value={formData.username}
          onChange={(e) => onFormData('username', e.target.value)}
          placeholder={'Username'}
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          value={formData.status}
          onChange={(v) => onFormData('status', v)}
          options={[{ label: 'All Statuses', value: '' }, ...creditWithdrawRequestStatusOptions]}
          size="middle"
          style={{ minWidth: '162px' }}
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          value={formData.payout_provider_id}
          onChange={(v) => onFormData('payout_provider_id', v)}
          options={[
            { label: 'All Payout Providers', value: '' },
            ...payoutProviders.map((el) => ({ label: el.name, value: el.id })),
          ]}
          size="middle"
          style={{ minWidth: '162px' }}
        />
      </div>
      <div className="toolbar-sub-container">
        <OutlineBtn onClick={props.reloadTable}>Search</OutlineBtn>
      </div>
      <div className="toolbar-sub-container">
        <ExportBtn reloadTable={props.reloadTable} formData={formData} />
      </div>
      <PayForm reloadTable={props.reloadTable} />
    </div>
  );
}
