import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const FRAUD_REPORT_ROUTE = 'fraud/fraud_report/report';
const RESET_RISK_SCORE_ROUTE = 'fraud/fraud_report/{id}/reset_risk';

export function getFraudReportApi(params, callback, failCallback) {
  return request(FRAUD_REPORT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function resetRiskScoreApi(id, callback, failCallback) {
  return request(RESET_RISK_SCORE_ROUTE.replace('{id}', id), {
    method: 'POST',
    data: null,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}