import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_DEPARTMENTS_ROUTE = 'departments';
const CREATE_DEPARTMENT_ROUTE = 'departments';
const UPDATE_DEPARTMENT_ROUTE = 'departments/{id}';
const DELETE_DEPARTMENT_ROUTE = 'departments/{id}';

export function getDepartmentsApi(params, callback, failCallback) {
  request(`${GET_DEPARTMENTS_ROUTE}`, {
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

export function createDepartmentsApi(params, callback, failCallback) {
  request(CREATE_DEPARTMENT_ROUTE, {
    method: 'POST',
    data: params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function updateDepartmentsApi(id, params, callback, failCallback) {
  request(UPDATE_DEPARTMENT_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function deleteDepartmentsApi(id, callback, failCallback) {
  request(DELETE_DEPARTMENT_ROUTE.replace('{id}', id), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}
