/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Row, Col, Spin} from '@/components';
import AdministratorsCard from './AdministratorsCard';

const AdministratorsCardView = ({administratorsData, isLoading, currentUser, onHandleEdit, onHandleStatus}) => {
  if(isLoading) {
    return <Spin spinning={true} />
  }
  return (
    <>
      <Row gutter={[15, 15]} className="cards-row">
        {administratorsData.map((user, index) => {
          return (
            <Col xs={24} sm={12} lg={12} xl={8} xxl={6} key={index}>
              <AdministratorsCard data={user} onHandleStatus={onHandleStatus} onHandleEdit={onHandleEdit} currentUser={currentUser}/>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default AdministratorsCardView;
