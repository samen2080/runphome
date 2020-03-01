
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true,
    currentTab: 0,
    routers: [
      {
        name: 'T1',
        url: '',
        icon: ''
      },
      {
        name: 'T2',
        url: '',
        icon: ''
      },
      {
        name: 'T3',
        url: '',
        icon: ''
      },
      {
        name: 'T4',
        url: '',
        icon: ''
      },
      {
        name: 'T5',
        url: '',
        icon: ''
      },
      {
        name: 'T6',
        url: '',
        icon: ''
      },
      {
        name: 'T7',
        url: '',
        icon: ''
      },
      {
        name: 'T8',
        url: '',
        icon: ''
      },
      {
        name: 'T9',
        url: '',
        icon: ''
      }
    ]  
  },
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    that.setData({
      host: host,
      com_id: options.com_id,
      user_id: user_id
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getDetail();
      },
    })

    app.func.req('get_product', { user_id: that.data.user_id }, 'GET', function (res) {
      console.log("20200288 res", res);
      that.setData({
        productList: res
      })
    });








  },

  // 20200213 start


  getDetail: function () {
    var that = this;
    // app.func.req('my_company_show', {id: that.data.com_id }, 'GET', function (res) {
    app.func.req('my_company_show/' + that.data.com_id, {}, 'GET', function (res) {
      console.log("20200213res", res);
      that.setData({
        items: res,
        com_img: res.com_img
      })
    });
  },


  getIn: function () {
    var that = this;
    app.func.req('my_company_job/' + that.data.com_id, {}, 'GET', function (res) {
      console.log("20200213res", res);
      that.setData({
        inList: res
      })
    });
  },
  // 20200213 end

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
        that.getDetail();
      } else {
        that.getIn();
      }
    }
  },
  masterPost: function (e) {
    var that = this;
    that.setData({
      currentTab: 1
    })
  },
  // 单个操作
  listenerButton: function (e) {
    var that = this;
    var arr = that.data.inList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].in_id == e.currentTarget.dataset.inid) {
        if (arr[i].collect == 0) {
          that.inCollect(["收藏"], e.currentTarget.dataset.inid);
        } else if (arr[i].collect == 1) {
          that.inCollect(["取消收藏"], e.currentTarget.dataset.inid);
        }
      }
    }
  },
  // 内容精选收藏
  inCollect: function (item, coll_good_id) {
    var that = this;
    wx.showActionSheet({
      itemList: item,//显示的列表项
      itemColor: '#000000',
      success: function (res) {
        if (res.tapIndex === 0) {
          app.func.req('collect', { coll_type: 1, coll_user_id: that.data.openid, coll_good_id: coll_good_id }, 'POST', function (res) {
            // console.log(res);
            if (res.code == 200) {
              that.getIn();
            }
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  // 关注/取消
  focus: function (e) {
    var that = this;
    app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: that.data.user_id }, 'POST', function (res) {
      // console.log(res);
      that.getDetail();
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