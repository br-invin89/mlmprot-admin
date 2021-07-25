/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import {Col, Row} from '@/components';
import TableView from "./summaryTable/TableView";
import {getInventoriesDailyUnitsApi} from "@/services/inventories";

const DailyUnitNumbersSubPage = () => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Product",
      key: "product",
      dataIndex: "product",
    },
  ])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [searchParam, setSearchParam] = useState({});
  const [tableData, setTableData] = useState([]);

  const onGetInventoriesApiSuccess = (response) => {
    let productData = [];
    let rowDate = [];
    response &&
      response.data &&
      Object.keys(response.data).map((d) => {
        rowDate.push(d);
      });
    if (rowDate && rowDate[0]) {
      response &&
        response.data &&
        response &&
        response.data[rowDate[0]] &&
        response.data[rowDate[0]].map((x) => {
          productData.push({
            product: x && x.product && x.product.title,
          });
        });
    }
    if (productData && productData.length > 0) {
      productData &&
        productData.map((d) => {
          rowDate &&
            rowDate.map((x) => {
              if (
                response &&
                response.data &&
                response.data[x]
              ) {
                let data =
                  response.data[x] &&
                  response.data[x].filter(
                    (o) => d.product === o.product.title
                  );
                d[x] = data && data[0] && data[0].count;
              }
            });
        });
    }

    setColumns([
      {
        title: "Product",
        key: "product",
        dataIndex: "product",
      },
      ...rowDate.map((d) => {
        return({
          title: d,
          key: d,
          dataIndex: d,
        });
      })
    ])
    setTableData(productData);
    setPaginationParam({
      currentPage: response.current_page,
      perPage: response.per_page,
      total: response.total,
    });
    setIsLoadingTable(false);
  };

  const onGetInventoriesApiError = () => {
    setIsLoadingTable(false);
  };

  const getInventoriesList = (params) => {
    setIsLoadingTable(true);
    const filter = {
      per_page: paginationParam.perPage,
      ...params,
    };

    Object.keys(searchParam)
      .map((key) => {
        filter[`${key}`] = searchParam[key];
      });

    getInventoriesDailyUnitsApi(filter, onGetInventoriesApiSuccess, onGetInventoriesApiError);
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
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
};

export default DailyUnitNumbersSubPage;
