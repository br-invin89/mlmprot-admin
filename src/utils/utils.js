import { parse } from 'querystring';
import { FormattedMessage } from 'umi'
import React from 'react'
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// Handel API Response
export const handleResponseError = (res) => {

  const {response, data} = res

  if (res.status && res.status !== 200) {
    throw Error(res.statusText);
  }

  if (response.status === 200) {
    return data
  }

  return data
}

// [1, 2,] to '[1, 2]'
export const arrayToString = (array = []) => {
  const items = array.map((date)=>{
    return `${  date  }`
  }).join(",")

  return `[${items}]`
}

// '[1, 2]' to [1, 2,]
export const stringToArray = (string) => {
  return string ? string.replace('[','').replace(']','').split(',') : ''
}

// to use for localization
export const toLocal = (id, defaultMessage) => {
  return <FormattedMessage id={id} defaultMessage={defaultMessage} />
}

// to use for localization
export const getFileNameFromUrl = (url) => {
  return url.substring(url.lastIndexOf('/')+1);
}
