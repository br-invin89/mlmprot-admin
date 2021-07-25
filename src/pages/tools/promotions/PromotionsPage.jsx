/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { AddEditModal, Col, PageContainer, Row, notification } from '@/components';
import AddPromotionsModal from '@/pages/tools/promotions/PromotionsModalContent';
import {
  createPromotionsApi,
  getPromotionsApi,
  updatePromotionsApi,
  getPromotiondDetailsApi,
} from '@/services/tools/promotions';
import { getProductApi } from '@/services/products/product';
import { stringToArray } from '@/utils/utils';
import moment from 'moment';
import TableView from './table/TableView';
import { t } from '@/utils/label';

const PromotionsPage = () => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [editingItem, setEditingItem] = useState(undefined);
  const [productList, setProductList] = useState([]);
  const [searchParam, setSearchParam] = useState({
    date_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
  });
  const [tableData, setTableData] = useState([]);

  const toggle = () => {
    setOpen(!open);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const onGetPromotionsApiSuccess = ({ data }) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });

    setIsLoadingTable(false);
  };

  const onGetPromotionsApiError = () => {
    setIsLoadingTable(false);
  };

  const getPromotionsList = (params) => {
    try {
      setIsLoadingTable(true);

      const filter = {
        per_page: paginationParam.perPage,
        sort: '-created_at',
        ...params,
      };

      Object.keys(searchParam)
        // eslint-disable-next-line array-callback-return
        .map((key) => {
          filter[`filter[${key}]`] = searchParam[key];
        });

      getPromotionsApi(filter, onGetPromotionsApiSuccess, onGetPromotionsApiError);
    } catch (e) {
      console.log('Error in fetching the Promotions data', e);
    }
  };

  const loadTable = (currentPage) => {
    const params = {
      page: currentPage || paginationParam.currentPage,
    };
    getPromotionsList(params);
  };

  const onCreateEventApiSuccess = (resp, callBack) => {
    toggle();

    notification.success({
      message: t('messages.success','Success'),
      description: t('common.alert.promotionAddedSuccessfully','New Promotion added successfully'),
    });
    loadTable();
    if (callBack) {
      callBack(resp);
    }
  };

  const onCreateEventApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const createPromotions = (data, callBack, failBack) => {
    try {
      createPromotionsApi(
        data,
        (resp) => {
          onCreateEventApiSuccess(resp, callBack);
        },
        (resp) => {
          onCreateEventApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while creating news');
    }
  };

  const onGetPromotionDetailsApiSuccess = ({ data }) => {
    setIsLoadingTable(false);
    setEditingItem({
      ...data[0],
      eligible_user_types: stringToArray(data[0].eligible_user_types),
    });
  };

  const onGetPromotionDetailsApiError = () => {
    setIsLoadingTable(false);
  };

  const onEditItem = (row) => {
    try {
      setIsLoadingTable(true);
      getPromotiondDetailsApi(
        row.id,
        onGetPromotionDetailsApiSuccess,
        onGetPromotionDetailsApiError,
      );
    } catch (e) {
      console.log('Error while getting promotion details');
    }
  };

  const onUpdateEventApiSuccess = (resp, callBack) => {
    editToggle();

    notification.success({
      message: t('messages.success', 'Success'),
      description: t('common.alert.promotionUpdatedSuccessfully','Promotion has been updated successfully'),
    });
    setEditingItem(null);
    loadTable();
    if (callBack) {
      callBack(resp);
    }
  };

  const onUpdateEventApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const updatePromotions = (data, callBack, failBack) => {
    try {
      updatePromotionsApi(
        editingItem.id,
        data,
        (resp) => {
          onUpdateEventApiSuccess(resp, callBack);
        },
        (resp) => {
          onUpdateEventApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while updating news');
    }
  };

  const onGetProductApiSuccess = ({ data: { data = [] } }) => {
    setProductList(data);
  };

  const onGetProductApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const loadProduct = () => {
    try {
      getProductApi({ all: true, per_page: 1000 }, onGetProductApiSuccess, onGetProductApiError);
    } catch (e) {
      console.log('Error in fetching the admins data');
    }
  };

  useEffect(() => {
    loadTable(1);
  }, [searchParam]);

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <PageContainer>
      <Row gutter={[24, 24]} className="administrator-header">
        <Col xs={24}>
          <div className="list-container">
            <div className="list-view-container">
              <AddEditModal
                triggerLabel={t('pages.promotions.addPromotions', 'Add Promotion')}
                triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                modalTitle={t('pages.promotions.createPromotion', 'Create Promotion')}
                open={open}
                toggle={toggle}
              >
                <AddPromotionsModal
                  productList={productList}
                  onSave={createPromotions}
                  saveBtnText={t('pages.promotions.addPromotions','Add Promotion')}
                />
              </AddEditModal>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className="tools-table-container mt-15 event-table-container">
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoadingTable}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
            onEditItem={onEditItem}
            toggle={editToggle}
            productList={productList}
          />
        </Col>
      </Row>
      {editingItem && (
        <AddEditModal
          modalTitle={t('pages.promotions.editPromotions', 'Edit Promotion')}
          open={editOpen}
          toggle={editToggle}
        >
          <AddPromotionsModal
            data={editingItem}
            productList={productList}
            onSave={updatePromotions}
            saveBtnText={t('pages.promotions.updatePromotions','Update Promotion')}
          />
        </AddEditModal>
      )}
    </PageContainer>
  );
};

export default PromotionsPage;
