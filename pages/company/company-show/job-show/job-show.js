  // pages/mine/product-show/product-show.js
const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    hidden: true,
    onhidden: true,
    onbtnShow: true,
    rebtnShow: false,
    buyShow: true,
    hasMore: true,
    messageList: []
  },
  // 申请职位
  applyJob: function (e) {
    wx.navigateTo({
      url: '../app-job/app-job?job_id=' + e.currentTarget.dataset.jobid,
    })
  },
  // 购买
  buyPro: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../../index/transaction/buy/buy?old_id=' + that.data.pro_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      job_id: options.job_id
    })
  
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        
      },
    })
    app.func.req('company_job_show/' + that.data.job_id, {}, 'GET', function (res) {
      console.log("20200213res", res);
      that.setData({
        inList: res
      })
    });
  },
  //拨打电话
  bind_tal: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.inList.job_mobile //仅为示例，并非真实的电话号码
    })
  },
  // 课程详情
  getDetail: function (old_id) {
    var that = this;
    app.func.req('old_detail/' + old_id, { openid: that.data.openid }, 'GET', function (res) {
      console.log("20200121 res", res);
      that.setData({
        old_name: res.old_name,
        pro_id: res.old_id,
        old_describe: res.old_describe,
        old_money: res.old_money,
        old_collect: res.collect,
        user_nickname: res.user_nickname,
        user_headimg: res.user_headimg,
        user_address: res.old_area,
        imgUrls: res.old_img,
        old_user_id: res.old_user_id,
        old_add_time: res.old_add_time,
        old_end_time: res.old_end_time
      })
      if (res.is_published == 2 && that.data.status == 0) {
        that.setData({
          onbtnShow: false,
          rebtnShow: true
        })
      } else if (res.is_published == 1 && that.data.status == 0) {
        that.setData({
          onbtnShow: true,
          rebtnShow: false
        })
      }
    });
  },
  fullSize: function (e) {
    var src = e.currentTarget.dataset.src;
    for (var i = 0; i < this.data.imgUrls.length; i++) {
      this.data.imgUrls[i] = this.data.host + this.data.imgUrls[i];
    }
    //图片预览
    wx.previewImage({
      current: src,
      urls: this.data.imgUrls
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
  
})