/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  AddEditModal,
  Col,
  PageContainer,
  Pagination,
  Row,
  Spin,
  notification,
} from '@/components';
import ResourceModalContent from '@/pages/tools/resources/ResourceModalContent';
import ResourcesCard from '@/pages/tools/resources/ResourcesCard';
import {
  createResourcesApi,
  deleteResourcesApi,
  getResourcesApi,
  updateResourcesApi,
} from '@/services/tools/resources';
import { stringToArray } from '@/utils/utils';
import { t } from '@/utils/label';
import TableView from './table/TableView';

const ResourcesPage = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [editingItem, setEditingItem] = useState(undefined);
  const [deletingItem, setDeletingItem] = useState({});
  const [resourceData, setResourcesData] = useState([]);

  const toggle = () => {
    setOpen(!open);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const onGetResourcesApiSuccess = ({ data }) => {
    setResourcesData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });

    setIsLoadingData(false);
  };

  const onGetResourcesApiError = () => {
    setIsLoadingData(false);
  };

  const getResourcesList = (params) => {
    try {
      setIsLoadingData(true);

      getResourcesApi(params, onGetResourcesApiSuccess, onGetResourcesApiError);
    } catch (e) {
      console.log('Error in fetching the Resources data', e);
    }
  };

  const onPageChange = (currentPage) => {
    const params = {
      per_page: paginationParam.perPage,
      page: currentPage,
    };
    getResourcesList(params);
  };

  const loadResources = () => {
    onPageChange(paginationParam.currentPage);
  };

  const onDeleteResourceApiSuccess = (id, resp, callBack) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t('common.alert.resourceDeletedSuccessfully','Resource deleted successfully'),
    });
    setDeletingItem({
      ...deletingItem,
      [id]: false,
    });
    loadResources();
    if (callBack) {
      callBack(resp);
    }
  };

  const onDeleteResourceApiError = (id, resp, failBack) => {
    setDeletingItem({
      ...deletingItem,
      [id]: false,
    });
    if (failBack) {
      failBack(resp);
    }
  };

  const onConfirmDeleteItem = (id, callBack, failBack) => {
    try {
      setDeletingItem({
        ...deletingItem,
        [id]: true,
      });
      deleteResourcesApi(
        id,
        (resp) => {
          onDeleteResourceApiSuccess(id, resp, callBack);
        },
        (resp) => {
          onDeleteResourceApiError(id, resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while deleting resource');
    }
  };

  const onCreateResourceApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success','Success',),
      description: t('common.alert.resourceAddedSuccessfully','Resource added successfully'),
    });
    loadResources();
    setTimeout(() => {
      toggle()
    }, 2000)
    if (callBack) {
      callBack(resp);
    }
  };

  const onCreateResourceApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const createResources = (data, callBack, failBack) => {
    try {
      createResourcesApi(
        data,
        (resp) => {
          onCreateResourceApiSuccess(resp, callBack);
        },
        (resp) => {
          onCreateResourceApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while creating resource');
    }
  };

  const onEditItem = (row) => {
    setEditingItem({
      ...row,
      eligible_user_types: stringToArray(row.eligible_user_types),
    });
  };

  const onUpdateResourceApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success','Success',),
      description: t('common.alert.resourceUpdatedSuccessfully','Resource updated successfully'),
    });
    setEditingItem(null);
    loadResources();
    setTimeout(() => {
      editToggle()
    }, 2000)
    if (callBack) {
      callBack(resp);
    }
  };

  const onUpdateResourceApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const updateResources = (data, callBack, failBack) => {
    try {
      updateResourcesApi(
        editingItem.id,
        data,
        (resp) => {
          onUpdateResourceApiSuccess(resp, callBack);
        },
        (resp) => {
          onUpdateResourceApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while updating resource');
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <PageContainer fluid>
      <Row gutter={[24, 24]} className="administrator-header">
        <Col xs={24}>
          <div className="list-container">
            <div className="list-pagination-container">
              <div>
                <Pagination
                  current={paginationParam.currentPage}
                  pageSize={paginationParam.perPage}
                  total={paginationParam.total}
                  showSizeChanger={false}
                  onChange={onPageChange}
                  hideOnSinglePage={true}
                />
              </div>
            </div>
            <div className="list-view-container">
              <AddEditModal
                triggerLabel={t('pages.resources.addResource', 'Add Resource')}
                triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                modalTitle={t('pages.resources.addResource','Add Resource')}
                open={open}
                toggle={toggle}
              >
                <ResourceModalContent
                  onSave={createResources}
                  saveBtnText={t('pages.resources.addResource','Add Resource')}
                />
              </AddEditModal>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className="tools-main-container mt-15">
        {isLoadingData ? (
          <Spin spinning={true} className="mc" />
        ) : (
          <>
            {resourceData == '' ? (
              <TableView tableData={''}></TableView>
            ) : (
              resourceData.map((record, idx) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} className="mb-4" key={idx}>
                  <ResourcesCard
                    {...{
                      record,
                      onConfirmDeleteItem,
                      onEditItem,
                      editToggle
                    }}
                  />
                </Col>
              ))
            )}
          </>
        )}
      </Row>

      {editingItem && (
        <AddEditModal
          modalTitle={t({
            id: 'pages.resources.editResource',
            defaultMessage: 'Edit Resource',
          })}
          open={editOpen}
          toggle={editToggle}
        >
          <ResourceModalContent
            data={editingItem}
            onSave={updateResources}
            saveBtnText={t('pages.resources.updateResource', 'Update Resource')}
          />
        </AddEditModal>
      )}
    </PageContainer>
  );
};

export default ResourcesPage;
