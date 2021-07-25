import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const INVENTORIES_ROUTE = 'inventories';
const INVENTORIES_EXPORT_ROUTE = 'inventories/export';
const INVENTORIES_DAILY_UNIT_ROUTE = 'inventories/daily_units';
const INVENTORIES_DAILY_UNIT_EXPORT_ROUTE = 'inventories/daily_units/export';
const INVENTORIES_STATS_ROUTE = 'inventories/stats';
const INVENTORIES_LOG_ROUTE = 'inventories/inventory_logs';
const INVENTORIES_LOG_EXPORT_ROUTE = 'inventories/inventory_logs/export';

export function createInventoriesApi(params, callback, failCallback) {
  return request(INVENTORIES_ROUTE, {
    method: 'POST',
    data: params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function getInventoriesApi(params, callback, failCallback) {
  return request(INVENTORIES_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  })
}

export function getInventoriesExportApi(params, callback, failCallback) {
  return request(INVENTORIES_EXPORT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  })
}

export function getInventoriesDailyUnitsApi(params, callback, failCallback) {
  return request(`${INVENTORIES_DAILY_UNIT_ROUTE}`, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  })
}

export function exportInventoriesDailyApi(params, callback, failCallback) {
  return request(INVENTORIES_DAILY_UNIT_EXPORT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  })
}

export function getInventoriesStatsApi(params, callback, failCallback) {
  return request(INVENTORIES_STATS_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function getInventoriesLogApi(params, callback, failCallback) {
  return request(`${INVENTORIES_LOG_ROUTE}`, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  })
}

export function exportInventoriesLogApi(params, callback, failCallback) {
  return request(INVENTORIES_LOG_EXPORT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data.csv_file);
    } else {
      failCallback();
    }
  });
}

export function exportInventoriesDailyUnitsApi(params, callback, failCallback) {
  return request(INVENTORIES_DAILY_UNIT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data.csv_file);
    } else {
      failCallback();
    }
  });
}
