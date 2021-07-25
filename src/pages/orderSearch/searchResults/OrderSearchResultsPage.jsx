import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from '@/components';
import styles from './OrderSearchResultsPage.less';
import TableView from './table/TableView';
import { getSearchParam } from '@/utils/localStorageMore/orderSearch';
import { searchOrdersApi } from '@/services/orderSearch';

const SearchResultsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
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

  const loadTableData = (paginationParam_) => {
    const searchParam = getSearchParam();
    if (!searchParam) return;
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
    };
    searchOrdersApi(searchParam, params, onGetTableData, onFailTableData);
  };

  useEffect(() => {
    loadTableData(paginationParam);
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Card ghost columns={24}>
          <Row>
            <Col xs={24} className={`${styles.searchResultsContainer} order-search-table`}>
              <TableView
                tableData={tableData}
                isLoading={isLoading}
                paginationParam={paginationParam}
                setPaginationParam={setPaginationParam}
                loadTable={loadTableData}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SearchResultsPage;
