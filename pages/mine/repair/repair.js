// pages/mine/repair/repair.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList: [],
    num: 0,
    hidden: true
  },

  // 取消交易
  removePro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.conid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt: '确定要取消吗？',
      way: 0
    })

  },

  // 删除订单
  cancelPro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.conid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt: '确定要删除合约吗？',
      way: 1
    })

  },

  // 取消取消合约
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定取消交易
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (that.data.way == 0) {
      that.cancel(num);
    } else if (that.data.way == 1) {
      that.deleteCon(num);
    }
    that.setData({
      hidden: true
    })
  },

  // 取消交易
  cancel: function (con_id) {
    var that = this;
    app.func.req('cancel_contract', { openid: that.data.openid, con_id: con_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        //that.getData();
      }
    });
  },

  // 删除订单
  deleteCon: function (con_id) {
    var that = this;
    app.func.req('del_contract', { openid: that.data.openid, con_id: con_id }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        // that.getData();
      }
    });
  },

  // 查看详情
  showRepPage: function (e) {
    //  var index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'repair-show/repair-show?rep_id=' + e.currentTarget.dataset.repid,
    })
  },
  // 合约评价
  showRatePage: function (e) {
    wx.navigateTo({
      url: 'repair-pj/repair-pj?rep_id=' + e.currentTarget.dataset.repid,
    })
  },

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;

    that.setData({
      host: host
    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        app.func.req('my_repair', { openid: res.data, pageSize: 1000, page: 1 }, 'GET', function (res) {
          // console.log(res);
          that.setData({
            items: res
          })
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})