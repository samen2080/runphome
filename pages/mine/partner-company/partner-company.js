// pages/mine/partner-company/partner-company.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comList: [],
    num: 0,
    hidden: true
  },

  // 查看详情
  showComPage: function (e) {
    //  var index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'partner-company-show/partner-company-show?com_id=' + e.currentTarget.dataset.comid,
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
        app.func.req('my_partner_company', { openid: res.data, pageSize: 1000, page: 1 }, 'GET', function (res) {
          console.log("20200213res", res);
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