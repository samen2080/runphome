// pages/mine/local-company/local-company.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teaList: [],
    num: 0,
    hidden: true
  },

  // 查看详情
  showConPage: function (e) {
    //  var index = e.currentTarget.dataset.id;
    console.log("20200213stu", e.currentTarget.dataset.stuid);
    wx.navigateTo({
      url: '../school-contract/school-contract-show/school-contract-show?scc_id=' + e.currentTarget.dataset.sccid,
    })
  },

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    var sch_id = wx.getStorageSync("school_data").sch_id;
    that.setData({
      host: host
    })

    // wx.getStorage({
    //   key: 'school_data',
    //   success: function (res) {
    // app.func.req('local_teacher', { openid: res.data, pageSize: 1000, page: 1 }, 'GET', function (res) {
    app.func.req('local_contract', { sch_id: sch_id }, 'GET', function (res) {
      console.log("20200213res", res);
      that.setData({
        items: res
      })
    });
    //   },
    // })
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