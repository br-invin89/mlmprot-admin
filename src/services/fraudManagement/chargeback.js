import request from '@/utils/request';
import { getToken } from '@/utils/localStorage'

const CHARGEBACK_STATS_ROUTE = 'fraud/chargeback/chargeback_stats';
const CHARGEBACK_REPORT_ROUTE = 'fraud/chargeback/report'
const CHARGEBACK_REPORT_EXPORT_ROUTE = 'fraud/chargeback/export_csv'

export function getChargerbackStatsApi(callback, failCallback) {
  return request(CHARGEBACK_STATS_ROUTE, {
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

export function getChargerbackReportApi(params, callback, failCallback) {
  return request(CHARGEBACK_REPORT_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    params
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function getChargerbackExportApi(params, callback, failCallback) {
  return request(CHARGEBACK_REPORT_EXPORT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
