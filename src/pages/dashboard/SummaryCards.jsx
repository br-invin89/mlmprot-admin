import { Spin, StatsCard } from '@/components';
import styles from './DashboardPage.less';
import React, { useEffect, useState } from 'react';
import { getDashboardHeaderStatsApi } from '@/services/dashboard';
import { t } from '@/utils/label';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState({
    today_sales: 0,
    month_sales: 0,
    ytd_sales: 0,
    total_sales: 0,
  });

  const onGetSummaryData = (data) => {
    setSummaryData(data);
    setIsLoading(false);
  };

  const onFailSummaryData = () => {
    setIsLoading(false);
  };

  const loadSummaryData = () => {
    setIsLoading(true);
    getDashboardHeaderStatsApi(onGetSummaryData, onFailSummaryData);
  };

  useEffect(() => {
    loadSummaryData();
  }, []);

  if (isLoading) {
    return <Spin spinning={true} />;
  }

  return (
    <>
      <div className={`${styles.summarycard}`}>
        <StatsCard
          title={
            t("pages.dashboard.todaySales", "Today's Sales")
          }
          amount={summaryData.today_sales}
          loading={isLoading}
        />
      </div>
      <div className={`${styles.summarycard}`}>
        <StatsCard
          title={t("pages.dashboard.thisMonth", "This Month")}
          amount={summaryData.month_sales}
          loading={isLoading}
        />
      </div>
      <div className={`${styles.summarycard}`}>
        <StatsCard
          title={t("pages.dashboard.ytd", "YTD")}
          amount={summaryData.ytd_sales}
          loading={isLoading}
        />
      </div>
      <div>
        <StatsCard
          title={t("pages.dashboard.totalSales", "Total Sales")}
          amount={summaryData.total_sales}
          loading={isLoading}
        />
      </div>
    </>
  );
};
