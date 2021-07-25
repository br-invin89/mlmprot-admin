import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_PERSONAL_ENROLLEES_ROUTE = 'users/{id}/personal_enrollees';

export function getPersonalEnrolleesApi(userId, params, callback, failCallback) {
  request(GET_PERSONAL_ENROLLEES_ROUTE.replace('{id}', userId), {
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
