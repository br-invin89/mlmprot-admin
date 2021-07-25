/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Col, Row, PageContainer, Checkbox } from '@/components';
import TableView from './table/TableView';
import { t } from '@/utils/label';
import styles from './WithdrawalRequestsPage.less';
import { getWithdrawRequestsApi } from '@/services/withdrawRequest';

export default function WithdrawlRequestsPage() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    username: '',
    status: '',
    payout_provider_id: '',
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

  const loadTable = (paginationParam0, searchParam0) => {
    setIsLoading(true);
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
      'filter[username]': searchParam0.username,
      'filter[status]': searchParam0.status,
      'filter[payout_provider_id]': searchParam0.payout_provider_id,
    };
    getWithdrawRequestsApi(params, onGetTableData, onFailTableData);
  };

  const onPageChange = (page) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: page,
    };
    loadTable(paginationParam0, searchParam);
  };

  const handleSearch = (searchParam0) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage: 1,
    };
    setSearchParam({
      username: searchParam0.username,
      status: searchParam0.status,
    })
    loadTable(paginationParam0, searchParam0);
  };

  const reloadTable = () => {
    loadTable(paginationParam, searchParam);
  };

  useEffect(() => {
    loadTable(paginationParam, searchParam);
  }, []);

  return (
    <PageContainer>
      {/*
      <Row className="mb-15">
        <Col xs={24} sm={24}>
          <Checkbox
            className={styles.visibilityCheckbox}
            label={t('pages.withdrawalRequests.allowAutomaticWithdraw', 'Allow automatic withdraw.')}
            name="is_preferred_customer"
          />
        </Col>
      </Row>
      */}
      <Row>
        <Col span={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            handleSearch={handleSearch}
            reloadTable={reloadTable}
            onPageChange={onPageChange}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
