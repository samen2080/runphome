// pages/company/company-show/edu-exp/edu-exp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edu_graduate_year: '请选择',
    edu_graduate_year: '2018-07-01',
    dateColor: '#999999'
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      edu_graduate_year: e.detail.value,
      dateColor: '#000000'
    })
  },

  // finish: function (e) {
  //   var that = this;
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },
  formSubmit: function (e) {
    var that = this;
    // var num = e.currentTarget.dataset.num;
    // console.log("20200215res", e.currentTarget.dataset.i['job_name']);
    app.func.req('add_education', {
      edu_school_name: e.detail.value.edu_school_name,
      edu_major: e.detail.value.edu_major,
      edu_graduate_year: that.data.edu_graduate_year,
    
      openid: that.data.openid,
    }, 'POST', function (res) {
      // console.log("20200126", that.data.mnt_user_province);
      if (res.code == 200) {
        wx.navigateBack({
          delta: 1
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      // job_id: options.job_id,
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      }
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