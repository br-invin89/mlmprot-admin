import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const PAYOUT_PROVIDERS_ROUTE = 'payout_providers';
const CHANGE_PAYOUT_STATUS_ROUTE = 'payout_providers/{id}/change_status';
const UPDATE_PAYOUT_PROVIDERS_ROUTE = 'payout_providers/{id}';

export function getPayoutProvidersApi(callback, failCallback) {
  return request(PAYOUT_PROVIDERS_ROUTE, {
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

export function changePayoutStatusApi(id, query, callback, failCallback) {
    return request(CHANGE_PAYOUT_STATUS_ROUTE.replace('{id}', id), {
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
  
export function updatePayoutProviderApi(id, body, callback, failCallback) {
  return request(UPDATE_PAYOUT_PROVIDERS_ROUTE.replace('{id}', id), {
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
