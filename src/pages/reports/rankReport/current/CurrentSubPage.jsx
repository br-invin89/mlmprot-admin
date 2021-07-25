/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Col, Row } from '@/components';
import { getCurrentRankReportApi } from '@/services/reports/rankReport';
import TableView from './summaryTable/TableView';
import styles from './CurrentSubPage.less';

const CurrentSubPage = () => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [searchParam, setSearchParam] = useState({
    rank_range: '',
    pv_range: '',
    gv_range: '',
    am_range: '',
    uuid: '',
    // left_pv: '',
    // right_pv: '',
    // left_cv: '',
    // right_cv: '',
    // left_carry_over: '',
    // right_carry_over: '',
    // left_brand_partners: '',
    // right_brand_partners: '',
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);

  const onGetCurrentApiSuccess = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoadingTable(false);
  };

  const onGetCurrentApiError = () => {
    setIsLoadingTable(false);
  };

  const getCurrentRankList = (paginationParam_, searchParam_) => {
    try {
      setIsLoadingTable(true);
      const params = {
        ...searchParam_,
        page: paginationParam_.currentPage,
        per_page: paginationParam_.perPage,
      };
      getCurrentRankReportApi(params, onGetCurrentApiSuccess, onGetCurrentApiError);
    } catch (e) {
      console.log('Error in fetching the data');
    }
  };

  const loadTable = (paginationParam_ , searchParam_) => {
    getCurrentRankList(paginationParam_, searchParam_);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <>
      <Row gutter={[15, 15]} className="current-rank search-result-container mt-10">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoadingTable}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
          />
        </Col>
      </Row>
    </>
  );
};

export default CurrentSubPage;
