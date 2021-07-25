import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const SUDO_USER_ROUTE = 'users/{id}/sudo';
const SUDO_ENROLLER_ROUTE = 'users/{id}/sudo_enroller';

export function sudoUserApi(userId, callback) {
  request(SUDO_USER_ROUTE.replace('{id}', userId), {
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    }
  });
}

export function sudoEnrollerApi(userId, callback, failCallback) {
  request(SUDO_ENROLLER_ROUTE.replace('{id}', userId), {
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
