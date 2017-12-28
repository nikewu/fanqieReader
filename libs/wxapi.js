import { isError } from './type';
export default {
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res);
        }
      })
    })
  },
  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success() {
          resolve(true);
        },
        fail() {
          resolve(false);
        }
      });
    });
  },
  authorize(scope = 'scope.userInfo') {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: scope,
        success() {
          console.log('wx.authorize success');
          resolve();
        },
        fail() {
          console.log('wx.authorize fail');
          reject();
        }
      });
    });
  },
  getUserInfo(withCredentials = true) {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: withCredentials,
        success: res => {
          console.log('wx.getUserInfo success');
          resolve(res);
        },
        fail() {
          console.log('wx.getUserInfo fail');
          resolve({});
        }
      });
    });
  },
  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          resolve(res);
        }
      });
    });
  }
}