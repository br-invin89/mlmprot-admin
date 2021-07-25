/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { OutlineBtn, Upload, SuccessNotification, ErrorNotification } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import styles from '../../EditDistCentersSubPage.less';
import { getToken } from '@/utils/localStorage';

export default function TableHead({ distCenterId, loadTable, paginationParam }) {
  const props = {
    name: 'orders',
    action: `${REACT_APP_API_SERVER}/api/admin/dist_centers/upload_shipments?dist_center_id=${distCenterId}`,
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
    accept: '.csv',
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        SuccessNotification('Successfully Uploaded');
        loadTable(paginationParam);
      } else if (info.file.status === 'error') {
        ErrorNotification('Uploading Failed');
      }
    },
  };

  const openSampleCsv = () => {
    window.open(
      'https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/sample_downloads/shipments_sample.csv',
      '_blank',
    );
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" onClick={openSampleCsv}>
          Download Sample CSV
        </OutlineBtn>
      </div>
      <div className="toolbar-sub-container">
        <Upload {...props} className="user-upload-list-container">
          <OutlineBtn icon={<UploadOutlined />} className="btn-34">
            Upload Shipments
          </OutlineBtn>
        </Upload>
      </div>
    </div>
  );
}
