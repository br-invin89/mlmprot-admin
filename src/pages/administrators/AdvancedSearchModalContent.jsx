import React from 'react';
import { t } from '@/utils/label';
import { Form, Button, Row, Col, Input, Select } from '@/components';
import styles from './AdministratorsPage.less';

const AdvancedSearchModalContent = () => {
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };

  return (
    <Form {...layout} name="basic" className="admin-modal">
      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>First Name</div>
            <Input />
          </div>
        </Col>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Last Name</div>
            <Input />
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Department</div>
            <Select />
          </div>
        </Col>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Email</div>
            <Input />
          </div>
        </Col>
      </Row>

      <Row gutter={[15, 0]}>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>IP Address</div>
            <Input />
          </div>
        </Col>
        <Col xs={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Status</div>
            <Select />
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col span={12} className={`${styles.searchBtn}`}>
          <Button type="primary" style={{ width: 150 }}>
            {t("pages.administrators.search", "Search")}
          </Button>
        </Col>
        <Col span={12}>
          <Button type="primary" style={{ width: 150 }}>
            {t("pages.administrators.resetFilter", "Reset Filter")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchModalContent;
