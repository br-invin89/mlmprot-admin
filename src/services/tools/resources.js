import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const CREATE_RESOURCE_ROUTE = 'resources';
const GET_RESOURCES_ROUTE = 'resources';
const UPDATE_RESOURCE_ROUTE = 'resources/{resourceId}';
const DELETE_RESOURCE_ROUTE = 'resources/{resourceId}';

export function createResourcesApi(params, callback, failCallback) {
  
  request(CREATE_RESOURCE_ROUTE, {
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

export function getResourcesApi(params, callback, failCallback) {
  request(GET_RESOURCES_ROUTE, {
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

export function updateResourcesApi(resourceId, params, callback, failCallback) {
  request(UPDATE_RESOURCE_ROUTE.replace('{resourceId}', resourceId), {
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

export function deleteResourcesApi(resourceId, callback, failCallback) {
  request(DELETE_RESOURCE_ROUTE.replace('{resourceId}', resourceId), {
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
