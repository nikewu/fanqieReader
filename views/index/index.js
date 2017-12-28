import fetch from './../../libs/fetch';
import util from './../../libs/util.js';
import WxParse from './../../vendor/wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: '',
    more: [],
    time: new Date(),
    isRecFetching: false,
    detail: null,
    viewList: true,
    toView:'image'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetch();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.viewList){
      this.loadMore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  fetch() {
    wx.showLoading({ title: '加载中', mask: true });
    fetch.get(`/news/latest`).then(json => {
      this.setData({
        data: json.stories
      });
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  fetchMore() {
    fetch.get(`/news/before/${util.timeFormat(this.data.time, 'YYYYMMDD')}`).then(json => {
      let yesterday = new Date(new Date(this.data.time).getTime() - 24 * 60 * 60 * 1000);
      let more = this.data.more;
      more.push(json);
      this.setData({
        more: more,
        isRecFetching: false,
        time: yesterday
      });
    }).catch(err => {
      console.log(err);
    })
  },
  fetDetail(id) {
    wx.showLoading({ title: '加载中', mask: true });
    fetch.get(`/news/${id}`).then(json => {
      WxParse.wxParse('article', 'html', json.body, this, 5); 
      this.setData({
        detail: json,
        viewList:false
      });
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  },
  loadMore() {
    if (!this.data.isRecFetching) {
      this.setData({
        isRecFetching: true
      });
      this.fetchMore();
    }
  },
  viewDetail(e) {
    this.fetDetail(e.currentTarget.dataset.id);
  },
  backList() {
    this.setData({
      viewList: true
    });
  },
  backTop() {
    this.setData({
      toView: 'image'
    });
  }
})