import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { AddEditModal, Col, PageContainer, Row, notification } from '@/components';
import NewsModalContent from '@/pages/tools/news/NewsModalContent';
import { createNewsApi, getNewsApi, updateNewsApi } from '@/services/tools/news';
import { stringToArray } from '@/utils/utils';
import TableView from './table/TableView';

const NewsPage = () => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [editingItem, setEditingItem] = useState(undefined);
  const [searchParam, setSearchParam] = useState({});
  const [tableData, setTableData] = useState([]);

  const toggle = () => {
    setOpen(!open);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const onGetNewsApiSuccess = ({ data }) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });

    setIsLoadingTable(false);
  };

  const onGetNewsApiError = () => {
    setIsLoadingTable(false);
  };

  const getNewsList = (params) => {
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

      getNewsApi(filter, onGetNewsApiSuccess, onGetNewsApiError);
    } catch (e) {
      console.log('Error in fetching the news data');
    }
  };

  const loadTable = (currentPage) => {
    const params = {
      page: currentPage || paginationParam.currentPage,
    };
    getNewsList(params);
  };

  const onCreateNewsApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success','Success'),
      description: t('common.alert.recordAddedSuccessfully','New record added successfully'),
    });
    loadTable();
    setTimeout(() => {
      toggle()
    }, 2000)
    if (callBack) {
      callBack(resp);
    }
  };

  const onCreateNewsApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const createNews = (data, callBack, failBack) => {
    try {
      createNewsApi(
        data,
        (resp) => {
          onCreateNewsApiSuccess(resp, callBack);
        },
        (resp) => {
          onCreateNewsApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while creating news');
    }
  };

  const onEditItem = (row) => {
    setEditingItem({
      ...row,
      eligible_user_types: stringToArray(row.eligible_user_types),
    });
  };

  const onUpdateNewsApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t('common.alert.newsUpdatedSuccessfully', 'News has been updated successfully'),
    });
    setEditingItem(null);
    loadTable();
    setTimeout(() => {
      editToggle()
    }, 2000)
    if (callBack) {
      callBack(resp);
    }
  };

  const onUpdateNewsApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const updateNews = (data, callBack, failBack) => {
    try {
      updateNewsApi(
        editingItem.id,
        data,
        (resp) => {
          onUpdateNewsApiSuccess(resp, callBack);
        },
        (resp) => {
          onUpdateNewsApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while updating news');
    }
  };

  useEffect(() => {
    loadTable(1);
  }, [searchParam]);

  return (
    <PageContainer fluid>
      <Row gutter={[24, 24]} className="administrator-header">
        <Col xs={24}>
          <div className="list-container">
            <div className="list-view-container">
              <AddEditModal
                triggerLabel={
                  t('pages.news.addNews', 'Add News')}
                triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                modalTitle={
                  t('pages.news.addNewsDetails', 'Add News Details')}
                  open={open}
                  toggle={toggle}
              >
                <NewsModalContent
                  onSave={createNews}
                  saveBtnText={
                    t('pages.news.publishPost','Add News')}
                />
              </AddEditModal>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className="tools-table-container news-table-container mt-15">
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

          />
        </Col>
      </Row>
      {editingItem && (
        <AddEditModal
          modalTitle={
            t('pages.news.editNewsPost', 'Edit News Post')}
            open={editOpen}
          toggle={editToggle}
        >
          <NewsModalContent
            data={editingItem}
            onSave={updateNews}
            saveBtnText={
              t('pages.news.updatePost', 'Update Post')}
          />
        </AddEditModal>
      )}
    </PageContainer>
  );
};

export default NewsPage;
