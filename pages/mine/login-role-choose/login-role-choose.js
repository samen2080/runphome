// pages/mine/login-role-choose/login-role-choose.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleArr: ['超级管理员', '管理员', '学校', '招生老师', '上课老师', '班主任', '学生', '企业', '猎头', '游客'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var user_id = wx.getStorageSync("user_info").user_id;
    that.setData({
      user_id: user_id
    })
  },
  // 选择分类
  roleSelect: function (e) {
    var that = this;
    var index = e.target.dataset.id;
    wx.setStorage({
      key: 'login_role',
      data: {
        role_type: index + 1
      },
      success: function () {
        console.log("20200213onload check user_id", that.data.user_id);
        if (that.data.user_id != null) {
          that.roleSwitch();
        };
        wx.navigateBack({
          delta: 1
        });
      }
    })
  },

  roleSwitch: function (e) {
    var that = this;
    console.log("20200213roleSwitch is called");
    let role_type = wx.getStorageSync('login_role');
    app.func.req('role_switch', { user_id: that.data.user_id, user_identity: role_type.role_type }, 'GET', function (res) {
      if (res.code == 200) {
        wx.navigateBack({
          delta: 1
        })
      }
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