import moment from './../vendor/moment.js';
function trim(string) {
  const reg = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
  return string.replace(reg, '');
}
/**
 * 随机生成字符串
 */
function random(len = 32) {
  const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return str;
}
function timeFormat(time, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(format);
}
export default {
  random,
  trim,
  timeFormat
};