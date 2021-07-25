import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const LOAD_RANKS_ROUTE = 'common/ranks';
const LOAD_DIST_CENTERS_ROUTE = 'common/dist_centers';
const SEARCH_USERS_ROUTE = 'common/search_users/{q}';
const SEARCH_USERS_BY_ID_ROUTE = 'common/search_user_by_uuid/{q}';
const LOAD_PRODUCTS_ROUTE = 'common/products?page=1&per_page=100';
const LOAD_PAYOUT_PROVIDERS_ROUTE = 'common/payout_providers';

export function loadRankOptionsApi(callback) {
  return request(LOAD_RANKS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

export function loadDistCenterOptionsApi(callback) {
  return request(LOAD_DIST_CENTERS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

export function searchUsersApi(q, callback) {
  return request(SEARCH_USERS_ROUTE.replace('{q}', q), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

export function searchUsersByIdApi(q, callback) {
  return request(SEARCH_USERS_BY_ID_ROUTE.replace('{q}', q), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

export function loadProductsApi(callback) {
  return request(LOAD_PRODUCTS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

export function loadPayoutProvidersApi(callback) {
  return request(LOAD_PAYOUT_PROVIDERS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}
