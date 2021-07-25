import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_CURRENT_RANK_REPORT = 'report/rank/current';
const GET_PAST_RANK_REPORT = 'report/rank/past';

export function getPastRankReportApi(params, callback, failCallback) {
  return request(GET_PAST_RANK_REPORT, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data.data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function getCurrentRankReportApi(params, callback, failCallback) {
  return request(GET_CURRENT_RANK_REPORT, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data.data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

