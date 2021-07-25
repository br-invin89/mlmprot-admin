/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Row, Col } from '@/components';
import { getOrderHistoriesApi } from '@/services/userSearch/orderHistory';
import TableView from './table/TableView';
import './OrderHistorySubPage.less';

const OrderHistorySubPage = (props) => {
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    order_number: '',
    tracking_number: '',
    status: '',
    created_at_range: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

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

  const handleSearch = (paginationParam0, searchParam0) => {
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
      'filter[order_number]': searchParam0.order_number,
      'filter[tracking_number]': searchParam0.tracking_number,
      'filter[status]': searchParam0.status,
      'filter[created_at_range]': searchParam0.created_at_range,
    };
    setIsLoading(true);
    getOrderHistoriesApi(props.userId, params, onGetTableData, onFailTableData);
  };

  useEffect(() => {
    if (props.userId) handleSearch(paginationParam, searchParam);
  }, [props.userId]);

  return (
    <>
      <Row gutter={[15, 15]} className="order-history-table">
        <Col xs={24}>
          <TableView
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            handleSearch={handleSearch}
            isLoading={isLoading}
            tableData={tableData}
            userId={props.userId}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrderHistorySubPage;
