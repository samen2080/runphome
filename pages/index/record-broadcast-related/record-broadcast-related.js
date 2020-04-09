// pages/index/record-broadcast-related/record-broadcast-related.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({
  data: {
    currentTab: 0,

    foldItems: [],
    videoUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    if (undefined != options.lsm_id) {
      that.setData({
        host: host,
        lsm_id: options.lsm_id,
      })
    };

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getDetail();
      },
    })
  },

  getDetail: function () {
    var that = this;
    app.func.req('get_videos_chapter/' + that.data.lsm_id, {}, 'GET', function (res) {
      if (res) {
        that.setData({
          items: res,
          videoUrl: res.lsm_attribute1,
          lesson_main_name: res.lsm_lesson_main_name,
          teacher_class_level: res.lsm_teacher_class_level,
          teacher_name: res.tea_teacher_name,
          total_chapter: res.lsm_total_chapter,
          total_hours: res.lsm_total_hours,
          lesson_desc: res.lsm_lesson_desc,
        });
      }
    });
  },

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current == 0) {
        console.log("clickTab");
      } else {
        console.log("clickTab Else");
      }
    }
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