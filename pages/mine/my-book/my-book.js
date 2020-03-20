// pages/mine/my-book/my-book.js
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
  showOldPage: function (e) {
    var that = this;
    console.log("20200320A", e.currentTarget.dataset.oldid)
    wx.navigateTo({
      url: '../product-show/product-show?pro_id=' + e.currentTarget.dataset.oldid,
    })
  },

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    that.setData({
      host: host
    })
        app.func.req('my_book', { user_id: user_id }, 'GET', function (res) {
          console.log("20200320res", res);
          that.setData({
            items: res,
          })
        });
        
    
     
       
  },
  // getData: function () {

  //   var that = this;
  //   app.func.req('my_coursePhoto', { pro_id: e.currentTarget.dataset.oldid }, 'GET', function (res) {
  //     console.log("20200320B", res);
  //     that.setData({
  //       photoList: res,
       
  //     })
  //   });
  // },
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