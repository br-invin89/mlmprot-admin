import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const CHANGE_USER_STATUS_ROUTE = 'users/{id}/change_status';
const CHANGE_USER_TYPE_ROUTE = 'users/{id}/change_type';
const CHANGE_PAYMENT_OPTION_ROUTE = 'users/{id}/change_payment_option';
const CHANGE_PASSWORD_ROUTE = 'users/{id}/change_password';
const ADD_MANUAL_COMMISSION_ROUTE = 'users/{id}/add_manual_commission';
const GET_CREDIT_WALLET_ROUTE = 'users/{id}/credit_wallet';
const ADD_CREDIT_WALLET_ROUTE = 'users/{id}/add_credit_wallet';
const REMOVE_CREDIT_WALLET_ROUTE = 'users/{id}/remove_credit_wallet';
const CHANGE_USER_RANK_ROUTE = 'users/{id}/change_rank';
const RESET_USER_RANK_ROUTE = 'users/{id}/reset_rank';
const CHANGE_SHOW_LEADERBOARD_ROUTE = 'users/{id}/change_show_leaderboard';
const CHANGE_SHOW_CONTACT_INFO_ROUTE = 'users/{id}/change_show_contact_info';
const REQUEST_TAX_UPLOAD_ROUTE = 'users/{id}/request_tax';
const ADD_COMMISSION_ROUTE = 'users/{id}/add_manual_commission';
const GET_PRODUCT_CREDIT_ROUTE = 'users/{id}/product_credit';
const ADD_PRODUCT_CREDIT_ROUTE = 'users/{id}/add_product_credit';
const REMOVE_PRODUCT_CREDIT_ROUTE = 'users/{id}/remove_product_credit';

export function changeUserStatusApi(userId, requestData, callback, failCallback) {
  request(CHANGE_USER_STATUS_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function changeUserTypeApi(userId, requestData, callback, failCallback) {
  request(CHANGE_USER_TYPE_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function changePaymentOptionApi(userId, requestData, callback, failCallback) {
  request(CHANGE_PAYMENT_OPTION_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function changePasswordApi(userId, requestData, callback, failCallback) {
  request(CHANGE_PASSWORD_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function addManualCommissionApi(userId, requestData, callback, failCallback) {
  request(ADD_MANUAL_COMMISSION_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function getCreditWalletApi(userId, callback, failCallback) {
  request(GET_CREDIT_WALLET_ROUTE.replace('{id}', userId), {
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

export function addCreditWalletApi(userId, requestData, callback, failCallback) {
  request(ADD_CREDIT_WALLET_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function removeCreditWalletApi(userId, requestData, callback, failCallback) {
  request(REMOVE_CREDIT_WALLET_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function changeUserRankApi(userId, requestData, callback, failCallback) {
  request(CHANGE_USER_RANK_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function resetUserRankApi(userId, requestData, callback, failCallback) {
  request(RESET_USER_RANK_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function changeShowLeaderboardApi(userId, requestData, callback, failCallback) {
  request(CHANGE_SHOW_LEADERBOARD_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function changeShowContactInfoApi(userId, requestData, callback, failCallback) {
  request(CHANGE_SHOW_CONTACT_INFO_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function requestTaxUploadApi(userId, requestData, callback, failCallback) {
  request(REQUEST_TAX_UPLOAD_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function addCommissionApi(userId, requestData, callback, failCallback) {
  request(ADD_COMMISSION_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function getProductCreditApi(userId, callback, failCallback) {
  request(GET_PRODUCT_CREDIT_ROUTE.replace('{id}', userId), {
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

export function addProductCreditApi(userId, requestData, callback, failCallback) {
  request(ADD_PRODUCT_CREDIT_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function removeProductCreditApi(userId, requestData, callback, failCallback) {
  request(REMOVE_PRODUCT_CREDIT_ROUTE.replace('{id}', userId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: requestData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}
