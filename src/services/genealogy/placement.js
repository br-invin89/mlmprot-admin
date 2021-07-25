import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_PLACEMENT_GENEALOGY_ROUTE = 'genealogy/placement';
const GET_PAST_PLACEMENT_GENEALOGY_ROUTE = 'genealogy/placement/past';
const UPDATE_PLACEMENT_GENEALOGY_ROUTE = 'genealogy/placement/update';

export function getPlacementGenealogyApi(callback, failCallback) {
  return request(GET_PLACEMENT_GENEALOGY_ROUTE, {
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

export function getPastPlacementGenealogyApi(params, callback, failCallback) {
  return request(GET_PAST_PLACEMENT_GENEALOGY_ROUTE, {
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

export function updatePlacementGenealogyApi(requestData, callback, failCallback) {
  return request(UPDATE_PLACEMENT_GENEALOGY_ROUTE, {
    method: 'POST',
    data: requestData,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}
