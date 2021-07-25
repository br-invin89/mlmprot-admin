import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_ENROLLER_GENEALOGY_ROUTE = 'genealogy/enroller';
const GET_PAST_ENROLLER_GENEALOGY_ROUTE = 'genealogy/enroller/past';
const UPDATE_ENROLLER_GENEALOGY_ROUTE = 'genealogy/enroller/update';

export function getEnrollerGenealogyApi(callback, failCallback) {
  return request(GET_ENROLLER_GENEALOGY_ROUTE, {
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

export function getPastEnrollerGenealogyApi(params, callback, failCallback) {
  return request(GET_PAST_ENROLLER_GENEALOGY_ROUTE, {
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

export function updateEnrollerGenealogyApi(requestData, callback, failCallback) {
  return request(UPDATE_ENROLLER_GENEALOGY_ROUTE, {
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
