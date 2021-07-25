import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { TablePanel, Row, Col, AddEditModal } from '@/components';
import styles from './UserDetailsSubPage.less';
import { asPrice, asDate } from '@/utils/text';
import { getUserEarningHistoriesApi } from '@/services/userSearch/userDetail';
import { varLabel } from '@/common/var';
import BonusDetailModalContent from './BonusDetailsModalContent';

const EarningHistoryTable = (props) => {
  const columns = [
    {
      title: 'Period',
      key: 'period',
      render: (_, record) => <>{`${asDate(record.from)}~${asDate(record.to)}`}</>,
    },
    {
      title: 'Paid Date',
      key: 'paid_date',
      render: (_, record) => <>{record.paid_at ? asDate(record.paid_at) : '...'}</>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => <>{varLabel('userBonus.status', record.status)}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <AddEditModal
          triggerLabel={'Details'}
          modalTitle={'User Bonus Details'}
          hideIcon
          width="750px"
        >
          <BonusDetailModalContent userId={props.userData.id} data={record} />
        </AddEditModal>
      ),
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
    getUserEarningHistoriesApi(props.userData.id, params, onGetTableData, onFailTableData);
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
      <Row className="earning-table-container">
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

export default EarningHistoryTable;
