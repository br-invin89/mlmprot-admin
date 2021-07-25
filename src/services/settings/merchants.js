import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_MERCHANTS_ROUTE = 'merchants';

export function getMerchantsApi(callback) {
  return request(GET_MERCHANTS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    }
  });
}

// const GET_MERCHANTS_ROUTE = 'merchants';
// const CHANGE_MERCHANT_STATUS_ROUTE = 'merchants/{merchant_id}/change_status';

// export function getMerchantsApi(callback, failCallback) {
//   return request(`${GET_MERCHANTS_ROUTE}`, {
//     method: 'GET',
//   }).then(({ data, response }) => {
//     if (response) {
//       callback(data.data);
//     } else {
//       failCallback();
//     }
//   });
// }

// export function changeMerchantStatusApi(merchantId, formData, callback, failCallback) {
//   return request(`${CHANGE_MERCHANT_STATUS_ROUTE.replace('{merchant_id}', merchantId)}`, {
//     method: 'POST',
//     data: formData,
//   }).then(({ data, response }) => {
//     if (response) {
//       callback(data.message);
//     } else {
//       failCallback();
//     }
//   });
// }
