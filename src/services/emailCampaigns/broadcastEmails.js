import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_BROADCAST_EMAIL_TEMPLATES_ROUTE = 'broadcast_email/templates';
const GET_BROADCAST_EMAIL_TEMPLATE_DETAIL_ROUTE =
  'broadcast_email/get_template_content/{template_id}';
const GET_BROADCAST_EMAIL_SEARCH_USER_ROUTE =
  'broadcast_email/search-user?fields=first_name,last_name,username&search=';

const GET_BROADCAST_EMAILS_ROUTE = 'broadcast_email/emails';
const GET_BROADCAST_EMAIL_DETAIL_ROUTE = 'broadcast_email/email_detail/{email_id}';
const CREATE_BROADCAST_EMAIL_ROUTE = 'broadcast_email/create_email';
const CREATE_SEND_BROADCAST_EMAIL_ROUTE = 'broadcast_email/create_email_and_send';
const UPDATE_BROADCAST_EMAIL_ROUTE = 'broadcast_email/update_email/{email_id}';
const UPDATE_SEND_BROADCAST_EMAIL_ROUTE = 'broadcast_email/update_email_and_send/{email_id}';

const GET_CHUNKS_DETAIL = 'broadcast_email/get_chunks_detail/{email_id}';
const RESEND_CHUNK = 'broadcast_email/resend_chunk/{chunk_id}';

export function getBroadcastEmailTemplatesApi(callback, failCallback) {
  return request(GET_BROADCAST_EMAIL_TEMPLATES_ROUTE, {
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

export function getBroadcastEmailTemplateDetailApi(templateId, callback, failCallback) {
  return request(GET_BROADCAST_EMAIL_TEMPLATE_DETAIL_ROUTE.replace('{template_id}', templateId), {
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

export function getBroadcastEmailSearchUserApi(param, callback, failCallback) {
  return request(GET_BROADCAST_EMAIL_SEARCH_USER_ROUTE + param, {
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

export function createBroadcastEmailApi(formData, callback, failCallback) {
  return request(CREATE_BROADCAST_EMAIL_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: formData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function createSendBroadcastEmailApi(formData, callback, failCallback) {
  return request(CREATE_SEND_BROADCAST_EMAIL_ROUTE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: formData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function updateBroadcastEmailApi(broadcastId, formData, callback, failCallback) {
  return request(UPDATE_BROADCAST_EMAIL_ROUTE.replace('{email_id}', broadcastId), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: formData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function updateSendBroadcastEmailApi(broadcastId, formData, callback, failCallback) {
  return request(UPDATE_SEND_BROADCAST_EMAIL_ROUTE.replace('{email_id}', broadcastId), {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: formData,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function getBroadcastEmailsApi(params, callback, failCallback) {
  return request(GET_BROADCAST_EMAILS_ROUTE, {
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

export function getBroadcastEmailDetailApi(broadcastId, callback, failCallback) {
  return request(GET_BROADCAST_EMAIL_DETAIL_ROUTE.replace('{email_id}', broadcastId), {
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

export function getBroadcastChunksApi(broadcastId, callback, failCallback) {
  return request(GET_CHUNKS_DETAIL.replace('{email_id}', broadcastId), {
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

export function resendBroadcastChunkApi(chunkId, callback, failCallback) {
  return request(RESEND_CHUNK.replace('{chunk_id}', chunkId), {
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
