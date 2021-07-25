/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Col, Row, Select, AddEditModal } from '@/components';
import { countryOptions } from '@/utils/country';
import DistCenterModalContent from './DistCenterModalContent';
import styles from './DistCentersPage.less';
import { t } from '@/utils/label';

const DistCentersHeader = (props) => {
  const [country, setCountry] = useState('');

  const onHandleSelect = (value) => {
    setCountry(value);
    const searchParam = { country: value };
    props.setSearchParam(searchParam);
    props.loadCards(searchParam);
  };

  return (
    <>
      <Row gutter={[15, 15]} className="dist-centers-header mb-15">
        <Col span={24}>
          <Row align="middle" gutter={[15, 10]}>
            <Col xs={24} lg={24} xl={6}>
              <Select
                placeholder="All Countries"
                onChange={onHandleSelect}
                value={country}
                showSearch
                options={
                  new Set([
                    {
                      label: 'All Countries',
                      value: '',
                    },
                    ...countryOptions(),
                  ])
                }
              />
            </Col>
            <Col xs={24} lg={24} xl={18}>
              <div className="list-container">
                <div className="list-pagination-container">
                  <span className="total-dist-centers mr-3 pt-1 pr-15">
                    {props.total}{' '}
                    {props.total > 1
                      ? t('pages.distCenter.distCenters', 'Distribution Centers')
                      : t('pages.distCenter.distCenter', 'Distribution Center')}
                  </span>
                  <div>
                    {/* <Pagination
                      current={1}
                      pageSize={10}
                      total={30}
                      showSizeChanger={false}
                      onChange={() => {}}
                      hideOnSinglePage={true}
                    /> */}
                  </div>
                </div>
                <div className="list-view-container">
                  <AddEditModal
                    triggerLabel={t('pages.distCenter.addDistCenter', 'Add Distribution Center')}
                    open={props.open}
                    toggle={props.toggle}
                    width="500px"
                    triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                    modalTitle={t('pages.distCenter.addDistCenter', 'Add Distribution Center')}
                  >
                    <DistCenterModalContent
                      searchParam={props.searchParam}
                      loadCards={props.loadCards}
                      toggle={props.toggle}
                    />
                  </AddEditModal>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DistCentersHeader;
