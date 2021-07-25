import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import InventoryLevelsSubPage from './levels/InventoryLevelsSubPage';
import InventoryLogsSubPage from './logs/InventoryLogsSubPage';
import DailyUnitNumbersSub from './dailyUnitNumbers/DailyUnitNumbersSubPage';
import { getDistCentersApi } from '@/services/distCenters';
import { loadProductsApi } from '@/services/common';

const InventoryPage = () => {
  const [tab, setTab] = useState('Inventory Levels');
  const [isLoading, setIsLoading] = useState(false);
  const [distCenters, setDistCenters] = useState([]);
  const [products, setProducts] = useState([]);
  const onGetDistCenters = (tableData_) => {
    const disCenters0 = tableData_.data.map((item) => {
      return { value: item.id, label: item.name };
    });
    setDistCenters(disCenters0);
    setIsLoading(false);
  };

  const onFailDistCenters = () => {
    setIsLoading(false);
  };

  const loadDistCenters = (param) => {
    setIsLoading(true);
    getDistCentersApi(param, onGetDistCenters, onFailDistCenters);
  };

  const onGetProducts = (data) => {
    const products0 = data.map((item) => {
      return { ...item, value: item.id, label: item.title };
    });
    setProducts(products0);
  };

  const onFailProducts = () => {};

  const loadProducts = () => {
    loadProductsApi(onGetProducts, onFailProducts);
  };

  // const loadDigitalProducts = () => {
  //   loadDigitalProductsApi(onGetProducts, onFailProducts);
  // }

  useEffect(() => {
    loadDistCenters('');
  }, []);

  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Inventory Levels' && (
        <InventoryLevelsSubPage
          distCenters={distCenters}
          isLoading={isLoading}
          products={products}
          loadProducts={loadProducts}
          // loadDigitalProducts={loadDigitalProducts}
        />
      )}
      {tab === 'Inventory Logs' && (
        <InventoryLogsSubPage distCenters={distCenters} products={products} />
      )}
      {tab === 'Daily Unit Numbers' && <DailyUnitNumbersSub />}
    </PageContainer>
  );
};

export default InventoryPage;
