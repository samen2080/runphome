// pages/mine/new-student-page3/new-student-succeed/new-student-succeed.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    that.setData({
      user_id: user_id,
      user_identity: user_identity,
    })
    wx.getStorage({
      key: 'openid',

      success: function (res) {
        that.setData({
          openid: res.data
        })
        app.func.req('get_student', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200213res", res);
          that.setData({
            userInfo: res
            // user_headimg: res.user_headimg
          })
        });
      },
    })
  },
  //查看概要
  outline: function (e) {
    console.log("20200216stuid", e.currentTarget.dataset.stuid);
    var that = this;
    wx.navigateTo({
      url: '../../student/student'
    })
  },
  // 报名选课
  chioce: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../../../index/transaction/transaction'
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})