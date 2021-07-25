import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const FRAUD_SETTINGS_ROUTE = 'fraud/setting';
const FRAUD_SETTINGS_ID_ROUTE = 'fraud/setting/{id}';

export function getFraudSettingsApi(callback, failCallback) {
  return request(FRAUD_SETTINGS_ROUTE, {
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

export function createFraudSettingsApi(body, callback, failCallback) {
  return request(FRAUD_SETTINGS_ROUTE, {
    method: 'POST',
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

export function updateFraudSettingsApi(id, body, callback, failCallback) {
  return request(FRAUD_SETTINGS_ID_ROUTE.replace('{id}', id), {
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

export function deleteFraudSettingsApi(id, callback, failCallback) {
  return request(FRAUD_SETTINGS_ID_ROUTE.replace('{id}', id), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}
