import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_ACTION_HISTORIES_ROUTE = 'users/{id}/action_histories';

export function getActionHistoriesApi(userId, params, callback, failCallback) {
  request(GET_ACTION_HISTORIES_ROUTE.replace('{id}', userId), {
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
