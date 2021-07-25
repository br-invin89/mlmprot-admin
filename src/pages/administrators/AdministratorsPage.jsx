import React, {useEffect, useState} from 'react';
import {PageContainer, Row, Col, SuccessNotification, AddEditModal, Button, ErrorNotification} from '@/components';
import AdministratorsTableView from './AdministratorsTableView';
import AdministratorsCardView from './AdministratorsCardView';
import { getUser } from '@/utils/localStorage';
import {createAdministratorsApi, getAdministratorsApi, updateAdministratorsApi, changeAdministratorsPasswordApi} from "@/services/administrators/administrators";
import { t } from '@/utils/label';
import styles from "@/pages/administrators/AdministratorsPage.less";
import cardViewIcon from "@/assets/icons/Tile Icon.svg";
import cardViewLighIcon from "@/assets/icons/Tile Icon Light.svg";
import tableViewIcon from "@/assets/icons/List Icon.svg";
import tableViewLightIcon from "@/assets/icons/List Icon Light.svg";
import DepartmentModalContent from "@/pages/administrators/DepartmentsModalContent";
import AdministratorModalContent from "@/pages/administrators/AdministratorModalContent";

const AdministratorsPage = () => {
  const [view, setView] = useState('cards');
  const [currentUser, setCurrentUser] = useState('cards');
  const [isLoading, setIsLoading] = useState(false);
  const [administratorsData, setAdministratorsData] = useState([]);
  const [activeAddModal, setActiveAddModal] = useState(false);
  const [activeEditModal, setActiveEditModal] = useState(false);

  const [isManageDepartmentModalOpened, setIsManageDepartmentModalOpened] = useState(null);

  const onGetAdministratorsData = (tableData_) => {
    const {data} = tableData_
    setAdministratorsData(data)
    setIsLoading(false);
  };

  const onFailAdministratorsData = () => {
    setIsLoading(false);
  };

  const loadAdministrators = async () => {
    setIsLoading(true);
    getAdministratorsApi(onGetAdministratorsData, onFailAdministratorsData)
  }

  useEffect(() => {
    setCurrentUser(getUser())
    loadAdministrators()
  }, []);

  const [editingItem, setEditingItem] = useState(undefined);

  const onCreateAdministratorsApiSuccess = (resp, callBack) => {
    SuccessNotification(t('common.alert.recordAddedSuccessfully', 'New record added successfully'))
    loadAdministrators()
    setActiveAddModal(false);
    if (callBack) {
      callBack(resp);
    }
  };

  const onCreateAdministratorsApiError = (resp, failBack) => {
    setActiveAddModal(false);
    if (failBack) {
      failBack(resp);
    }
  };

  const createAdministrators = (data, callBack, failBack) => {
    let data_ = data
    if (!data_.ip_addresses) {
      data_['ip_addresses'] = []
    }
    try {
      createAdministratorsApi(
        data_,
        (resp) => {
          onCreateAdministratorsApiSuccess(resp, callBack);
        },
        (resp) => {
          onCreateAdministratorsApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while creating Administrators');
    }
  };

  const onEditItem = (row) => {
    setEditingItem({
      ...row,
      department_id: row.department ? row.department.id : '',
      ip_addresses: row.ip_addresses.map(item => item.ip_address)
    });
    setActiveEditModal(true)
  };

  const onUpdateAdministratorsApiSuccess = (resp, callBack) => {
    SuccessNotification(t('common.alert.dateHasUpdatedSuccessfully', 'Successfully updated.'))
    setEditingItem(null);
    setActiveEditModal(false)
    loadAdministrators(``)
    if (callBack) {
      callBack(resp);
    }
  };

  const onUpdateAdministratorsApiError = (resp, failBack) => {
    setActiveEditModal(false)
    if (failBack) {
      failBack(resp);
    }
  };

  const updateAdministrators = (data, callBack, failBack) => {
    try {
      updateAdministratorsApi(
        editingItem.id,
        data,
        (resp) => {
          onUpdateAdministratorsApiSuccess(resp, callBack);
        },
        (resp) => {
          onUpdateAdministratorsApiError(resp, failBack);
        },
      );
    } catch (e) {
      console.log('Error while updating Administrators');
    }
  };

  const onHandleStatus = () => {
    loadAdministrators(``)
  }

  const onUpdateDepartment = () => {
    setIsManageDepartmentModalOpened(false);
    // setCurrentUser(getUser())
    loadAdministrators()
  }

  const onchangeAdministratorsPasswordApiSuccess = (resp) => {
    SuccessNotification(t('common.alert.dateHasUpdatedSuccessfully', 'Successfully updated.'))
    setEditingItem(null);
    loadAdministrators(``)
  };

  const onchangeAdministratorsPasswordApiError = (resp) => {
    ErrorNotification('Uploading Failed');
  };

  const changeAdministratorsPassword = (data) => {
    try {
      changeAdministratorsPasswordApi(
        editingItem.id,
        data,
        (resp) => {
          onchangeAdministratorsPasswordApiSuccess(resp);
        },
        (resp) => {
          onchangeAdministratorsPasswordApiError(resp);
        },
      );
    } catch (e) {
      console.log('Error while updating Administrators');
    }
  };

  const dataSortedByid = administratorsData.sort((a, b) => (a.id > b.id) ? 1 : -1)
  return (
    <PageContainer>
      <Row>
        <Col span={24}>
          <Row gutter={[15, 15]} className={styles.administratorHeader}>
            <Col span={24}>
              <Row>
                <Col xs={24} sm={24}>
                  <div className={`${styles.listContainer} mb-15`}>
                  <div>
                  <span className={`${styles.totalAdministrators} mr-10`}>
                    {administratorsData.length}{' '}
                    {administratorsData.length > 1 ? t("pages.administrators.administrators","Administrators") : t("pages.administrators.administrator","Administrator")}
                  </span>
                    </div>
                    <div className={styles.listViewContainer}>
                      {view === 'cards' ? (
                        <img
                          src={cardViewIcon}
                          width={20}
                          height={20}
                          className={styles.viewCardIcon}
                        />
                      ) : (
                        <img
                          src={cardViewLighIcon}
                          width={20}
                          height={20}
                          onClick={() => setView('cards')}
                          className={styles.viewCardIcon}
                        />
                      )}
                      {view === 'table' ? (
                        <img
                          src={tableViewIcon}
                          width={20}
                          height={20}
                          className={styles.viewTableIcon}
                        />
                      ) : (
                        <img
                          src={tableViewLightIcon}
                          width={20}
                          height={20}
                          className={styles.viewTableIcon}
                          onClick={() => setView('table')}
                        />
                      )}

                      <Row className="mr-10">
                        <Col span={24}>
                            <AddEditModal
                              triggerLabel="Manage Departments"
                              open={isManageDepartmentModalOpened}
                              triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                              modalTitle={
                                t("pages.administrators.departments",
                                  "Departments")
                              }
                              toggle={()=>setIsManageDepartmentModalOpened(!isManageDepartmentModalOpened)}
                              hideIcon
                              width="750px"
                            >
                              <DepartmentModalContent
                                onFinish={onUpdateDepartment}
                              />
                            </AddEditModal>                        
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Button onClick={()=>setActiveAddModal(true)}> Add Admin </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {view === 'cards' ?
            <AdministratorsCardView
              isLoading={isLoading}
              administratorsData={dataSortedByid}
              currentUser={currentUser}
              onHandleEdit={onEditItem}
              onHandleStatus={onHandleStatus}
            /> :
            <AdministratorsTableView
              isLoading={isLoading}
              administratorsData={dataSortedByid}
              currentUser={currentUser}
              onHandleEdit={onEditItem}
              onHandleStatus={onHandleStatus}
            />
          }
        </Col>
      </Row>
      {editingItem &&
        <AddEditModal
          onClose={()=>{setEditingItem(null)}}
          modalTitle={
            t("pages.administrators.editAdministrators", "Edit Administrators")
          }
          open={activeEditModal}
          toggle={()=>setActiveEditModal(!activeEditModal)}
        >
          <AdministratorModalContent
            onSave={updateAdministrators}
            data={editingItem}
            saveBtnText={t('common.label.update', 'update')}
            type="edit"
            changeAdminPassword={changeAdministratorsPassword}
          />
        </AddEditModal>
      }
      {activeAddModal &&
        <AddEditModal
          onClose={()=>{setActiveAddModal(false)}}
          modalTitle={t("pages.administrators.addAdministrators", "Add Administrators")}
          open={activeAddModal}
          toggle={()=>setActiveAddModal(!activeAddModal)}
        >
          <AdministratorModalContent
            onSave={createAdministrators}
            saveBtnText={t('common.label.create', 'create')}
            type="add"
          />
        </AddEditModal>
      }
    </PageContainer>
  );
};

export default AdministratorsPage;
