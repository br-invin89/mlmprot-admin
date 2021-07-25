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
  getTicketsApi,
  createTicketApi,
  updateTicketApi
} from '@/services/support';
import SupportPageHeader from './SupportPageHeader';
import TableView from './summaryTable/TableView';
import { getUser } from '@/utils/localStorage';

const SupportPage = () => {
  const currentUser = getUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchParam, setSearchParam] = useState({
    subject: '',
    type: '',
    priority: '',
    status: '',
    ticket_id: '',
    date_range: '',
  });

  const loadTable = (searchParam_) => {
    setIsLoading(true);
    getTicketsApi(searchParam_ , onGetTicketsList, onFailTicketsList);
  };

  const onGetTicketsList = (data) => {
    setTableData(data);
    setIsLoading(false);
  };

  const onFailTicketsList = () => {
    setIsLoading(false);
  };

  const createTicket = (data) => {
    setIsUpdateLoading(true);
    createTicketApi(data, onCreateTicketSuccess, onUpdateTicketFail);
  };

  const updateTicket = (data) => {
    setIsUpdateLoading(true);
    updateTicketApi(editData.id, data, onUpdateTicketSuccess, onUpdateTicketFail);
  };

  const onUpdateTicketSuccess = (data) => {
    loadTable();
    editToggle();
    SuccessNotification("Updated successfully");
    setIsUpdateLoading(false);
  };

  
  const onCreateTicketSuccess = (data) => {
    loadTable();
    toggle();
    SuccessNotification("Created successfully");
    setIsUpdateLoading(false);
  };

  const onUpdateTicketFail = (error) => {
    setIsUpdateLoading(false);
  };

  const toggle = () => {
    setOpen(!open);
  };
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  useEffect(() => {
    loadTable(searchParam);
  }, []);

  return (
    <PageContainer>
      <SupportPageHeader
        open={open}
        toggle={toggle}
        onFinish={createTicket}
        isUpdateLoading={isUpdateLoading}
      />
      <TableView
        tableData={tableData}
        isLoading={isLoading}
        loadTable={loadTable}
        setEditData={setEditData}
        editData={editData}
        onFinish={updateTicket}
        isUpdateLoading={isUpdateLoading}
        open={editOpen}
        toggle={editToggle}
        setSearchParam={setSearchParam}
        searchParam={searchParam}
      />
    </PageContainer>
  );
};

export default SupportPage;
