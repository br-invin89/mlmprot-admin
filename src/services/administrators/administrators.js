import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_ADMINISTRATORS_ROUTE = 'admins';
const CHANGE_ADMINISTRATOR_STATUS_ROUTE = 'admins/{id}/change_status'
const ADMIN_ACTION_ROUTE = `admins/{id}`;

export function getAdministratorsApi(callback, failCallback) {
  return request(`${GET_ADMINISTRATORS_ROUTE}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function createAdministratorsApi(params, callback, failCallback) {
  return request(GET_ADMINISTRATORS_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function updateAdministratorsApi(id, params, callback, failCallback) {
  return request(ADMIN_ACTION_ROUTE.replace('{id}', id), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function changeAdministratorsStatusApi(id, params, callback, failCallback) {
  return request(CHANGE_ADMINISTRATOR_STATUS_ROUTE.replace('{id}', id), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function deleteAdministratorsApi(id, params, callback, failCallback) {
  return request(ADMIN_ACTION_ROUTE.replace('{id}', id), {
    headers: { Authorization: `Bearer ${getToken()}` },
    method: 'DELETE'
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function changeAdministratorsPasswordApi(id, params, callback, failCallback) {
  return request(CHANGE_ADMINISTRATOR_PASSWORD_ROUTE.replace('{id}', id), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}