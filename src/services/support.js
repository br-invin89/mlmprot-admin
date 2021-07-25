import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_TICKETS_ROUTE = 'tickets';
const GET_TICKET_MESSAGE_ROUTE = 'tickets/{id}';
const CREATE_TICKET_ROUTE = 'tickets';
const UPDATE_TICKET_ROUTE = 'tickets/{id}/update';
const GET_TICKET_INFO_ROUTE = 'tickets/{id}/info';
const CREATE_TICKET_MESSAGE_ROUTE = 'tickets/message';

export function getTicketsApi(params, callback, failCallback) {
  request(GET_TICKETS_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function getTicketsMessagesApi(id, callback, failCallback) {
  request(GET_TICKET_MESSAGE_ROUTE.replace('{id}', id), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function getTicketInfoApi(id, callback, failCallback) {
  request(GET_TICKET_INFO_ROUTE.replace('{id}', id), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function createTicketApi(requestData, callback, failCallback) {
  request(CREATE_TICKET_ROUTE, {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function updateTicketApi(id, requestData, callback, failCallback) {
  request(UPDATE_TICKET_ROUTE.replace('{id}', id), {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function createTicketMessagesApi(requestData, callback, failCallback) {
  request(CREATE_TICKET_MESSAGE_ROUTE, {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
