// pages/company/company-show/work-exp/work-exp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wke_start_year: '请选择',
    wke_start_year: '2018-07-01',
    wke_end_year: '请选择',
    wke_end_year: '2018-07-01',
    // res_work_company_hiredate: '请选择您在此公司的入职时间',
    // res_work_company_hiredate: '2018-07-01',
    dateColor: '#fa9017'

  },
  bindDateChange1: function (e) {
    console.log(e.detail.value)
    this.setData({
      wke_start_year: e.detail.value,
      dateColor: '#000000'
    })
  },
  bindDateChange2: function (e) {
     console.log(e.detail.value)
    this.setData({
      wke_end_year: e.detail.value,
      dateColor: '#000000'
    })
  },
  // bindDateChange3: function (e) {
  //    console.log(e.detail.value)
  //   this.setData({
  //     res_work_company_hiredate: e.detail.value,
  //     dateColor: '#000000'
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      job_id: options.job_id,
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
    app.func.req('add_work', {
      wke_com_name: e.detail.value.wke_com_name,
      wke_wrk_content: e.detail.value.wke_wrk_content,
      wke_start_year: that.data.wke_start_year,
      wke_end_year: that.data.wke_end_year,
 
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