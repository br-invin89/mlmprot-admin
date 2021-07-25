/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, OutlineBtn, Row, Col, UserStatusBadge, Button } from '@/components';
import styles from './AdministratorsPage.less';
import { varLabel } from '@/common/var';
import ActivateBtn from './table/ActivateBtn';
import { t } from '@/utils/label';
import NophotoIcon from '@/assets/icons/user.svg';

const AdministratorsCard = ({ data, currentUser, ...props }) => {
  return (
    <Card className={`general-cards-container ${styles.card}`}>
      <Row className="user-container">
        <Col span={24}>
          <Row className="user-image-row">
            <Col span={24} className="user-image-col">
              <img src={data.image || NophotoIcon} />
            </Col>
          </Row>
          <Row className="mt-10">
            <Col span={24} className="user-name-col">
              <p>{`${data.first_name} ${data.last_name}`}</p>
            </Col>
          </Row>
          <Row className="mt-10 mb-10">
            <Col span={24} className="user-status-col">
              <UserStatusBadge status={varLabel('admin.status', data.status)} />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="divider mt-12" />
      <Row className="user-container-foot">
        <Col span={24}>
          <Row className="text-row">
            <Col span={6}>
              <p className="title mb-0">Department:</p>
            </Col>
            <Col span={18}>
              <p className="text-muted card-text">
                {data.department ? data.department.name : 'Deleted'}
              </p>
            </Col>
          </Row>
          <Row className="text-row">
            <Col span={6}>
              <p className="title mb-0">Email:</p>
            </Col>
            <Col span={18}>
              <p className="text-muted card-text">{data.email}</p>
            </Col>
          </Row>
          {currentUser.id !== data.id ? (
            <Row className="action-btn mt-15">
              <Col span={12} className="action-btn-col-1">
                <ActivateBtn data={data} onHandleStatusChange={props.onHandleStatus} />
              </Col>
              <Col span={12} className="action-btn-col-2">
                <OutlineBtn block onClick={() => props.onHandleEdit(data)}>
                  {t('pages.administrators.edit', 'Edit')}
                </OutlineBtn>
              </Col>
            </Row>
          ) : (
            <Row className="mt-40 mb-7" />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default AdministratorsCard;
