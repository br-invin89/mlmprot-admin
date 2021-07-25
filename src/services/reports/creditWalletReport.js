import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const CREDIT_WALLET_REPORT_STATS_ROUTE = 'report/credit_wallet/credit_wallet_stats';
const CREDIT_WALLET_REPORT_ROUTE = 'report/credit_wallet/credit_wallet_report';

export function getCreditWalletStatsApi(callback, failCallback) {
  return request(CREDIT_WALLET_REPORT_STATS_ROUTE, {
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

export function getCreditWalletReportApi(params, callback, failCallback) {
  return request(CREDIT_WALLET_REPORT_ROUTE, {
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
