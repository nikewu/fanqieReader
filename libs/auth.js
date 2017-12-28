import wxapi from './wxapi.js';
const getUserInfo = function () {
  console.log('getUserInfo()');
  return wxapi.getSetting().then(res => {
    if (res.authSetting['scope.userInfo']) {
      console.log('[app.js]用户已授权');
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      return Promise.resolve();
    } else {
      return wxapi.authorize();
    }
  }).then(() => {
    return wxapi.getUserInfo();
  }).catch(e => {
    return Promise.resolve({});
  });
};
export default {
  login() {
    // 检测当前用户登录态是否有效
    return new Promise((resolve, reject) => {
      const localUserInfo = wx.getStorageSync('userInfo') || {};
      console.log('localUserInfo = ' + JSON.stringify(localUserInfo));
      wxapi.checkSession().then(result => {
        if (result) {
          if (localUserInfo.nikeName) {  // 用户曾经授权过，有用户详细信息
            return Promise.reject(localUserInfo);
          } else {
            return Promise.resolve();
          }
        } else {
          console.log('用户登录态 无效');
          return Promise.resolve();
        }
      }).then(() => {
        return wxapi.login();
      }).then(res => {
        if (res.code) {
          return getUserInfo();
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
          reject();
        }
        }).then(user => {
          const userInfo = user.userInfo;
          wx.setStorage({
            key: 'userInfo',
            data: userInfo || {},
          });
          resolve(userInfo);
        }).catch(e => {
        console.log(e);
        if (isError(e)) {
          reject(e);
        } else {
          resolve(e);
        }
      });
    })
  }
};