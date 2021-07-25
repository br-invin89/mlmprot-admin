import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_AUTOSHIP_REPORT_ROUTE = 'report/autoship/list';
const GET_AUTOSHIP_REPORT_BY_DATE_ROUTE = 'report/autoship/by_date/{date}';

export function getAutoshipReportApi(params, callback, failCallback) {
  return request(GET_AUTOSHIP_REPORT_ROUTE, {
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

export function getAutoshipReportByDateApi(date, params, callback, failCallback) {
  return request(GET_AUTOSHIP_REPORT_BY_DATE_ROUTE.replace('{date}', date), {
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
