import request from '@/utils/request';
import { storeUser } from '@/utils/localStorage';

const LOGIN_ROUTE = 'auth/login';

export function loginApi(formData, callback, failCallback) {
  return request(LOGIN_ROUTE, {
    method: 'POST',
    data: formData,
  }).then(({ data, response }) => {
    if (response) {      
      storeUser(data.data.user, data.data.token)
      callback(data)
    } else {
      failCallback()
    }
  })
    .then(({ data, response }) => {
      if (response) {
        storeUser(data.data.user, data.data.token);
        callback(data);
      } else {
        failCallback();
      }
    })
    .catch((err) => {
      failCallback()
    });
}
