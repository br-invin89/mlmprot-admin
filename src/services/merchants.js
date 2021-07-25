import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const MERCHANT_DAILY_SUMMARY_ROUTE = 'merchant/report';
const MERCHANT_DAILY_SUMMARY_EXPORT_ROUTE = 'merchant/export_csv';

export function getMerchantDailySummaryApi(params, callback, failCallback) {
  return request(MERCHANT_DAILY_SUMMARY_ROUTE, {
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

export function exportMerchantDailySummaryApi(params, callback, failCallback) {
  return request(MERCHANT_DAILY_SUMMARY_EXPORT_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data.csv_file);
    } else {
      failCallback();
    }
  });
}
