import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const US_STATE_REVENUE = 'report/us_revenue/state_revenue';
const US_TOP_STATE_REVENUE = 'report/us_revenue/best_states';
const US_BOTTOM_STATE_REVENUE = 'report/us_revenue/worst_states';
const US_REVENUE_CHART = 'report/us_revenue/state_revenue_chart';

export function getUsStateRevenueApi(params, callback, failCallback) {
  return request(US_STATE_REVENUE, {
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

export function getUsTopStateApi(params, callback, failCallback) {
  return request(US_TOP_STATE_REVENUE, {
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

export function getUsBottomStateApi(params, callback, failCallback) {
  return request(US_BOTTOM_STATE_REVENUE, {
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

export function getUsRevenueChartApi(params, callback, failCallback) {
  return request(US_REVENUE_CHART, {
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