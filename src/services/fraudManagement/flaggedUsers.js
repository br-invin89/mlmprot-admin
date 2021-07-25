import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const FLAGGED_USERS_ROUTE = 'fraud/flagged_user/report';
const ACCEPT_FLAGGED_USER_ROUTE = 'fraud/flagged_user/{id}/accept';
const REJECT_FLAGGED_USER_ROUTE = 'fraud/flagged_user/{id}/reject';

export function getFlaggedUsersApi(params, callback, failCallback) {
  return request(FLAGGED_USERS_ROUTE, {
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

export function acceptFlaggedUserApi(id, callback, failCallback) {
  return request(ACCEPT_FLAGGED_USER_ROUTE.replace('{id}', id), {
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

export function rejectFlaggedUserApi(id, callback, failCallback) {
  return request(REJECT_FLAGGED_USER_ROUTE.replace('{id}', id), {
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
