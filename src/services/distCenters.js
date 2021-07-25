import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const DIST_CENTERS_ROUTE = 'dist_centers';
const DIST_CENTERS_STATUS_ROUTE = 'dist_centers/{id}/change_status';
const UPDATE_DIST_CENTERS_ROUTE = 'dist_centers/{id}/detail';
const BATCHES_ROUTE = 'dist_centers/batch_orders/{id}';
const CONFIRM_ORDER_LIST_ROUTE = 'dist_centers/batch_orders/{id}/confirmed_orders';
const CONFIRM_NEW_ORDER_LIST_ROUTE = 'dist_centers/batch_orders/{id}/new_orders';
const UPLOAD_SHIPPMENT_LIST_ROUTE = 'dist_centers/upload_shipments/{id}';
const UPLOAD_SHIPPMENT_ROUTE = 'dist_centers/upload_shipments';
const UPLOAD_SHIPPMENT_FILTE_ROUTE = 'dist_centers/upload_shipments/files/{id}';

export function getDistCentersApi(params, callback, failCallback) {
  return request(DIST_CENTERS_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function geCurrenttDistCentersApi(id, callback, failCallback) {
  return request(UPDATE_DIST_CENTERS_ROUTE.replace('{id}', id), {
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

export function createDistCentersApi(body, callback, failCallback) {
  return request(DIST_CENTERS_ROUTE, {
    method: 'POST',
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

export function updateDistCentersApi(id, body, callback, failCallback) {
  return request(UPDATE_DIST_CENTERS_ROUTE.replace('{id}', id), {
    method: 'POST',
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

export function changeDistCenterStatusApi(id, query, callback, failCallback) {
  return request(DIST_CENTERS_STATUS_ROUTE.replace('{id}', id), {
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

export function getBatchesApi(id, params, callback, failCallback) {
  return request(BATCHES_ROUTE.replace('{id}', id), {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  })
}

export function getConfirmOrderpi(id, callback, failCallback) {
  return request(CONFIRM_ORDER_LIST_ROUTE.replace('{id}', id), {
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

export function getConfirmNewOrderApi(id, callback, failCallback) {
  return request(CONFIRM_NEW_ORDER_LIST_ROUTE.replace('{id}', id), {
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

export function getUploadShippmentsApi(id, params, callback, failCallback) {
  return request(UPLOAD_SHIPPMENT_LIST_ROUTE.replace('{id}', id), {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  })
}

export function uploadShippmentsApi(id, body, callback, failCallback) {
  return request(UPLOAD_SHIPPMENT_ROUTE, {
    method: 'GET',
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

export function getUploadedFilepi(id, callback, failCallback) {
  return request(UPLOAD_SHIPPMENT_FILTE_ROUTE.replace('{id}', id), {
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
