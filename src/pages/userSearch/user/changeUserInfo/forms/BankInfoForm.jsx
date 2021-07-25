import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Input, Row, Col } from '@/components';
import styles from '../UserInfoSubPage.less';

export default function BankInfoForm(props) {
  const [formData, setFormData] = useState(undefined);

  useEffect(() => {
    if (!props.data) return;
    setFormData({
      name: props.data.bank_info.name,
      bank_name: props.data.bank_info.bank_name,
      account: props.data.bank_info.account,
      bank_address: props.data.bank_info.bank_address,
      country: props.data.bank_info.country,
    });
  }, [props.data]);

  return (
    <>
      {formData && (
        <div>
          <Row>
            <Col>
              <div className={`${styles.userTitle}`}>
                {t("pages.userSearch.bankInfoForm", "Bank Info Form")}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>
                  {t("pages.userSearch.nameOnAccount", "Name on Account")}
                </div>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>
                  {t("pages.userSearch.bankName", "First Name")}
                </div>
                <Input
                  value={formData.bank_name}
                  onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>
                  {t("pages.userSearch.accountNumber", "Account #")}
                </div>
                <Input
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>
                  {t("pages.userSearch.bankLocation", "Bank Location")}
                </div>
                <Input
                  value={formData.bank_address}
                  onChange={(e) => setFormData({ ...formData, bank_address: e.target.value })}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <div className={`${styles.inputContainer}`}>
                <div className={`${styles.inputLabel}`}>
                  {t("pages.userSearch.countryIDForIncomeTax", "Country ID# (For Income Tax)")}
                </div>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
