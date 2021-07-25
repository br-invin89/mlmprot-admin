/* eslint-disable no-unused-vars */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { OutlineBtn, Card, Col, Row, UserStatusBadge, Popconfirm } from '@/components';
import distCenterImage from '@/assets/images/distCenter.jpg';
import { ShopOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import shipStationImage from '@/assets/images/shipstation.png';
import styles from './DistCentersPage.less';
import { t } from '@/utils/label';

const DistCenterCard = (props) => {
  const { data, distCenterId, changeDistCenterStatus, isLoadingStatus } = props;
  return (
    <Card className={`general-cards-container ${styles.card}`}>
      <Row className="user-container">
        <Col span={24}>
          <Row>
            <Col className="shipstation-container">
              {data.isShippedStation ? <img src={shipStationImage} /> : <div className="mt-15" />}
            </Col>
          </Row>
          <Row className="user-image-row">
            <Col span={24} className="user-image-col">
              {data.image ?
                <div
                  style={{ backgroundImage: `url('${data.image}')` }}
                  className={styles.logoImg}
                />
                :
                <Avatar
                  icon={<ShopOutlined />}
                  className={styles.logoImg}
                />
              }
            </Col>
          </Row>
          <Row className="mt-12">
            <Col span={24} className="user-name-col">
              <p>{data.name}</p>
            </Col>
          </Row>
          <Row className="mt-10 mb-12">
            <Col span={24} className="user-status-col d-flex justify-content-center">
              <UserStatusBadge status={data.status === 1 ? 'Active' : 'Inactive'} />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="divider mt-12" />
      <Row className="user-container-foot">
        <Col span={24}>
          <Row className="text-row">
            <Col span={12}>
              <p className="title mb-0">Confirmed Orders:</p>
            </Col>
            <Col span={12}>
              <p className="text-muted font-weight-medium mb-0 card-text">
                {data.total && data.total.confirmed_orders}
              </p>
            </Col>
          </Row>
          <Row className="text-row">
            <Col span={12}>
              <p className="title mb-0">New Orders:</p>
            </Col>
            <Col span={12}>
              <p className="text-muted font-weight-medium mb-0 card-text">
                {data.total && data.total.new_orders}
              </p>
            </Col>
          </Row>

          {!props.hideActionsButton && (
            <Row gutter={[15, 0]} className="action-btn mt-15">
              {data.status === 1 ? (
                <Col span={12} className="action-btn-col-1">
                  <Popconfirm
                    title={'Are you sure ?'}
                    onConfirm={() => changeDistCenterStatus(data.id, 2)}
                    okText="Yes"
                    placement="top"
                    cancelText="No"
                  >
                    <OutlineBtn danger block loading={isLoadingStatus && data.id === distCenterId}>
                      {t('pages.distCenter.deactivate', 'Deactivate')}
                    </OutlineBtn>
                  </Popconfirm>
                </Col>
              ) : (
                <Col span={12} className="action-btn-col-1">
                  <Popconfirm
                    title={'Are you sure ?'}
                    onConfirm={() => changeDistCenterStatus(data.id, 1)}
                    okText="Yes"
                    placement="top"
                    cancelText="No"
                  >
                    <OutlineBtn success block loading={isLoadingStatus && data.id === distCenterId}>
                      {t('pages.distCenter.activate', 'Activate')}
                    </OutlineBtn>
                  </Popconfirm>
                </Col>
              )}
              <Col span={12} className="action-btn-col-2">
                <OutlineBtn
                  block
                  onClick={() =>
                    props.history.push({
                      pathname: '/dist-centers/edit',
                      query: {
                        id: data.id,
                      },
                    })
                  }
                >
                  {t('pages.distCenter.edit', 'Edit')}
                </OutlineBtn>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default withRouter(DistCenterCard);
