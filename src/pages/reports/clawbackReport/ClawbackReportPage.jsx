import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components';
import moment from 'moment';
import TableView from './table/TableView';
import { getClawbackReportApi } from '@/services/reports/clawbackReport';

export default function ClawbackReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    'user.username': '',
    'source_user.username': '',
    created_at_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
  });
  const [tableData, setTableData] = useState([]);

  const onGetTableData = (data) => {
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
    setTableData(data.data);
    setIsLoading(false);
  };
  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTable = (paginationParam0, searchParam0) => {
    setIsLoading(true);
    const params = {
      page: paginationParam0.currentPage,
      perPage: paginationParam0.perPage,
      'filter[created_at_range]': searchParam0.created_at_range,
      'filter[user.username]': searchParam0['user.username'],
      'filter[source_user.username]': searchParam0['source_user.username'],
    };
    getClawbackReportApi(params, onGetTableData, onFailTableData);
  };

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page,
    };
    loadTable(paginationParam0, searchParam);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      <TableView
        tableData={tableData}
        isLoading={isLoading}
        paginationParam={paginationParam}
        onPageChange={onPageChange}
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        loadTable={loadTable}
      />
    </PageContainer>
  );
}
