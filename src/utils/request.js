/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-globals */
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import { clearUser } from '@/utils/localStorage';

const codeMessage = {
  200: 'Success.',
  201: 'Creation success',
  202: 'Background queue',
  204: 'Delete success',
  400: 'Failed',
  401: 'Try login again',
  403: 'Login Failed',
  422: 'Wrong request.',
  500: 'Server error.',
  502: 'Gateway error.',
};
/** 异常处理程序 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const text = error.data;
    const { message } = text;    
    if (response.status === 401) {
      clearUser();
      history.push('/dashboard');
    } else if (response.status === 403) {
      notification.error({
        message: `${codeMessage[response.status]}`,
        description: 'You are inactive now',
      });
      clearUser();
      history.push('/dashboard');
    } else {
      if (location.pathname.includes('auth/login')) {
        notification.error({
          message: `${errorText}`,
          description: 'Incorrect Email or Password',
        });
      } else {
        notification.error({
          message: `${errorText}`,
          description: message || '',
        });
      }
    }
  } else if (!response) {
    notification.error({
      description: 'Your network cannot connect to the server',
      message: 'Network error',
    });
  }

  return response;
};
/** 配置request请求时的默认参数 */

const request = extend({
  // eslint-disable-next-line no-undef
  prefix: `${REACT_APP_API_SERVER}/api/admin/`,
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    // Authorization: `Bearer ${getToken()}`,
  },
  getResponse: true,
});
export default request;
