import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_RPODUCT_AVAILABILITIES_ROUTE = 'products/availabilities/{kind}';
const ADD_PPRODUCTS_AVAILABILITY_ROUTE = 'products/availabilities/{kind}';
const DELETE_PPRODUCTS_AVAILABILITY_ROUTE = 'products/availabilities/{kind}/{id}';

export function getProductAvailabilitiesApi(kind, params, callback, failCallback) {
  return request(GET_RPODUCT_AVAILABILITIES_ROUTE.replace('{kind}', kind), {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data.data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function addProductsAvailabilityApi(kind, body, callback, failCallback) {
  return request(ADD_PPRODUCTS_AVAILABILITY_ROUTE.replace('{kind}', kind), {
    method: 'POST',
    data: body,
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function deleteProductsAvailabilityApi(kind, id, callback, failCallback) {
  return request(DELETE_PPRODUCTS_AVAILABILITY_ROUTE.replace('{kind}', kind).replace('{id}', id), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}
