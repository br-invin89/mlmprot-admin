import React, { useState } from 'react';
import { t } from '@/utils/label';
import { UserSearchCard, Row, Col } from '@/components';
import { asDate } from '@/utils/text';
import { countryName } from '@/utils/country';
import { varLabel } from '@/common/var';
import styles from './UserDetailsSubPage.less';

const CreditCard = (props) => {
  const [view, setView] = useState('billingAddress');

  function handleViewChange(e) {
    setView(e.target.id);
  }

  const Header = ({ selectedView, onClick }) => {
    return (
      <div className={`${styles.headerTab}`}>
        <div className={`${styles.tabsCards}`}>
          <a
            className={selectedView === 'billingAddress' ? `${styles.active}` : ''}
            id="billingAddress"
            onClick={onClick}
          >
            {t('pages.userSearch.billingAddress', 'Billing Address')}
          </a>
          <a
            className={selectedView === 'creditCard' ? `${styles.active}` : ''}
            id="creditCard"
            onClick={onClick}
          >
            {t('pages.userSearch.creditCard', 'Credit Card')}
          </a>
        </div>
      </div>
    );
  };


  return (
    <>
    <Row style={{ height: '100%'}}>
      <Col span={24} style={{ height: 'inherit'}}>
        {
          view === 'billingAddress' ?
            <UserSearchCard
              headerTabs={<Header selectedView={view} onClick={handleViewChange} />}
              columns={[
                {
                  title: 'Address Line 1',
                  dataIndex: 'billing_address',
                  key: 'address',
                },
                {
                  title: 'Address Line 2',
                  dataIndex: 'billing_address_line2',
                  key: 'address2',
                },
                {
                  title: 'City',
                  dataIndex: 'billing_city',
                  key: 'city',
                },
                {
                  title: 'State/Province',
                  dataIndex: 'billing_state',
                  key: 'state',
                },
                {
                  title: 'Zip/Postal Code',
                  dataIndex: 'billing_zipcode',
                  key: 'zipCode',
                },
                {
                  title: 'Country',
                  key: 'country',
                  render: ({ data }) => (
                    <>{data && data.billing_country ? countryName(data.billing_country) : '...'}</>
                  ),
                },
                {
                  title: 'Modified',
                  key: 'modified',
                  render: ({ data }) => <>{data ? asDate(data.billing_updated_at) : '...'}</>,
                },
              ]}
              data={props.billingData}
            />
            :
            <UserSearchCard
              headerTabs={<Header selectedView={view} onClick={handleViewChange} />}
              columns={[
                {
                  title: 'Name on Card',
                  dataIndex: 'cc_name',
                  key: 'cc_name',
                },
                {
                  title: 'Card Type',
                  dataIndex: 'cc_type',
                  key: 'cc_type',
                  render: ({ data }) => (
                    <span>
                      {data && data.cc_type && varLabel('userBillingDetail.ccType', data.cc_type)}
                    </span>
                  ),
                },
                {
                  title: 'Last CC 4',
                  dataIndex: 'last_cc_4',
                  key: 'last_cc_4',
                  render: ({ data }) => (
                    <span>{data && <>{data.last_cc_4 === 'none' ? 'N/A' : data.last_cc_4}</>}</span>
                  ),
                },
                {
                  title: 'Exp.Date',
                  dataIndex: 'cc_exp_date',
                  key: 'cc_exp_date',
                },
                {
                  title: 'CVV',
                  dataIndex: 'cc_number',
                  key: 'cc_number',
                  render: () => <span>***</span>,
                },
              ]}
              data={props.billingData}
            />
        }
      </Col>
    </Row>
    </>
  );
};

export default CreditCard;
