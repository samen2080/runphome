// pages/mine/current-student/current-student-show/current-student-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    cancel: false,
    dates: '请选择',
    dateColor: '#999999'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    console.log("20200213res======", options.stu_id);
    that.setData({
      host: host,
      stu_id: options.stu_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    that.getDetail();
  },
  getDetail: function () {
    var that = this;
    //app.func.req('get_student', { user_id: that.data.user_id }, 'GET', function (res) {
    app.func.req('current_student_show/' + that.data.stu_id, {}, 'GET', function (res) {
      console.log("20200213res", res);
      that.setData({
        userInfo: res
        // user_headimg: res.user_headimg
      })
    });
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