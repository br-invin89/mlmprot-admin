/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Row, Col, Select, StatsCard, Spin } from '@/components';
import styles from './InventoryLevelsSubPage.less';
import { getInventoriesStatsApi } from '@/services/inventories';

const DistStatsCards = ({ changeDistCenters, distCenters, reloadTableData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inventoriesStats, setInventoriesStats] = useState({});
  const [currentDisCenter, setCurrentDisCenter] = useState();

  const onGetInventoriesStats = (tableData_) => {
    setInventoriesStats(tableData_.data);
    setIsLoading(false);
  };
  const onFailInventoriesStats = () => {
    setIsLoading(false);
  };

  const loadInventoriesStats = (param) => {
    setIsLoading(true);
    getInventoriesStatsApi(param, onGetInventoriesStats, onFailInventoriesStats);
  };

  useEffect(() => {
    if (!currentDisCenter && distCenters && distCenters.length) {
      setCurrentDisCenter(distCenters[0].value);
    }
  }, [distCenters]);

  useEffect(() => {
    if (currentDisCenter) {
      const  params = {
        dist_center_id: currentDisCenter,
      };
      loadInventoriesStats(params);
    }
    changeDistCenters(currentDisCenter);
  }, [currentDisCenter, reloadTableData]);

  const handleDistCentersChange = (value) => {
    setCurrentDisCenter(value);
  };

  return (
    <>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Distribution Center</div>
            <Select
              options={distCenters}
              onChange={handleDistCentersChange}
              value={currentDisCenter}
            />
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Spin spinning={true} />
      ) : (
        <Row gutter={[15, 15]}>
          <Col xs={24} md={12} lg={12} xl={12}>
            <StatsCard title={'Products'} amount={inventoriesStats.products_count} hideCurrency/>
          </Col>
          <Col xs={24} md={12} lg={12} xl={12}>
            <StatsCard title={'Low Stock'} amount={inventoriesStats.low_inventory_count} hideCurrency/>
          </Col>
          <Col xs={24} md={12} lg={12} xl={12}>
            <StatsCard title={'Cost of Goods'} amount={inventoriesStats.cost_of_goods} />
          </Col>
          <Col xs={24} md={12} lg={12} xl={12}>
            <StatsCard title={'Retail Price'} amount={inventoriesStats.retail_price} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default DistStatsCards;
