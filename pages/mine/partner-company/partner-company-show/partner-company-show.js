// pages/mine/partner-company/partner-company-show/partner-company-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    ellipsis: true,
    cancel: false

  },
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  ellipsis2: function () {
    var value = !this.data.ellipsis2;
    this.setData({
      ellipsis2: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host,
      com_id: options.com_id
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
    app.func.req('partner_company_show/' + that.data.com_id, {}, 'GET', function (res) {
      console.log("20191101======");
      console.log(that.data.com_id);
      console.log(res);
      that.setData({
        items: res
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