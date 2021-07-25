import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const PAYOUT_COMMISSION_ROUTE = 'pay_commission/report';
const PAY_PAYOUT_COMMISSION_ROUTE = 'pay_commission/{id}/pay/{provider_name}';
const PAYOUT_COMMISSION_EXPORT_CSV_ROUTE = 'pay_commission/{id}/export_csv/{provider_name}';

export function getPayoutCommissionApi(params, callback, failCallback) {
  return request(PAYOUT_COMMISSION_ROUTE, {
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

export function payPayoutCommissionApi(id, providerName, callback, failCallback) {
  return request(
    PAY_PAYOUT_COMMISSION_ROUTE.replace('{id}', id).replace('{provider_name}', providerName),
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  ).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function payoutCommissionExportApi(id, providerName, callback, failCallback) {
  return request(
    PAYOUT_COMMISSION_EXPORT_CSV_ROUTE.replace('{id}', id).replace('{provider_name}', providerName),
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  ).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
