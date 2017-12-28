import qs from './qs';
import { host } from './../config';

/**
 * 根据字母顺序排列属性
 * @param obj 处理对象
 * @param filter 是否需要过滤把null转换成''
 * @returns {string}
 */
function dealParams(url, params = {}) {
  if (Object.prototype.toString.call(params) === '[object Object]') {
    if (url) {
      const urlParams = qs.params(url);
      if (urlParams && urlParams.length > 0) {
        for (let i = 0; i < urlParams.length; i++) {
          const sep = urlParams[i];
          const arr = sep.split('=');
          params[arr[0]] = (arr[1] || '');
        }
        console.log('params: ' + JSON.stringify(params));
      }
    }
  } else {
    throw new Error('参数必须为object');
  }
  return params;
}

export default {
  get(url, data, option = {}) {
    if (!data) {
      data = {};
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${host}${url}`,
        data: dealParams(url, data),
        success: response => {
          console.log(response);
          if (response.statusCode === 200) {
              resolve(response.data);
          } else {
            const err = new Error(response.errMsg);
            err.response = response;
            reject(err);
          }
        },
        fail: err => {
          console.error(`[get请求] ${url} 请求失败`);
          console.error(err);
          reject(err);
        },
        complete(response) {
          console.log(`[get请求] ${url} 参数: ${JSON.stringify(data)}`);
        }
      });
    });
  }
  // post(url, data, option = {}) {
  //   if (!data) {
  //     data = {};
  //   }
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       url: `${config.shopApi}${url}`,
  //       data: dealParams(url, data),
  //       method: 'POST',
  //       header: option.header ? option.header : { 'content-type': 'application/x-www-form-urlencoded' },
  //       success: response => {
  //         if (response.data.code === 0 || response.data.ok) {
  //           if (option.isExtra) {
  //             resolve(response.data);
  //           } else {
  //             resolve(response.data.data);
  //           }
  //         } else {
  //           const err = new Error(response.data.message);
  //           err.response = response;
  //           reject(err);
  //         }
  //       },
  //       fail: err => {
  //         console.error(`[post请求] ${url} 请求失败`);
  //         console.error(err);
  //         reject(err);
  //       },
  //       complete(response) {
  //         console.log(`[post请求] ${url} 参数: ${JSON.stringify(data)}`);
  //         console.log(`code = ${response.data.code}`);
  //         console.log(response.data);
  //       }
  //     });
  //   });
  // }
}
