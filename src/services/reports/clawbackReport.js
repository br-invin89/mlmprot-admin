import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_CLAWBACK_USERS_REPORT_ROUTE = 'report/clawback_users/list';

export function getClawbackReportApi(params, callback, failCallback) {
  return request(GET_CLAWBACK_USERS_REPORT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data.data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}
