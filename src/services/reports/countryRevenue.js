import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const DAILY_COUNTRY_REVENUE = 'report/country_revenue/country_revenue';
const DAILY_COUNTRY_REVENUE_CHART = 'report/country_revenue/country_revenue_chart'

export function getDailyCountryRevenueApi(params, callback, failCallback) {
  return request(DAILY_COUNTRY_REVENUE, {
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

export function getDailyCountryRevenueChartApi(params, callback, failCallback) {
  return request(DAILY_COUNTRY_REVENUE_CHART, {
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