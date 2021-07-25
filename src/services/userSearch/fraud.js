import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_ORDER_RISKS_ROUTE = 'users/{id}/frauds/order';
const GET_ORDER_RISK_CHART_ROUTE = 'users/{id}/frauds/order_chart';

// -----------  No exist in API  ------------------------------------
// const GET_LOGIN_RISKS_ROUTE = 'users/{id}/frauds/login';
// const GET_LOGIN_RISK_CHART_ROUTE = 'users/{id}/frauds/login_chart';

export function getOrderRisksApi(userId, params, callback, failCallback) {
  request(GET_ORDER_RISKS_ROUTE.replace('{id}', userId), {
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

export function getOrderRiskChartApi(userId, params, callback) {
  request(GET_ORDER_RISK_CHART_ROUTE.replace('{id}', userId), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

// ---------- No exist in Api ------------------------------------------
// export function getLoginRisksApi(userId, params, callback, failCallback) {
// 	request(GET_LOGIN_RISKS_ROUTE.replace('{id}', userId), {
// 	  method: 'GET',
// 	  headers: { Authorization: `Bearer ${getToken()}` },
// 	  params,
// 	}).then(({ data, response }) => {
// 	  if (response) {
// 		callback(data.data);
// 	  } else {
// 		failCallback();
// 	  }
// 	});
// }

// export function getLoginRiskChartApi(userId, params, callback) {
// 	request(GET_LOGIN_RISK_CHART_ROUTE.replace('{id}', userId), {
// 	  method: 'GET',
// 	  headers: { Authorization: `Bearer ${getToken()}` },
// 	  params,
// 	}).then(({ data, response }) => {
// 	  if (response) {
// 		callback(data.data);
// 	  }
// 	});
// }
