const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '请选择',
    dateColor: '#999999'
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      dates: e.detail.value,
      dateColor: '#000000'
    })
  },
  genderSelect: function (e) {
    // console.log(e);
    this.setData({
      id: e.target.dataset.id
    })
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
      host: host,
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
          // console.log(res);
          that.setData({
            userInfo: res
            // user_headimg: res.user_headimg
          })
          if (res.stu_sex == 1) {
            that.setData({
              id: 0
            })
          } else if (res.stu_sex == 2) {
            that.setData({
              id: 1
            })
          }
          if (res.user_birthday != '') {
            that.setData({
              // 20200213 start
              //dates: res.user_birthday,
              dates: res.stu_birthday,
              // 20200213 end
              dateColor: '#000000'
            })
          }
        });
      },
    })
  },
  
  // 保存
  submit: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../student-show-page2/student-show-page2?stu_id=' + e.currentTarget.dataset.stuid,
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