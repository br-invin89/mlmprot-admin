/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import {Col,Row} from '@/components';
import moment from 'moment';
import {getInventoriesLogApi} from "@/services/inventories";
import TableView from "./summaryTable/TableView";

const InventoryLogsSubPage = ({distCenters, products}) => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
    dist_center_id: '',
    product_id: '',
  });
  const [tableData, setTableData] = useState([]);

  const onGetInventoriesApiSuccess = ({ data }) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });

    setIsLoadingTable(false);
  };

  const onGetInventoriesApiError = () => {
    setIsLoadingTable(false);
  };

  const getInventoriesList = (params) => {
    try {
      setIsLoadingTable(true);
      const filter = {
        per_page: paginationParam.perPage,
        ...params,
      };

      Object.keys(searchParam)
        .map((key) => {
          filter[`filter[${key}]`] = searchParam[key];
        });

      getInventoriesLogApi(filter, onGetInventoriesApiSuccess, onGetInventoriesApiError);
    } catch (e) {
      console.log('Error in fetching the news data');
    }
  };

  const loadTable = (currentPage) => {
    const params = {
      page: currentPage || paginationParam.currentPage,
    };
    getInventoriesList(params);
  };

  useEffect(() => {
    loadTable(1);
  }, [searchParam]);

  return (
    <>
      <Row gutter={[15, 15]} className="search-result-container mt-10">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoadingTable}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            distCenters={distCenters}
            products={products}
          />
        </Col>
      </Row>
    </>
  );
};

export default InventoryLogsSubPage;
