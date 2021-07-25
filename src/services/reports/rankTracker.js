import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_RANK_TRACKER_ROUTE = 'report/rank_tracker';
const GET_RANK_TRACKER_CHART_ROUTE = 'report/rank_tracker/chart';

export function getRankTrackerChartApi(params, callback, failCallback) {
  return request(GET_RANK_TRACKER_CHART_ROUTE, {
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

export function getRankTrackerApi(params, callback, failCallback) {
  return request(GET_RANK_TRACKER_ROUTE, {
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
