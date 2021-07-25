import React from 'react';
import { t } from '@/utils/label';
import { UserSearchCard, Row, Col } from '@/components';
import { asDate } from '@/utils/text';
import { countryName } from '@/utils/country';
import styles from './UserDetailsSubPage.less';

const ShippingAddressCard = (props) => {
  return (
    <>
      <Row style={{ height: '100%'}}>
        <Col span={24} style={{ height: 'inherit'}}>
          <UserSearchCard
            label={
              t("pages.userSearch.shippingAddress","Shipping Info")
            }
            columns={[
              {
                title: 'Address Line 1',
                dataIndex: 'shipping_address',
                key: 'address',
              },
              {
                title: 'Address Line 2',
                dataIndex: 'shipping_address_line2',
                key: 'address2',
              },
              {
                title: 'City',
                dataIndex: 'shipping_city',
                key: 'city',
              },
              {
                title: 'State/Province',
                dataIndex: 'shipping_state',
                key: 'state',
              },
              {
                title: 'Zip/Postal Code',
                dataIndex: 'shipping_zipcode',
                key: 'zipCode',
              },
              {
                title: 'Country',
                key: 'country',
                render: ({ data }) => (
                  <>{data && data.shipping_country ? countryName(data.shipping_country) : '...'}</>
                ),
              },
              {
                title: 'Modified',
                key: 'modified',
                render: ({ data }) => <>{data ? asDate(data.shipping_updated_at) : '...'}</>,
              },
            ]}
            data={props.shippingData}
          />
        </Col>
      </Row>
    </>
  );
};

export default ShippingAddressCard;
