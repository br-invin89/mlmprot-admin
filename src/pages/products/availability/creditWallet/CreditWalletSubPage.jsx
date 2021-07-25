/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { PageContainer, Row, Col, SuccessNotification } from '@/components';
import CreditWalletSubPageHeader from './CreditWalletSubPageHeader';
import { loadProductsApi } from '@/services/common';
import {
  getProductAvailabilitiesApi,
  deleteProductsAvailabilityApi,
} from '@/services/products/productAvailability';
import TableView from './summaryTable/TableView';
import { varValue } from '@/common/var';

const CreditWalletSubPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [productId, setProductId] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchParam, setSearchParam] = useState({
    product_id: '',
    country: '',
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [tableData, setTableData] = useState([]);
  const [allProductsOption, setAllProductsOption] = useState(null);

  const toggle = () => {
    setOpen(!open);
  };

  const loadTable = (paginationParam_, searchParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
      'filter[country]': searchParam_.country,
      'filter[product_id]': searchParam_.product_id,
    };
    getProductAvailabilitiesApi(
      varValue('productAvailability.kind', 'create_member'),
      params,
      onGetCreditWalletList,
      onFailCreditWalletList,
    );
  };

  const onGetCreditWalletList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailCreditWalletList = () => {
    setIsLoading(false);
  };

  const deleteProductsAvailability = (id) => {
    setIsLoadingDelete(true);
    setProductId(id);
    deleteProductsAvailabilityApi(
      varValue('productAvailability.kind', 'create_member'),
      id,
      onDeleteProductAvailabilitySuccess,
      onDeleteProductAvailabilityFail,
    );
  };

  const onDeleteProductAvailabilitySuccess = (data) => {
    setProductId(null);
    loadTable(paginationParam, searchParam);
    SuccessNotification(data.message);
    setIsLoadingDelete(false);
  };

  const onDeleteProductAvailabilityFail = () => {
    setProductId(null);
    setIsLoadingDelete(false);
  };

  const onGetAllProducts = (data) => {
    let allProducts = [];
    data.map((item) => {
      allProducts.push({
        label: item.title,
        value: item.id,
      });
    });
    setAllProductsOption(allProducts);
  };

  const onFailGetAllProducts = () => {};

  const getAllProducts = () => {
    loadProductsApi(onGetAllProducts, onFailGetAllProducts);
  };
  useEffect(() => {
    loadTable(paginationParam, searchParam);
    getAllProducts();
  }, []);

  return (
    <PageContainer>
      <CreditWalletSubPageHeader
        allProductsOption={allProductsOption}
        paginationParam={paginationParam}
        searchParam={searchParam}
        loadTable={loadTable}
        toggle={toggle}
        open={open}
      />
      <Row>
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            allProductsOption={allProductsOption}
            setSearchParam={setSearchParam}
            setPaginationParam={setPaginationParam}
            paginationParam={paginationParam}
            searchParam={searchParam}
            loadTable={loadTable}
            deleteProductsAvailability={deleteProductsAvailability}
            isLoadingDelete={isLoadingDelete}
            productId={productId}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CreditWalletSubPage;
