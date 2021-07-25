import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_ORDER_HISTORES_ROUTE = 'users/{id}/orders';
const GET_ORDER_DETAIL_ROUTE = 'users/{id}/orders/{orderId}';
const RESHIP_ORDER_ROUTE = 'users/{id}/orders/{orderId}/reship';
const REFUND_ORDER_ROUTE = 'users/{id}/orders/{orderId}/refund';
const CANCEL_ORDER_ROUTE = 'users/{id}/orders/{orderId}/cancel';
const CHARGEBACK_ORDER_ROUTE = 'users/{id}/orders/{orderId}/chargeback';
const FLAG_ORDER_ROUTE = 'users/{id}/orders/{orderId}/flag';
const UNFLAG_ORDER_ROUTE = 'users/{id}/orders/{orderId}/unflag';

export function getOrderHistoriesApi(userId, params, callback, failCallback) {
  request(GET_ORDER_HISTORES_ROUTE.replace('{id}', userId), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function getOrderDetailApi(userId, orderId, callback, failCallback) {
  request(GET_ORDER_DETAIL_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
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

export function reshipOrderApi(userId, orderId, callback, failCallback) {
  request(RESHIP_ORDER_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
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

export function refundOrderApi(userId, orderId, body, callback, failCallback) {
  request(REFUND_ORDER_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: body,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function cancelOrderApi(userId, orderId, callback, failCallback) {
  request(CANCEL_ORDER_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
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

export function chargebackOrderApi(userId, orderId, callback, failCallback) {
  request(CHARGEBACK_ORDER_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
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

export function flagOrderApi(userId, orderId, callback, failCallback) {
  request(FLAG_ORDER_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
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

export function unflagOrderApi(userId, orderId, callback, failCallback) {
  request(UNFLAG_ORDER_ROUTE.replace('{id}', userId).replace('{orderId}', orderId), {
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
