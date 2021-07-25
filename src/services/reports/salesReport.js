import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const SALES_REPORT_STATS = 'report/sales/sales_stats';
const DAILY_SALES_REPORT = 'report/sales/daily_report';
const DAILY_SALES_EXPORT = 'report/sales/export_csv';
const MONTYLY_SALES_REPORT = 'report/sales/this_month_sales';
const WEEKLY_SALES_REPORT = 'report/sales/this_month_sales_chart';
const TODAY_SALES_REPORT = 'report/sales/today_sales';
const SALES_REPORT_DISTRIBUTION = 'report/sales/user_type_chart';

export function getHeaderSalesStatsApi(callback, failCallback) {
  return request(SALES_REPORT_STATS, {
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

export function getDailySalesApi(params, callback, failCallback) {
  return request(DAILY_SALES_REPORT, {
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

export function getDailySalesExportApi(callback, failCallback) {
  return request(DAILY_SALES_EXPORT, {
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

export function getMonthlySalesApi(callback, failCallback) {
  return request(MONTYLY_SALES_REPORT, {
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

export function getWeeklySalesApi(callback, failCallback) {
  return request(WEEKLY_SALES_REPORT, {
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
export function getTodaySalesApi(callback, failCallback) {
  return request(TODAY_SALES_REPORT, {
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

export function getUserSalesDistributionApi(callback, failCallback) {
  return request(SALES_REPORT_DISTRIBUTION, {
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
