import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const CURRENCY_SETTINGS_ROUTE = 'currencies';
const SELECT_CURRENCY_ROUTE = 'currencies/{id}/select';
const UPDATE_CURRENCY_SETTINGS_ROUTE = 'currencies/{id}';

export function getCurrencySettinsApi(callback, failCallback) {
  return request(CURRENCY_SETTINGS_ROUTE, {
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

export function selectCurrentCurrencyApi(id, callback, failCallback) {
  return request(SELECT_CURRENCY_ROUTE.replace('{id}', id), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function updateCurrencyApi(id, body, callback, failCallback) {
  return request(UPDATE_CURRENCY_SETTINGS_ROUTE.replace('{id}', id), {
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
