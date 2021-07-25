import React, { useEffect, useState } from 'react';
import { Row, Col } from '@/components';
import { getMinusBonusHistoriesApi } from '@/services/userSearch/minusBonus';
import TableView from './table/TableView';
import './MinusBonusSubPage.less';

export default function MinusBonusSubPage(props) {
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  // const [searchParam, setSearchParam] = useState({
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [amount, setAmount] = useState(0);

  const onGetTableData = (data) => {
    setTableData(data.histories.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.histories.current_page,
      total: data.histories.total,
    });
    setIsLoading(false);
    setAmount(data.amount);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const handleSearch = (paginationParam0) => {
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    };
    setIsLoading(true);
    getMinusBonusHistoriesApi(props.userId, params, onGetTableData, onFailTableData);
  };

  useEffect(() => {
    if (props.userId) handleSearch(paginationParam);
  }, [props.userId]);

  return (
    <>
      <Row gutter={[15, 15]} className="order-history-table">
        <Col xs={24}>
          <TableView
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            handleSearch={handleSearch}
            isLoading={isLoading}
            tableData={tableData}
            amount={amount}
            userId={props.userId}
          />
        </Col>
      </Row>
    </>
  );
}
