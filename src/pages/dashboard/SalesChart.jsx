import React, { useState, useEffect } from 'react';
import { Row, Col, LineChart, ButtonGroup, Spin } from '@/components';
import styles from './DashboardPage.less';
import { getDashboardSalesChartApi } from '@/services/dashboard';
import { t } from '@/utils/label';

export default () => {
  const [mode, setMode] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);

  const onGetSalesData = (data) => {
    const graphData = [];
    const saleType = [
      { label: 'Affiliate', value: 'affiliate_sales' },
      { label: 'Customer', value: 'preferred_sales' },
      { label: 'Total', value: 'total_sales' },
    ];
    data.map((item) =>
      saleType.map((sale) =>
        graphData.push({
          label: item.label,
          name: sale.label,
          value: parseFloat(item[sale.value] || 0),
        }),
      ),
    );
    setSalesData(graphData);
    setIsLoading(false);
  };
  const onFailSalesData = () => {
    setIsLoading(false);
  };

  const loadSalesData = () => {
    setIsLoading(true);
    const params = {
      mode,
    };
    getDashboardSalesChartApi(params, onGetSalesData, onFailSalesData);
  };

  useEffect(() => {
    loadSalesData();
  }, [mode]);

  return (
    <>
      <Row className={`${styles.payoutContainer}`}>
        <Col xs={24} sm={12} lg={12}>
          <div className={`${styles.title}`}>
            {t("pages.dashboard.sales", "Sales")}
          </div>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <div className={`${styles.payoutBtnContainer}`}>
            <ButtonGroup
              actions={[
                {
                  label: 'This Month',
                  onClick: () => setMode('monthly'),
                  isSelected: mode === 'monthly',
                },
                {
                  label: 'This Year',
                  onClick: () => setMode('yearly'),
                  isSelected: mode === 'yearly',
                },
              ]}
            />
          </div>
        </Col>
      </Row>

      <Row gutter={[0, 0]}>
        <Col span={24}>
          {isLoading ? (
            <Spin spinning={true} />
          ) : (
            <LineChart data={salesData} xField={'label'} yField={'value'} seriesField={'name'} />
          )}
        </Col>
      </Row>
    </>
  );
};
