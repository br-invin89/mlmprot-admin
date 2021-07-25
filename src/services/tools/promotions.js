import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_PROMOTIONS_ROUTE = 'promotions';
const GET_PROMOTION_ROUTE = 'promotions/{promotionId}';
const CREATE_PROMOTION_ROUTE = 'promotions';
const DELETE_PROMOTION_ROUTE = 'promotions/{promotionId}';
const UPDATE_PROMOTION_ROUTE = 'promotions/{promotionId}';
const CHANGE_PROMOTION_STATUS_ROUTE = 'promotions/{promotionId}/change_status';

export function createPromotionsApi(params, callback, failCallback) {
  request(CREATE_PROMOTION_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: params,
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function deletePromotionsApi(promotionId, callback, failCallback) {
  request(DELETE_PROMOTION_ROUTE.replace('{promotionId}', promotionId), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}`},
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function getPromotionsApi(params, callback, failCallback) {
  request(GET_PROMOTIONS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}`},
    params,
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function getPromotiondDetailsApi(promotionId, callback, failCallback) {
  request(GET_PROMOTION_ROUTE.replace('{promotionId}', promotionId), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}`},
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function updatePromotionsApi(promotionId, params, callback, failCallback) {
  request(UPDATE_PROMOTION_ROUTE.replace('{promotionId}', promotionId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: params,
  })
    .then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch(failCallback);
}

export function changePromotionStatusApi(promotionId, status, callback, failCallback) {
  request(CHANGE_PROMOTION_STATUS_ROUTE.replace('{promotionId}', promotionId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}`},
    data: status,
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}