import React, { useEffect, useState } from 'react';
import { Table, Spin } from '@/components';
import { getCronReportDetailApi } from '@/services/reports/cronReport';

export default function DetailModal(props) {
  const [tableData, setTableData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: '#',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Description',
      render: (_, data) => <span>{data.description}</span>,
    },
  ];

  const onGetDetail = (data) => {
    setIsLoading(false);
    setTableData(data.details);
  };

  const onFailDetail = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.data) {
      setTableData([]);
      setIsLoading(true);
      getCronReportDetailApi(props.data.id, onGetDetail, onFailDetail);
    }
  }, [props.data]);

  return (
    <div style={{ margin: '-24px' }}>
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <Spin spinning={isLoading} />
    </div>
  );
}
