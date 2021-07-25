import React, { useEffect, useState } from 'react';
import { getAutoshipReportByDateApi } from '@/services/reports/autoshipReport';
import { Modal } from 'antd';
import { TablePanel, UserAvatar, UserStatusBadge, Tooltip } from '@/components';
import { varLabel } from '@/common/var';
import { asDate, asPrice } from '@/utils/text';
import styles from '../AutoshipReportPage.less';

export default function DetailModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const columns = [
    {
      title: 'User',
      dataIndex: 'autoship',
      key: 'autoship',
      render: (_, record) => (
        <UserAvatar
          image={record.autoship.user.image}
          title={`${record.autoship.user.first_name} ${record.autoship.user.last_name}`}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <div>{asPrice(text)}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => <UserStatusBadge status={varLabel('autoshipHistory.status', data)} />,
    },
    {
      title: 'Pv',
      dataIndex: 'pv',
      key: 'pv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Cv',
      dataIndex: 'cv',
      key: 'cv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (text) => (
        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: text }} />}>
          <div dangerouslySetInnerHTML={{ __html: text }} className={styles.detailComment} />
        </Tooltip>
      ),
    },
  ];

  const onGetDetailData = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailDetailData = () => {
    setIsLoading(false);
  };

  const loadTable = (paginationParam_) => {
    setIsLoading(true);
    getAutoshipReportByDateApi(
      props.selectedDate,
      {
        page: paginationParam_.currentPage,
        per_page: paginationParam_.perPage,
      },
      onGetDetailData,
      onFailDetailData,
    );
  };

  useEffect(() => {
    if (props.selectedDate) {
      const paginationParam0 = {
        ...paginationParam,
        currentPage: 1,
      };
      loadTable(paginationParam0);
    }
  }, [props.selectedDate]);

  const onPageChange = (page) => {
    const paginationParam0 = { ...paginationParam, currentPage: page };
    loadTable(paginationParam0);
  };

  return (
    <Modal
      title={`${asDate(props.selectedDate)} Autoships`}
      visible={props.selectedDate}
      footer={null}
      width={'50%'}
      onCancel={() => props.setSelectedDate(null)}
    >
      <div className={styles.detailTable}>
        <TablePanel
          data={tableData}
          columns={columns}
          onPageChange={onPageChange}
          paginationParam={paginationParam}
          loading={isLoading}
          hideTopHeader
        />
      </div>
    </Modal>
  );
}
