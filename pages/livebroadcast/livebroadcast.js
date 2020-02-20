//index.js
//获取应用实例
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({
  data: {
    swiperCurrent: 0,
    //  weburl: "https://wedu01.xqinfo.com.cn/app/index.php?i=8&c=entry&do=lesson&m=fy_lessonv2&id=1606&uid=6"
    //weburl: "https://www.xqinfo.com.cn/app/./index.php?i=2&c=entry&eid=13"
    //  weburl: "https://wedu01.xqinfo.com.cn/app/./index.php?i=8&c=entry&eid=45"
     weburl: "https://wedu01.xqinfo.com.cn/app/index.php?i=8&c=auth&a=login&forward=aT04JmM9ZW50cnkmZWlkPTQ1&wxref=mp.weixin.qq.com#wechat_redirect"
  },
  onLoad: function (options) {
    console.log(options)
    if (options.returnurl) {
      var that = this;

      that.setData({
        weburl: decodeURIComponent(options.returnurl)
      })
    }
    // var that = this;
    // var host = getApp().globalData.host;
    // that.setData({
    //   weburl: host
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target);
    }
  }
})
