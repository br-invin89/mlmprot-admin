import React, { useEffect, useState } from 'react';
import { AddEditModal, Col, PageContainer, Row, notification } from '@/components';
import styles from '@/pages/tools/videos/VideosPage.less';
import CategoriesModalContent from '@/pages/tools/videos/CategoriesModalContent';
import AddVideosModal from '@/pages/tools/videos/VideoModalContent';
import {
  createVideosApi,
  getVideosApi,
  updateVideosApi,
  getVideosTypeApi,
} from '@/services/tools/videos';
import { stringToArray } from '@/utils/utils';
import TableView from './table/TableView';
import { t } from '@/utils/label';

const VideosPage = () => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [searchCategory, setSearchCategory] = useState('');
  const [editingItem, setEditingItem] = useState(undefined);
  const [videoTypeList, setVideoTypeList] = useState([]);
  const [searchParam, setSearchParam] = useState({});
  const [tableData, setTableData] = useState([]);

  const toggleCategory = () => {
    setOpenCategory(!openCategory);
  };
  const toggle = () => {
    setOpen(!open);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const onGetVideosApiSuccess = ({ data }) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });

    setIsLoadingTable(false);
  };

  const onGetVideosApiError = () => {
    setIsLoadingTable(false);
  };

  const getVideosList = (params, isSearchParam) => {
    try {
      setIsLoadingTable(true);

      const filter = {
        per_page: paginationParam.perPage,
        sort: '-created_at',
        ...params,
      };
      if (!isSearchParam) {
        Object.keys(searchParam)
          // eslint-disable-next-line array-callback-return
          .map((key) => {
            filter[`filter[${key}]`] = searchParam[key];
          });
      }

      getVideosApi(filter, onGetVideosApiSuccess, onGetVideosApiError);
    } catch (e) {
      console.log('Error in fetching the videos data');
    }
  };

  const loadTable = (currentPage, params_) => {
    const params = {
      page: currentPage || paginationParam.currentPage,
      ...params_,
    };
    getVideosList(params);
  };

  const onCreateVideosApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t('common.alert.recordAddedSuccessfully', 'New record added successfully'),
    });
    loadTable();
    setTimeout(() => {
      toggle();
    }, 2000);
    if (callBack) {
      callBack(resp);
    }
  };

  const onCreateVideosApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const createVideos = (data, callBack, failBack) => {
    try {
      createVideosApi(
        data,
        (resp) => {
          onCreateVideosApiSuccess(resp, callBack);
        },
        (resp) => {
          onCreateVideosApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while creating videos');
    }
  };

  const onEditItem = (row) => {
    setEditingItem({
      ...row,
      eligible_user_types: stringToArray(row.eligible_user_types),
    });
  };

  const onUpdateVideosApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t(
        'common.alert.dateHasUpdatedSuccessfully',
        'Date has been updated successfully',
      ),
    });
    setEditingItem(null);
    loadTable();
    setTimeout(() => {
      editToggle();
    }, 2000);
    if (callBack) {
      callBack(resp);
    }
  };

  const onUpdateVideosApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const updateVideos = (data, callBack, failBack) => {
    try {
      updateVideosApi(
        editingItem.id,
        data,
        (resp) => {
          onUpdateVideosApiSuccess(resp, callBack);
        },
        (resp) => {
          onUpdateVideosApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while updating videos');
    }
  };

  useEffect(() => {
    loadTable(1);
  }, [searchParam]);

  /* START CODE FOR VIDEO CATEGORY */
  const onGetVideosTypeApiSuccess = ({ data }) => {
    setVideoTypeList(data);
  };

  const onGetVideosTypeApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const loadVideosType = () => {
    try {
      getVideosTypeApi({ all: true }, onGetVideosTypeApiSuccess, onGetVideosTypeApiError);
    } catch (e) {
      console.log('Error in fetching the admins data');
    }
  };

  /* END CODE FOR VIDEO CATEGORY */

  useEffect(() => {
    loadVideosType();
  }, []);

  return (
    <PageContainer>
      <Row gutter={[24, 24]} className="administrator-header ">
        <Col xs={24}>
          <div className="list-container">
            <div className="list-view-container">
              <Row className={`${styles.managementDepBtn}`}>
                <Col span={24}>
                  <AddEditModal
                    triggerLabel={t('pages.videos.manageCategories', 'Manage Categories')}
                    triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                    modalTitle={t('pages.videos.manageTypes', 'Manage Types')}
                    hideIcon
                    width="350px"
                    open={openCategory}
                    toggle={toggleCategory}
                  >
                    <CategoriesModalContent
                      videoTypeList={videoTypeList}
                      loadVideosType={loadVideosType}
                      loadTable={loadTable}
                      getVideosList={getVideosList}
                      setSearchCategory={setSearchCategory}
                    />
                  </AddEditModal>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <AddEditModal
                    triggerLabel={t('pages.videos.addVideo', 'Add Video')}
                    triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                    modalTitle={t('pages.videos.uploadVideo', 'Upload Video')}
                    open={open}
                    toggle={toggle}
                  >
                    <AddVideosModal
                      videoTypeList={videoTypeList}
                      onSave={createVideos}
                      saveBtnText={t('pages.videos.publishVideo', 'Publish Video')}
                    />
                  </AddEditModal>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[15, 15]} className="tools-table-container videos-table mt-15">
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
            videoTypeList={videoTypeList}
            setSearchCategory={setSearchCategory}
            searchCategory={searchCategory}
            toggle={editToggle}
          />
        </Col>
      </Row>
      {editingItem && (
        <AddEditModal
          modalTitle={t('pages.videos.editVideo', 'Edit Video')}
          open={editOpen}
          toggle={editToggle}
        >
          <AddVideosModal
            videoTypeList={videoTypeList}
            data={editingItem}
            onSave={updateVideos}
            saveBtnText={t('pages.videos.updateVideo', 'Update Video')}
          />
        </AddEditModal>
      )}
    </PageContainer>
  );
};

export default VideosPage;
