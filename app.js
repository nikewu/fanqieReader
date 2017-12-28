import auth from './libs/auth.js';
App({
  onLaunch: function () {
    // 登录
    auth.login().then(json => {
      if (json) {
        this.globalData.userInfo = json;
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(json)
        }
      }
    }).catch(e => {
      console.log('catch error: ' + e.message);
    });
  },
  globalData: {
    userInfo: null
  }
})