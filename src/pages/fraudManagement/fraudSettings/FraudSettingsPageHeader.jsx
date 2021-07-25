/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col, AddEditModal } from '@/components';
import { t } from '@/utils/label';
import FraudSettingsModalContent from './FraudSettingsModalContent';
import styles from './FraudSettingsPage.less';

const FraudSettingsPageHeader = (props) => {
  return (
    <>
      <Row gutter={[15, 5]} className="mb-15" align="middle">
        <Col span={24} className={styles.addProductBtn}>
          <AddEditModal
            triggerLabel={t('pages.fraudMangement.createAThreshold', 'Create A Threshold')}
            triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
            modalTitle={t('pages.fraudMangement.createAThreshold', 'Create A Threshold')}
            hideIcon
            width="450px"
            open={props.open}
            toggle={props.toggle}
          >
            <FraudSettingsModalContent open={props.open} onFinish={props.onFinish} isUpdateLoading={props.isUpdateLoading} isEdit={false}/>
          </AddEditModal>
        </Col>
      </Row>
    </>
  );
};

export default FraudSettingsPageHeader;
