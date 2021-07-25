import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_VERIFICATIONS_ROUTE = 'users/{id}/verifications';
const ACCEPT_VERIFICATION_ROUTE = 'users/{id}/verifications/accept/{verificationId}';
const REJECT_VERIFICATION_ROUTE = 'users/{id}/verifications/reject/{verificationId}';
const REQUEST_VERIFICATION_ROUTE = 'users/{id}/request_verification';

export function getVerificationsApi(userId, params, callback, failCallback) {
  request(GET_VERIFICATIONS_ROUTE.replace('{id}', userId), {
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

export function acceptUserVerificationApi(userId, verificationId, callback, failCallback) {
  request(
    ACCEPT_VERIFICATION_ROUTE.replace('{id}', userId).replace('{verificationId}', verificationId),
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  ).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function rejectUserVerificationApi(userId, verificationId, callback, failCallback) {
  request(
    REJECT_VERIFICATION_ROUTE.replace('{id}', userId).replace('{verificationId}', verificationId),
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  ).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function requestVerificationApi(userId, requestData, callback, failCallback) {
  request(REQUEST_VERIFICATION_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
