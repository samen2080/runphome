// pages/index/transaction/buy/reserve-success.js 20200316 new add
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  old_id: 0,
  bok_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      old_id: options.old_id,
      bok_id: options.bok_id
      // tel: options.tel
    })
    console.log("20200319reserve old_id", this.data.old_id);
    console.log("20200319reserve bok_id", this.data.bok_id);

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