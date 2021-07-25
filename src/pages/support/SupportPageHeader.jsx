/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col, AddEditModal } from '@/components';
import { t } from '@/utils/label';
import SupportPageModalContent from './SupportPageModalContent';
import styles from './SupportPage.less';

const SupportPageHeader = (props) => {
  return (
    <>
      <Row gutter={[15, 5]} className="mb-15" align="middle">
        <Col span={24} className={styles.addProductBtn}>
          <AddEditModal
            triggerLabel={t('pages.support.createTicket', 'Create A Ticket')}
            triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
            modalTitle={t('pages.support.createTicket', 'Create A Ticket')}
            hideIcon
            width="600px"
            open={props.open}
            toggle={props.toggle}
          >
            <SupportPageModalContent open={props.open} onFinish={props.onFinish} isUpdateLoading={props.isUpdateLoading} isEdit={false}/>
          </AddEditModal>
        </Col>
      </Row>
    </>
  );
};

export default SupportPageHeader;
