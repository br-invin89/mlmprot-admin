import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const PAYMENT_SETTINGS_ROUTE = 'merchants';
const CHANGE_PAYMENT_STATUS_ROUTE = 'merchants/{id}/change_status';
const CHANGE_PAYMENT_COUNTRIES_ROUTE = 'merchants/{id}/change_countries';
const CHANGE_PAYMENT_CONFIG_ROUTE = 'merchants/{id}/change_config';
const UPDATE_PAYMENT_SETTINGS_ROUTE = 'merchants/{id}';

export function getPaymentSettingsApi(callback, failCallback) {
  return request(PAYMENT_SETTINGS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function changePaymentStatusApi(id, query, callback, failCallback) {
  return request(CHANGE_PAYMENT_STATUS_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: query,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function changePaymentCountriesApi(id, query, callback, failCallback) {
  return request(CHANGE_PAYMENT_COUNTRIES_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: query,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function changePaymentConfigApi(id, query, callback, failCallback) {
  return request(CHANGE_PAYMENT_CONFIG_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: query,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function updatePaymentSettingsApi(id, body, callback, failCallback) {
  return request(UPDATE_PAYMENT_SETTINGS_ROUTE.replace('{id}', id), {
    method: 'PUT',
    data: body,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}
