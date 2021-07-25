/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { PageContainer, SuccessNotification } from '@/components';
import {
  getFraudSettingsApi,
  updateFraudSettingsApi,
  deleteFraudSettingsApi,
  createFraudSettingsApi,
} from '@/services/fraudManagement/fraudSettings';
import FraudSettingsPageHeader from './FraudSettingsPageHeader';
import TableView from './summaryTable/TableView';

const FraudSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

  const loadTable = () => {
    setIsLoading(true);
    getFraudSettingsApi(onGetFraudSettingsList, onFailFraudSettingsList);
  };

  const onGetFraudSettingsList = (data) => {
    setTableData(data);
    setIsLoading(false);
  };

  const onFailFraudSettingsList = () => {
    setIsLoading(false);
  };

  const createFraudSettings = (data) => {
    setIsUpdateLoading(true);
    createFraudSettingsApi(data, onCreateraudSuccess, onUpdateFraudFail);
  };

  const updateFraudSettings = (data) => {
    setIsUpdateLoading(true);
    updateFraudSettingsApi(editData.id, data, onUpdateFraudSuccess, onUpdateFraudFail);
  };

  const onUpdateFraudSuccess = (data) => {
    loadTable();
    editToggle();
    SuccessNotification(data.message);
    setIsUpdateLoading(false);
  };

  
  const onCreateraudSuccess = (data) => {
    loadTable();
    toggle();
    SuccessNotification(data.message);
    setIsUpdateLoading(false);
  };

  const onUpdateFraudFail = () => {
    setIsUpdateLoading(false);
  };

  const deleteFraudSetting = (id) => {
    setIsLoadingDelete(true);
    setId(id);
    deleteFraudSettingsApi(id, onDeleteFraudSettingSuccess, onDeleteFraudSettingFail);
  };

  const onDeleteFraudSettingSuccess = (data) => {
    setId(null);
    loadTable();
    SuccessNotification(data.message);
    setIsLoadingDelete(false);
  };

  const onDeleteFraudSettingFail = () => {
    setId(null);
    setIsLoadingDelete(false);
  };
  
  const toggle = () => {
    setOpen(!open);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  useEffect(() => {
    loadTable();
  }, []);
  return (
    <PageContainer>
      <FraudSettingsPageHeader
        open={open}
        toggle={toggle}
        onFinish={createFraudSettings}
        isUpdateLoading={isUpdateLoading}
      />
      <TableView
        tableData={tableData}
        isLoading={isLoading}
        loadTable={loadTable}
        setEditData={setEditData}
        editData={editData}
        onFinish={updateFraudSettings}
        isUpdateLoading={isUpdateLoading}
        deleteFraudSetting={deleteFraudSetting}
        isLoadingDelete={isLoadingDelete}
        deleteId={id}
        open={editOpen}
        toggle={editToggle}
      />
    </PageContainer>
  );
};

export default FraudSettingsPage;
