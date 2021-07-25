import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_USER_DETAIL_ROUTE = 'users/{id}';
const GET_USER_EARNING_HISTORY_ROUTE = 'users/{id}/earning_histories';
const GET_USER_BONUS_DETAIL_ROUTE = 'users/{id}/bonus_details';
const GET_USER_RANK_HISTORY_ROUTE = 'users/{id}/rank_histories';
const UPDATE_USER_COMMENT_ROUTE = 'users/{id}/comment';

export function getUserDetailApi(userId, callback, failCallback) {
  request(GET_USER_DETAIL_ROUTE.replace('{id}', userId), {
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

export function getUserEarningHistoriesApi(userId, params, callback, failCallback) {
  request(GET_USER_EARNING_HISTORY_ROUTE.replace('{id}', userId), {
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

export function getUserBonusDetailsApi(userId, params, callback, failCallback) {
  request(GET_USER_BONUS_DETAIL_ROUTE.replace('{id}', userId), {
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

export function getUserRankHistoriesApi(userId, params, callback, failCallback) {
  request(GET_USER_RANK_HISTORY_ROUTE.replace('{id}', userId), {
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

export function updateUserCommentApi(userId, requestData, callback, failCallback) {
  request(UPDATE_USER_COMMENT_ROUTE.replace('{id}', userId), {
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
