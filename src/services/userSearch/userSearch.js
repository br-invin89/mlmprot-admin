import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const SEARCH_USERS_ROUTE = 'users/search';

export function searchUsersApi(requestData, callback, failCallback) {
  request(SEARCH_USERS_ROUTE, {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
