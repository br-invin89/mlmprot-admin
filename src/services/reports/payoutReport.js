import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const PAYOUT_REPORT_STATS = 'report/payout/payout_stats';
const PAYOUT_REPORT_COUNTRY = 'report/payout/country_revenue';
const PAYOUT_REPORT_PROVIDER = 'report/payout/provider_stats';
const PAYOUT_TOP_EARNER = 'report/payout/top_earners';
const PAYOUT_REPORT_CYCLE = 'report/payout/payout_report';
const PAYOUT_CYCLE_EXPORT = 'report/payout/{id}/export_csv/{provider_name}';
const PAYOUT_REPORT_COUNTRY_CHART = 'report/payout/country_revenue_chart';

export function getHeaderPayoutStatsApi(callback, failCallback) {
  return request(PAYOUT_REPORT_STATS, {
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

export function getPayoutCountryApi(params, callback, failCallback) {
  return request(PAYOUT_REPORT_COUNTRY, {
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

export function getPayoutCountryChartApi(params, callback, failCallback) {
  return request(PAYOUT_REPORT_COUNTRY_CHART, {
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

export function getPayoutProvidersApi(params, callback, failCallback) {
  return request(PAYOUT_REPORT_PROVIDER, {
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

export function getPayoutTopEarnerApi(params, callback, failCallback) {
  return request(PAYOUT_TOP_EARNER, {
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

export function getPayoutCycleApi(params, callback, failCallback) {
  return request(PAYOUT_REPORT_CYCLE, {
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

export function getPayoutCycleExportApi(id, providerName, callback, failCallback) {
  return request(PAYOUT_CYCLE_EXPORT.replace('{id}', id).replace('{provider_name}', providerName), {
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
