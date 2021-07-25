import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const SEARCH_ORDERS_ROUTE = 'orders/search';
const GET_ORDER_DETAIL_ROUTE = 'orders/{orderId}';

export function searchOrdersApi(requestData, params, callback, failCallback) {
  request(SEARCH_ORDERS_ROUTE, {
    method: 'POST',
    data: requestData,
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

export function getOrderDetailApi(orderId, callback, failCallback) {
  request(GET_ORDER_DETAIL_ROUTE.replace('{orderId}', orderId), {
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