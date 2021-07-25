import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_WITHDRAW_REQUESTS_ROUTE = 'withdraw_requests';
const WITHDRAW_REQUEST_CHANGE_STATUS_ROUTE = 'withdraw_requests/{id}/change_status';
const WITHDRAW_REQUEST_PAY_ROUTE = 'withdraw_requests/pay';
const WITHDRAW_REQUEST_ACCEPT_ALL_ROUTE = 'withdraw_requests/accept_all';
const WITHDRAW_REQUEST_EXPORT_ROUTE = 'withdraw_requests/export';
const WITHDRAW_REQUEST_PAY_BY_ROUTE = 'withdraw_requests/pay_by/{id}';

export function getWithdrawRequestsApi(params, callback, failCallback) {
  request(GET_WITHDRAW_REQUESTS_ROUTE, {
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

export function withdrawRequestChangeStatusApi(id, requestData, callback, failCallback) {
  request(WITHDRAW_REQUEST_CHANGE_STATUS_ROUTE.replace('{id}', id), {
    method: 'PUT',
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

export function withdrawRequestExportApi(params, callback, failCallback) {
  request(WITHDRAW_REQUEST_EXPORT_ROUTE, {
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

export function withdrawRequestAcceptAllApi(callback, failCallback) {
  request(WITHDRAW_REQUEST_ACCEPT_ALL_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function withdrawRequestPayApi(requestData, callback, failCallback) {
  request(WITHDRAW_REQUEST_PAY_ROUTE, {
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

export function withdrawRequestPayByApi(id, callback, failCallback) {
  request(WITHDRAW_REQUEST_PAY_BY_ROUTE.replace('{id}', id), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
