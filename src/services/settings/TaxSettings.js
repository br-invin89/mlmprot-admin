import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const TAX_SETTINGS_ROUTE = 'other_providers/1';
const CHANGE_TAX_STATUS_ROUTE = 'other_providers/{id}/change_status';
const UPDATE_TAX_SETTINGS_ROUTE = 'other_providers/{id}';

export function getTaxSettingsApi(callback, failCallback) {
  return request(TAX_SETTINGS_ROUTE, {
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

export function changeTaxStatusApi(id, query, callback, failCallback) {
    return request(CHANGE_TAX_STATUS_ROUTE.replace('{id}', id), {
      method: 'PUT',
      data: query,
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(({ data, response }) => {
      if (response) {
        callback(data)
      } else {
        failCallback()
      }
    })
  }
  
export function updateTaxSettingsApi(id, body, callback, failCallback) {
  return request(UPDATE_TAX_SETTINGS_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: body,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}
