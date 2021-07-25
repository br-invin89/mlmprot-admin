import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const DASHBOARD_HEADER_STATS_ROUTE = 'dashboard/sales_stats';
const DASHBOARD_SALES_CHART_ROUTE = 'dashboard/sales_chart';
const DASHBOARD_PAYOUT_CHART_ROUTE = 'dashboard/payout_chart';
const DASHBOARD_LEADERBOARD_ROUTE = 'dashboard/leaderboard';
const DASHBOARD_ACTIVE_USERS_ROUTE = 'dashboard/active_user_count';

export function getDashboardHeaderStatsApi(callback, failCallback) {
  return request(`${DASHBOARD_HEADER_STATS_ROUTE}`, {
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

export function getDashboardSalesChartApi(params, callback, failCallback) {
  return request(`${DASHBOARD_SALES_CHART_ROUTE}`, {
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

export function getDashboardPayoutChartApi(params, callback, failCallback) {
  return request(`${DASHBOARD_PAYOUT_CHART_ROUTE}`, {
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

export function getDashboardLeaderboardApi(params, callback, failCallback) {
  return request(`${DASHBOARD_LEADERBOARD_ROUTE}`, {
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

export function getDashboardActiveUserCountApi(params, callback, failCallback) {
  return request(`${DASHBOARD_ACTIVE_USERS_ROUTE}`, {
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
