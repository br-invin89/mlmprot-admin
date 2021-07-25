import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { AddEditModal, Col, PageContainer, Row, notification } from '@/components';
import EventsModalContent from '@/pages/tools/events/EventsModalContent';
import { createEventsApi, getEventsApi, updateEventsApi } from '@/services/tools/events';
import { stringToArray } from '@/utils/utils';
import TableView from './table/TableView';

const EventsPage = () => {
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

  const onGetEventsApiSuccess = ({ data }) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });

    setIsLoadingTable(false);
  };

  const onGetEventsApiError = () => {
    setIsLoadingTable(false);
  };

  const getEventsList = (params) => {
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

      getEventsApi(filter, onGetEventsApiSuccess, onGetEventsApiError);
    } catch (e) {
      console.log('Error in fetching the Events data', e);
    }
  };

  const loadTable = (currentPage) => {
    const params = {
      page: currentPage || paginationParam.currentPage,
    };
    getEventsList(params);
  };
  const onCreateEventApiSuccess = (resp, callBack) => {
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

  const onCreateEventApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const createEvents = (data, callBack, failBack) => {
    try {
      createEventsApi(
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

  const onEditItem = (row) => {
    setEditingItem({
      ...row,
      eligible_user_types: stringToArray(row.eligible_user_types),
    });
  };

  const onUpdateEventApiSuccess = (resp, callBack) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t('common.alert.eventUpdatedSuccessfully','Event has been updated successfully'),
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

  const onUpdateEventApiError = (resp, failBack) => {
    if (failBack) {
      failBack(resp);
    }
  };

  const updateEvents = (data, callBack, failBack) => {
    try {
      updateEventsApi(
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

  useEffect(() => {
    loadTable(1);
  }, [searchParam]);

  return (
    <PageContainer>
      <Row gutter={[24, 24]} className="administrator-header">
        <Col xs={24}>
          <div className="list-container">
            <div className="list-view-container">
              <AddEditModal
                triggerLabel={t('pages.events.addEvent', 'Add Event')}
                triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                modalTitle={t('pages.events.addEventDetails', 'Add Event Details')}
                open={open}
                toggle={toggle}
              >
                <EventsModalContent
                  onSave={createEvents}
                  open={open}
                  saveBtnText={t('pages.events.addEvent', 'Add Event')}
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
          />
        </Col>
      </Row>

      {editingItem && (
        <AddEditModal
          modalTitle={t('pages.events.editEventsPost', 'Edit Events Post')}
          open={editOpen}
          toggle={editToggle}
        >
          <EventsModalContent
            data={editingItem}
            onSave={updateEvents}
            saveBtnText={t('pages.news.updatePost', 'Update Post')}
          />
        </AddEditModal>
      )}
    </PageContainer>
  );
};

export default EventsPage;
