import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { TablePanel, Row, Col } from '@/components';
import styles from './UserDetailsSubPage.less';
import { asDate } from '@/utils/text';
import { getUserRankHistoriesApi } from '@/services/userSearch/userDetail';

const RankHistoryTable = (props) => {
  const columns = [
    {
      title: 'Rank',
      key: 'name',
      render: (_, record) => <>{record.rank.name}</>,
    },
    {
      title: 'Ranked Date',
      key: 'date',
      render: (_, record) => <>{asDate(record.created_at)}</>,
    },
  ];
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 20,
    total: 0,
  });

  const onGetTableData = (data) => {
    setTableData(data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTableData = (paginationParam0) => {
    const params = {
      per_page: paginationParam0.perPage,
      page: paginationParam0.currentPage,
    };
    setIsLoading(true);
    getUserRankHistoriesApi(props.userData.id, params, onGetTableData, onFailTableData);
  };

  const onPageChange = (currentPage) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage,
    };
    loadTableData(paginationParam0);
  };

  useEffect(() => {
    if (props.userData) loadTableData(paginationParam);
  }, [props.userData]);

  const Header = ({ selectedView, onClick }) => {
    return (
      <div className={`${styles.headerTab}`}>
        <div className={`${styles.tabs}`}>
          <a
            className={selectedView === 'earning' ? `${styles.active}` : ''}
            id="earning"
            onClick={onClick}
          >
            {t('pages.userSearch.earningHistory', 'Earning History')}
          </a>
          <a
            className={selectedView === 'rank' ? `${styles.active}` : ''}
            id="rank"
            onClick={onClick}
          >
            {t('pages.userSearch.rankHistory', 'Rank History')}
          </a>
        </div>
      </div>
    );
  };

  return (
    <>
      <Row className={'rank-table-container'}>
        <Col span={24}>
          <TablePanel
            data={tableData}
            headerTabs={<Header selectedView={props.view} onClick={props.handleViewChange} />}
            columns={columns}
            onPageChange={onPageChange}
            paginationParam={paginationParam}
            loading={isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default RankHistoryTable;
