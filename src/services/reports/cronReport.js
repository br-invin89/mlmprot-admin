import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_CRON_REPORT_ROUTE = 'report/cron';
const GET_CRON_REPORT_DETAIL_ROUTE = 'report/cron/{report_id}';

export function getCronReportApi(params, callback, failCallback) {
  return request(GET_CRON_REPORT_ROUTE, {
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

export function getCronReportDetailApi(reportId, callback, failCallback) {
  return request(GET_CRON_REPORT_DETAIL_ROUTE.replace('{report_id}', reportId), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
