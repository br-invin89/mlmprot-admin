/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col, Spin } from '@/components';
import DistCenterCard from './DistCenterCard';

const DistCentersCardView = ({ isLoading, data, changeDistCenterStatus, isLoadingStatus, distCenterId }) => {
  return (
    <>
      <div className="distributionCentersPage">
        {isLoading ? (
          <Spin spinning={true} />
        ) : (
          <Row gutter={[15, 15]} className="cards-row">
            {data && data.map((distCenter, index) => {
              return (
                <Col xs={24} sm={12} lg={12} xl={8} xxl={6} key={index}>
                  <DistCenterCard
                    data={distCenter}
                    onHandleEdit={() => {}}
                    changeDistCenterStatus={changeDistCenterStatus}
                    isLoadingStatus={isLoadingStatus}
                    distCenterId={distCenterId}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </>
  );
};

export default DistCentersCardView;
