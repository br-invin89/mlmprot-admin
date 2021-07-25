import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_USER_MINUS_BONUS_HISTORY_ROUTE = 'users/{id}/minus_bonus_histories';

export function getMinusBonusHistoriesApi(userId, params, callback, failCallback) {
  request(GET_USER_MINUS_BONUS_HISTORY_ROUTE.replace('{id}', userId), {
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
