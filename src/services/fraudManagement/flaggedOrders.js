import request from '@/utils/request';
import { getToken } from '@/utils/localStorage'

const FLAGGED_ORDERS_ROUTE = 'fraud/flagged_order/report';
const MARK_AS_OK_ROUTE = 'fraud/flagged_order/{id}/mark_as_ok';

export function getFlaggedOrdersApi(params, callback, failCallback) {
  return request(FLAGGED_ORDERS_ROUTE, {
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

export function markasOKApi(id, callback, failCallback) {
    return request(MARK_AS_OK_ROUTE.replace('{id}', id), {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    });
  }