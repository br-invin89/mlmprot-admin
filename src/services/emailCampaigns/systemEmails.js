import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_SYSTEM_EMAILS_ROUTE = 'system_email/emails';
const ACTIVATE_SYSTEM_EMAIL_ROUTE = `system_email/set_activation/{emailId}`;
const SEND_TEST_SYSTEM_EMAIL_ROUTE = `system_email/send_test`;
const GET_SYSTEM_EMAIL_DETAIL_ROUTE = `system_email/emails/{emailId}`;

const GET_SYSTEM_EMAIL_LOGO_FOOTER_ROUTE = `system_email/logo_footer`;
const SAVE_SYSTEM_EMAIL_LOGO_FOOTER_ROUTE = `system_email/save_logo_footer`;

const SAVE_SYSTEM_EMAIL_DETAIL_CONTENT_ROUTE = `system_email/content/{emailId}`;
const RESTORE_SYSTEM_EMAIL_DETAIL_CONTENT_ROUTE = `system_email/content/{emailId}`;

export function getSystemEmailsApi(params, callback, failCallback) {
  return request(GET_SYSTEM_EMAILS_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function activateSystemEmailApi(emailId, data, callback, failCallback) {
  return request(ACTIVATE_SYSTEM_EMAIL_ROUTE.replace('{emailId}', emailId), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data,
  }).then(({ response }) => {
    if (response) {
      callback();
    } else {
      failCallback();
    }
  });
}

export function getSystemEmailDetailApi(emailId, callback, failCallback) {
  return request(GET_SYSTEM_EMAIL_DETAIL_ROUTE.replace('{emailId}', emailId), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function getLogoAndFooterApi(params, callback, failCallback) {
  return request(GET_SYSTEM_EMAIL_LOGO_FOOTER_ROUTE, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function saveLogoAndFooterApi(params, callback, failCallback) {
  return request(SAVE_SYSTEM_EMAIL_LOGO_FOOTER_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: params
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function saveSystemEmailDetailContentApi(emailId, content, callback, failCallback) {
  return request(SAVE_SYSTEM_EMAIL_DETAIL_CONTENT_ROUTE.replace('{emailId}', emailId), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: {'content_conv': content}
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function restoreSystemEmailDetailContentApi(emailId, callback, failCallback) {
  return request(RESTORE_SYSTEM_EMAIL_DETAIL_CONTENT_ROUTE.replace('{emailId}', emailId), {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function sendTestSystemEmailApi(data, callback, failCallback) {
  return request(SEND_TEST_SYSTEM_EMAIL_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}