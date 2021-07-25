import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_NEWS_ROUTE = 'news';
const CREATE_NEWS_ROUTE = 'news';
const DELETE_NEWS_ROUTE = 'news/{newsId}';
const UPDATE_NEWS_ROUTE = 'news/{newsId}';
const CHANGE_NEWS_STATUS_ROUTE = 'news/{newsId}/change_status';

export function createNewsApi(params, callback, failCallback) {
  request(CREATE_NEWS_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: params,
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

export function deleteNewsApi(newsId, callback, failCallback) {
  request(DELETE_NEWS_ROUTE.replace('{newsId}', newsId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}`},
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

export function getNewsApi(params, callback, failCallback) {
  request(GET_NEWS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}`},
    params,
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

export function updateNewsApi(newsId, params, callback, failCallback) {
  request(UPDATE_NEWS_ROUTE.replace('{newsId}', newsId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: params,
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

export function changeNewsStatusApi(newsId, params, callback, failCallback) {
  request(CHANGE_NEWS_STATUS_ROUTE.replace('{newsId}', newsId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: params,
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