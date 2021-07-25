import React, { useState, useEffect } from 'react';
import { Col, Row, PageContainer } from '@/components';
import { getAutoshipReportApi } from '@/services/reports/autoshipReport';
import TableView from './table/TableView';
import DetailModal from './table/DetailModal';

export default function AutoshipReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const onGetTableData = (res) => {
    setTableData(res.data);
    setPaginationParam({
      currentPage: res.current_page,
      perPage: res.per_page,
      total: res.total,
    });
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTable = (paginationParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
    };
    getAutoshipReportApi(params, onGetTableData, onFailTableData);
  };

  useEffect(() => {
    loadTable(paginationParam);
  }, []);

  return (
    <PageContainer>
      <Row className="autoshipreport-table-container">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            setPaginationParam={setPaginationParam}
            paginationParam={paginationParam}
            loadTable={loadTable}
            setSelectedDate={setSelectedDate}
          />
        </Col>
      </Row>
      {selectedDate && (
        <DetailModal selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      )}
    </PageContainer>
  );
}
