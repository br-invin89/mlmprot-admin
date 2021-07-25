import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_MONTHLY_VOLUME_ROUTE = 'report/monthly_volume';
const EXPORT_MONTHLY_VOLUME_ROUTE = 'report/monthly_volume/export_csv';

export function getMonthlyVolumeReportApi(params, callback, failCallback) {
  return request(GET_MONTHLY_VOLUME_ROUTE, {
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

export function exportMonthlyVolumeReportApi(params, callback, failCallback) {
  return request(EXPORT_MONTHLY_VOLUME_ROUTE, {
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
