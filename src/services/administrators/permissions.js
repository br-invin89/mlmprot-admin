import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const PERMISSIONS_ROUTE = 'permissions';
const PERMISSIONS_ACTION_ROUTE = `permissions/{id}`;
const GET_ACTION_PERMISSIONS_ROUTE = `action_permissions`;

export function createPermissionsApi(params, callback, failCallback) {
  return request(PERMISSIONS_ROUTE, {
    method: 'POST',
    data: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function updatePermissionsApi(id, params, callback, failCallback) {
  return request(PERMISSIONS_ACTION_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function deletePermissionsApi(id, params, callback, failCallback) {
  return request(PERMISSIONS_ACTION_ROUTE.replace('{id}', id), {
    method: 'DELETE'
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function getPermissionsApi(params, callback, failCallback) {
  return request(`${PERMISSIONS_ROUTE}${params}`, {
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

export function  getActionPermissionsApi(params, callback, failCallback) {
  return request(`${GET_ACTION_PERMISSIONS_ROUTE}${params}`, {
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