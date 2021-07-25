/* eslint-disable no-undef */
/* eslint-disable no-empty */
import React from 'react';
import { t } from '@/utils/label';
import { Row, Col, Upload, message, OutlineBtn } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import styles from './ProductSubPage.less';
import { getToken } from '@/utils/localStorage';

const UploadDetails = () => {
  const props = {
    name: 'details',
    action: `${REACT_APP_API_SERVER}/api/admin/products/import/details`,
    accept: '.csv',
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success("Imported the product's details successfully");
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <h4 className={`${styles.title}`}>
            {t('pages.import.uploadDetails', 'Upload Details')}
          </h4>
        </Col>
      </Row>
      <Row className="mt-4 d-flex align-items-center justify-content-start">
        <Col xs={24} sm="auto">
          <p className="mb-0">
            {t('pages.news.importText', 'You can download the example csv file.')}{' '}
            <a
              className="download-link"
              href="https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/sample_downloads/import_users.csv"
            >
              {t('pages.news.clickDownload', 'Click here to download.')}
            </a>
          </p>
        </Col>
      </Row>
      <Row className="mt-12 d-flex align-items-center justify-content-start">
        <Col xs={24} sm="auto">
          <Upload {...props} className="user-upload-list-container">
            <OutlineBtn icon={<UploadOutlined />} style={{ minWidth: 210 }}>
              Click to Upload Details
            </OutlineBtn>
          </Upload>
        </Col>
      </Row>
    </>
  );
};

export default UploadDetails;
