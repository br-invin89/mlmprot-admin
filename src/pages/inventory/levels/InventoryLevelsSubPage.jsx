import React, { useState, useEffect } from 'react';
import { Col, Row, Spin } from '@/components';
// import { varKey } from '@/common/var';
import DistStatsCards from './DistStatsCards';
import InventoryLevelsTable from './InventoryLevelsTable';
import ManageInventoryForm from './ManageInventoryForm';

const InventoryLevelsSubPage = ({
  distCenters,
  isLoading,
  products,
  loadProducts, // loadDigitalProducts,
}) => {
  const [currentDistCenter, setCurrentDistCenter] = useState();
  const [reloadTableData, setReloadtableData] = useState(false);
  const handleDistCentersChange = (value) => {
    const distCenter = distCenters.filter((item) => item.value === value);
    setCurrentDistCenter(distCenter[0]);
  };

  useEffect(() => {
    if (!currentDistCenter && distCenters && distCenters.length) {
      setCurrentDistCenter(distCenters[0].value);
    }
  }, [distCenters]);

  useEffect(() => {
    if (currentDistCenter) {
      // if (varKey('distCenter.isDigital', currentDistCenter.is_digital) === 'yes') {
      //   loadDigitalProducts()
      // } else {
      loadProducts();
      // }
    }
  }, [currentDistCenter]);

  return (
    <>
      <div>
        <Row gutter={[15, 15]}>
          <Col xs={24} xl={8}>
            {isLoading ? (
              <Spin spinning={true} />
            ) : (
              <DistStatsCards
                changeDistCenters={handleDistCentersChange}
                distCenters={distCenters}
                reloadTableData={reloadTableData}
                loadProducts={loadProducts}
              />
            )}
            {currentDistCenter && (
              <ManageInventoryForm
                currentDisCenter={currentDistCenter}
                isLoading={isLoading}
                products={products}
                setReloadtableData={setReloadtableData}
                reloadTableData={reloadTableData}
              />
            )}
          </Col>
          <Col xs={24} xl={16}>
            <InventoryLevelsTable
              currentDistCenter={currentDistCenter}
              distCenters={distCenters}
              isLoading={isLoading}
              reloadTableData={reloadTableData}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InventoryLevelsSubPage;
