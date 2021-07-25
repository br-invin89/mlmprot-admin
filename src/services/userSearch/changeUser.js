import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const UPDATE_USER_ROUTE = 'users/{id}';
const UPDATE_USER_SHIPPING_DETAIL_ROUTE = 'users/{id}/shipping_detail';
const UPDATE_USER_TAX_FORM_ROUTE = 'users/{id}/tax_form';

export function updateUserApi(userId, requestData, callback, failCallback) {
  request(UPDATE_USER_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.message);
    } else {
      failCallback();
    }
  });
}

export function updateUserShippingDetailApi(userId, requestData, callback, failCallback) {
  request(UPDATE_USER_SHIPPING_DETAIL_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.message);
    } else {
      failCallback();
    }
  });
}

export function updateUserTaxFormApi(userId, requestData, callback, failCallback) {
  request(UPDATE_USER_TAX_FORM_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.message);
    } else {
      failCallback();
    }
  });
}
