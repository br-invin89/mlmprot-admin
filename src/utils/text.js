/* eslint-disable no-var */
import moment from 'moment';

export const asPrice = (priceNumber) => {
  if (priceNumber == null) return '';
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(priceNumber)) return priceNumber;
  // eslint-disable-next-line no-param-reassign
  priceNumber = (priceNumber * 1).toFixed(2);
  // eslint-disable-next-line no-param-reassign
  priceNumber = priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${priceNumber}`;
};

export const asNumber = (number) => {
  if (number == null) return '';
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(number)) return number;
  return (number * 1).toLocaleString();
};

export const asKNumber = (number) => {
  if (number == null) return '';
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(number)) return number;
  if (number < 100) {
    return number;
  }
  return `${Math.floor(number / 10) / 100}K`;
};

export const asPercent = (number) => {
  if (number == null) return '';
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(number)) return number;
  return `${number.toFixed(2)}%`;
};

export const asDate = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;
  return moment(x).format('MM/DD/YYYY');
};
export const asDateTime = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;

  if (x.includes('T')) {
    let d = new Date(x).toLocaleString()
    return d.replace(',', "");
  } else {
    let d_ = x.replace(" ", "T") + ".000000Z"
    let d = new Date(d_).toLocaleString()
    return d.replace(',', "");
  }
};

export const snake2Pascal = (str) => {
  // eslint-disable-next-line no-param-reassign
  str += '';
  // eslint-disable-next-line no-param-reassign
  str = str.split('-');

  // eslint-disable-next-line no-shadow
  function upper(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    const str2 = str[i].split('/');
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < str2.length; j++) {
      str2[j] = upper(str2[j]);
    }
    // eslint-disable-next-line no-param-reassign
    str[i] = str2.join(' ');
  }
  return str.join(' ');
};

export const snakeCase = (string) => {
  return (
    string &&
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.toLowerCase())
      .join('_')
  );
};
