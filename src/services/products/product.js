import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_PRODUCTS_ROUTE = 'products';
const CREATE_PRODUCT_ROUTE = 'products';
const GET_PRODUCT_DETAIL_ROUTE = 'products/{productId}';
const DELETE_PRODUCT_ROUTE = 'products/{productId}';
const UPDATE_PRODUCT_ROUTE = 'products/{productId}';
const CHANGE_STATUS_PRODUCT_ROUTE = 'products/{productId}/change_status';
const RESTORE_PRODUCT_ROUTE = 'products/{productId}/restore';
const GET_ALL_PRODUCTS_ROUTE = 'products';

export function getProductDetailApi(productId, callback, failCallback) {
  return request(`${GET_PRODUCT_DETAIL_ROUTE.replace('{productId}', productId)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function createProductApi(requestData, callback, failCallback) {
  return request(CREATE_PRODUCT_ROUTE, {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback(data, response)
    }
  }).catch(failCallback)
}

export function updateProductApi(productId, requestData, callback, failCallback) {
  return request(`${UPDATE_PRODUCT_ROUTE.replace('{productId}', productId)}`, {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function deleteProductApi(productId, callback, failCallback) {
  return request(DELETE_PRODUCT_ROUTE.replace('{productId}', productId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function getProductApi(params, callback, failCallback) {
  const url = new URLSearchParams(params).toString();
  return request(`${GET_PRODUCTS_ROUTE}?${url}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}
  
export function changeStatusProductApi(productId, status, callback, failCallback) {
  return request(CHANGE_STATUS_PRODUCT_ROUTE.replace('{productId}', productId), {
    method: 'PUT',
    data: status,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function restoreProductApi(productId, callback, failCallback) {
  return request(RESTORE_PRODUCT_ROUTE.replace("{productId}", productId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function getAllProductsApi(callback, failCallback) {
  return request(GET_ALL_PRODUCTS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}
