const toString = Object.prototype.toString;

export function isActualNaN(value) {
  return value !== value;
}
export function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * If the type of o is null, undefined, number, string, boolean,
 * return true.
 */
// 基本数据类型 null, undef, number, string, boolean, return TRUE.
export function isPrimitive(value) {
  return value !== Object(value);
}
export function isObject(value) {
  return toString.call(value) === '[object Object]';
}
export function isArray(value) {
  return toString.call(value) === '[object Array]';
}
export function isString(value) {
  return toString.call(value) === '[object String]';
}
export function isBoolean(value) {
  return toString.call(value) === '[object Boolean]';
}
export function isNumber(value) {
  return toString.call(value) === '[object Number]';
}
export function isDate(value) {
  return toString.call(value) === '[object Date]';
}
export function isInt(value) {
  return this.number(value) && !this.isActualNaN(value) && value % 1 === 0;
}
export function isError(value) {
  return toString.call(value) === '[object Error]';
}
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}


export function isPhone(value) {
  return Boolean(/^1\d{10}$/.test(value));
}

export function isPwd(value) {
  return Boolean(/^.{6,20}$/.test(value));
}
export default {
  isActualNaN,
  isUndefined,
  isPrimitive,
  isObject,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isInt,
  isError,
  isFunction,
  isPhone,
  isPwd
};
