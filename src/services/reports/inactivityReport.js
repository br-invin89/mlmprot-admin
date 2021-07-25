import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_INACTIVITY_ROUTE = 'report/inactivity';
const EXPORT_INACTIVITY_ROUTE = 'report/inactivity/export_csv';

export function getInactivityReportApi(params, callback, failCallback) {
  return request(GET_INACTIVITY_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data, data.stats);
    } else {
      failCallback();
    }
  });
}

export function exportInactivityReportApi(params, callback, failCallback) {
  return request(EXPORT_INACTIVITY_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data.file_path);
    } else {
      failCallback();
    }
  });
}
