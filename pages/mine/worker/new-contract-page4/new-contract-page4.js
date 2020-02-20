// pages/mine/worker/new-contract-page4/new-contract-page4.js
var qqmapsdk, app = getApp();

Page({
  data: {
    total: 0,
    showModal: !1,
    zffs: 1,
    zfz: !1,
    zfwz: "微信支付",
    btntype: "btn_ok1",
    yhqkdje: 0,
    hbkdje: 0,
    note: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
  },

  alone_pay: function (e) {
    var that = this;
    var user_name = wx.getStorageSync("contract_page1_data").user_name;
    var user_id = wx.getStorageSync("contract_page1_data").user_id;
    var user_sex = wx.getStorageSync("contract_page1_data").user_sex;
    var user_mobile = wx.getStorageSync("contract_page1_data").user_mobile;
    var user_city_id = wx.getStorageSync("contract_page1_data").user_city_id;
    var user_address = wx.getStorageSync("contract_page1_data").user_address;

    var address_img = wx.getStorageSync("contract_page1_data").address_img;

    var period = wx.getStorageSync("contract_page2_data").period;
    var lift_module = wx.getStorageSync("contract_page2_data").lift_module;
    var install_date = wx.getStorageSync("contract_page2_data").install_date;
    var start_date = wx.getStorageSync("contract_page2_data").start_date;
    var end_date = wx.getStorageSync("contract_page2_data").end_date;
    var total_amt = wx.getStorageSync("contract_page2_data").total_amt;
    var sign_id = wx.getStorageSync("contract_page2_data").sign_id;
    var maint_id = wx.getStorageSync("contract_page2_data").maint_id;
    var maint_com = wx.getStorageSync("contract_page2_data").maint_com;
    var sign_image = wx.getStorageSync("contract_page3_data").sign_image;

    app.func.req('add_contract', {user_name: user_name, user_id: user_id, user_sex: user_sex, 
      user_city_id: user_city_id, user_address: user_address, 
      address_img: address_img[0],
      period: period, lift_module: lift_module, 
      install_date: install_date, start_date: start_date,
      end_date: end_date, total_amt: total_amt,
      sign_id: sign_id, maint_id: maint_id, sign_image: sign_image[0],
        maint_com: maint_com, openid: that.data.openid,
         }, 'POST', function (res) {
        // console.log(res);
        if (res.code == 200) {
          wx.navigateTo({
            url: '../../contract/contract',
          })
        }
      })
  },
  // 20191113 end
  
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