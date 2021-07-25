import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const ORDER_SOURCE_REPORT_STATS_ROUTE = 'report/order_source/order_source_stats';
const ORDER_SOURCE_REPORT_ROUTE = 'report/order_source/order_source_report';

export function getOrderSourceStatsApi(callback, failCallback) {
  return request(ORDER_SOURCE_REPORT_STATS_ROUTE, {
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

export function getOrderSourceReportApi(params, callback, failCallback) {
  return request(ORDER_SOURCE_REPORT_ROUTE, {
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
