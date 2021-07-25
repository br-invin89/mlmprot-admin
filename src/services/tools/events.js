import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const CREATE_EVENT_ROUTE = 'events';
const GET_EVENTS_ROUTE = 'events';
const UPDATE_EVENT_ROUTE = 'events/{eventId}';
const DELETE_EVENT_ROUTE = 'events/{eventId}';
const CHANGE_EVENT_STATUS_ROUTE = 'events/{eventId}/change_status';

export function createEventsApi(params, callback, failCallback) {
  request(CREATE_EVENT_ROUTE, {
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

export function getEventsApi(params, callback, failCallback) {
  request(GET_EVENTS_ROUTE, {
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

export function updateEventsApi(eventId, params, callback, failCallback) {
  request(UPDATE_EVENT_ROUTE.replace('{eventId}', eventId), {
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

export function deleteEventsApi(eventId, callback, failCallback) {
	request(DELETE_EVENT_ROUTE.replace('{eventId}', eventId), {
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
  
export function changeEventStatusApi(eventId, status, callback, failCallback) {
  request(CHANGE_EVENT_STATUS_ROUTE.replace('{eventId}', eventId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: status,
  })
		.then(({ data, response }) => {
			if (response) {
				callback(data)
			} else {
				failCallback()
			}
		}).catch(failCallback)
}