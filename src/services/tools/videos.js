import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const CREATE_VIDEO_ROUTE = 'videos';
const GET_VIDEOS_ROUTE = 'videos';
const UPDATE_VIDEO_ROUTE = 'videos/{videoId}';
const DELETE_VIDEO_ROUTE = 'videos/{videoId}';
const CHANGE_VIDEO_STATUS_ROUTE = 'videos/{videoId}/change_status';
const CREATE_VIDEOS_TYPE_ROUTE = 'videos/types/create';
const GET_VIDEOS_TYPE_ROUTE = 'videos/types';
const UPDATE_VIDEOS_TYPE_ROUTE = 'vidoes/types/{videoId}';
const DELETE_VIDEOS_TYPE_ROUTE = 'vidoes/types/{videoId}';

export function createVideosApi(params, callback, failCallback) {
  request(CREATE_VIDEO_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
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

export function getVideosApi(params, callback, failCallback) {
  request(GET_VIDEOS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
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

export function updateVideosApi(videoId, params, callback, failCallback) {
  request(UPDATE_VIDEO_ROUTE.replace('{videoId}', videoId), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
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

export function deleteVideosApi(videoId, callback, failCallback) {
  request(DELETE_VIDEO_ROUTE.replace('{videoId}', videoId), {
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

export function changeVideoStatusApi(videoId, status, callback, failCallback) {
  request(CHANGE_VIDEO_STATUS_ROUTE.replace('{videoId}', videoId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: status,
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

export function createVideosTypeApi(params, callback, failCallback) {
  request(CREATE_VIDEOS_TYPE_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
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

export function getVideosTypeApi(params, callback, failCallback) {
  request(GET_VIDEOS_TYPE_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
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

export function updateVideosTypeApi(videoId, params, callback, failCallback) {
  request(UPDATE_VIDEOS_TYPE_ROUTE.replace('{videoId}', videoId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
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

export function deleteVideosTypeApi(videoId, callback, failCallback) {
  request(DELETE_VIDEOS_TYPE_ROUTE.replace('{videoId}', videoId), {
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
