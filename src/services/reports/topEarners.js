import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const TOP_EARNERS_ROUTE = 'report/top_earner/top_earner_report';

export function getTopEarnersApi(params, callback, failCallback) {
  return request(TOP_EARNERS_ROUTE, {
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
