import { isArray, isPrimitive } from './type';
import { trim } from './util';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function unescape(s) {
  return decodeURIComponent(s.replace(/\+/g, ' '));
}
/**
 * Serialize an object to a query string. Optionally override the default
 * separator and assignment characters.
 *
 * stringify({foo: 'bar'})
 *   // returns 'foo=bar'
 *
 * stringify({foo: 'bar', baz: 'bob'}, ';', ':')
 *   // returns 'foo:bar;baz:bob'
 */
export function stringify(obj, sep, eq, arrayKey) {
  if (!obj) return '';

  sep = sep || '&';
  eq = eq || '=';
  arrayKey = arrayKey || false;

  const buf = [];
  let key;
  let val;

  for (key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      val = obj[key];
      key = encodeURIComponent(key);

      // val is primitive value
      if (isPrimitive(val)) {
        buf.push(key, eq, encodeURIComponent(`${val}`), sep);
      } else if (isArray(val) && val.length) { // val is not empty array
        for (let i = 0; i < val.length; i++) {
          if (isPrimitive(val[i])) {
            buf.push(
              key,
              (arrayKey ? encodeURIComponent('[]') : '') + eq,
              encodeURIComponent(`${val[i]}`),
              sep
            );
          }
        }
      } else { // ignore other cases, including empty array, Function, RegExp, Date etc.
        buf.push(key, eq, sep);
      }
    }
  }

  buf.pop();
  return buf.join('');
}

/**
 * Deserialize a query string to an object. Optionally override the default
 * separator and assignment characters.
 *
 * parse('a=b&c=d')
 *   // returns {a: 'b', c: 'c'}
 */
export function parse(str, sep, eq) {
  if (typeof str === 'undefined') {
    str = document.location.search;
  }
  const ret = {};
  if (typeof str !== 'string' || trim(str).length === 0) {
    return ret;
  }
  // remove ^?
  str = str.replace(/^\?/, '');
  const pairs = str.split(sep || '&');
  eq = eq || '=';
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split(eq);
    let key = unescape(trim(pair[0]));
    const val = unescape(trim(pair.slice(1).join(eq)));
    const m = key.match(/^(\w+)\[\]$/);
    if (m && m[1]) {
      key = m[1];
    }
    if (hasOwnProperty.call(ret, key)) {
      if (!isArray(ret[key])) {
        ret[key] = [ret[key]];
      }
      ret[key].push(val);
    } else {
      ret[key] = m ? [val] : val;
    }
  }
  return ret;
}
/**
 * 取url 中的某个参数
 * @param {string} name 
 * @param {string} url 
 */
export function param(name, url = window.location.search) {
  const query = parse(url);
  return query[name];
}
/**
 * 取url 中的所有参数
 * @param {string} name 
 */
export function params(url) {
  if (url.indexOf('?') === -1) {
    return null;
  }
  const arr = url.split('?');
  const query = parse(arr[1]);
  return query;
}
export default {
  param,
  params,
  parse,
  stringify
};
