// pages/mine/partner-teacher/partner-teacher-show/partner-teacher-show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
   // < !--20200213  start -->
    ellipsis: true,
    //< !--20200213  end-- >
    cancel: false

  },
 // < !--20200213  start-- >
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
  // < !--20200213  end-- >
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    that.setData({
      host: host,
      tea_id: options.tea_id
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
    app.func.req('partner_teacher_show/' + that.data.tea_id, {}, 'GET', function (res) {
      console.log("20200213======");
      console.log(that.data.tea_id);
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