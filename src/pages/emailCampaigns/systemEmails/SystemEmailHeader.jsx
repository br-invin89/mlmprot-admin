/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { t } from '@/utils/label';

import { Row, Col, Button, SearchInput, AddEditModal } from '@/components';
import styles from './SystemEmailsPage.less';
import SystemEmailEditModalContent from './SystemEmailEditModalContent';
import { Link } from 'react-router-dom';

const SystemEmailHeader = ({ handleSearchData }) => {
  let delayDebounceFn = null;
  const handleOnChange = (e) => {
    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => {
      handleSearchData(e.target.value);
    }, 1000);
  };
  const [activeLogoAndFooterModal, setActiveLogoAndFooterModal] = useState(false);
  const toggle = () => {
    setActiveLogoAndFooterModal(!activeLogoAndFooterModal);
  }
  return (
    <>
      <Row gutter={[15, 5]} className="mb-15" align="middle">
        <Col xs={24} sm={12} lg={12}>
        </Col>
        <Col xs={24} sm={12}  lg={12} className={styles.editLogoAndFooterBtn}>
          <Row>
            <Col span={24}>
              <Button className="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                onClick={() => setActiveLogoAndFooterModal(true)}
              >
                {t("pages.emailCampaigns.logoAndFooter", "Logo and Footer")}
              </Button>
              {activeLogoAndFooterModal &&
                <AddEditModal
                  modalTitle={
                    t("pages.emailCampaigns.logoAndFooter", "Logo and Footer")
                  }
                  open={activeLogoAndFooterModal}
                  toggle={toggle}
                >
                  <SystemEmailEditModalContent 
                    setActiveLogoAndFooterModal={setActiveLogoAndFooterModal}
                  />
                </AddEditModal>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SystemEmailHeader;
