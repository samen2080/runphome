// pages/mine/company-position/company-position.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teaList: [],
    num: 0,
    hidden: true,
    navData: [
      {
        text: '全部'
      },
      {
        text: '工业制造'
      },
      {
        text: '信息科技'
      },
      {
        text: '生活服务'
      },
      {
        text: '批发零售'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0
  },

  // 切换导航
  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = that.data.windowWidth / 5;
    //tab选项居中                            
    that.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var that = this;
    var cur = event.detail.current;
    var singleNavWidth = that.data.windowWidth / 5;
    that.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth,
      searchInput: ''
    });
    // that.getGoods();
  },
  // 查看详情
  showStuPage: function (e) {
    //  var index = e.currentTarget.dataset.id;
    console.log("20200213stu", e.currentTarget.dataset.stuid);
    wx.navigateTo({
      url: '../student/student-show-page1/student-show-page1?stu_id=' + e.currentTarget.dataset.stuid,
    })
  },

  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    var com_id = wx.getStorageSync("company_data").com_id;
    console.log("20200213com_id", wx.getStorageSync("company_data").com_id);
    that.setData({
      host: host
    })


    app.func.req('company_position', { com_id: com_id }, 'GET', function (res) {
      console.log("20200213res", res);
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