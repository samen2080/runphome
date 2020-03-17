// pages/index/transaction/transaction.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        text: '全部'
      },
      {
        text: '推荐课程'
      },
      {
        text: '名师课程'
      },
      {
        text: '限免课程'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getGoods();
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    }) 
  },
  // 获取数据
  getGoods:function(){
    var that = this;
    app.func.req('old_goods', { pageSize: 100, page: 1, old_type: that.data.currentTab, openid: that.data.openid }, 'GET', function (res) {
       console.log("20200317",res);
      var sheight = 704 * Math.ceil(res.length / 2);
      that.setData({
        proList: res,
        sheight: sheight
      })
    });
  },

  // 搜索
  formSubmit: function (e) {
    var that = this;
    that.search(e.detail.value.search);
  },
  bindconfirm: function (e) {
    var that = this;
    that.search(e.detail.value);
  },
  search: function (goods_name) {
    var that = this;
    if (goods_name.length <= 0){
      that.getGoods();
    } else {
      app.func.req('search_goods', { goods_name: goods_name, openid: that.data.openid }, 'GET', function (res) {
        // console.log(res);
        var sheight = 704 * Math.ceil(res.length / 2);
        that.setData({
          proList: res,
          sheight: sheight
        })
      });
    }    
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
    that.getGoods();
  },
  // 收藏
  collect: function (e) {
    var that = this;
    app.func.req('collect', { coll_type: 2, coll_user_id: that.data.openid, coll_good_id: e.currentTarget.dataset.collid }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getGoods();
      }
    });
  },

  // 20200318 add start
  reserve: function (e) {
    var that = this;
    var user_id = wx.getStorageSync("index_user_info").user_id;
    var user_name = wx.getStorageSync("index_user_info").user_name;
    var user_phone = wx.getStorageSync("index_user_info").user_phone;
    var user_phone_check = wx.getStorageSync("index_user_info").user_phone_check;
    if (user_id == null) {
      wx.navigateTo({
        url: '../../mine/mine?old_id=' + e.currentTarget.dataset.proid
      })
    } else {
      if (user_phone_check == 0) {
        wx.navigateTo({
          url: '../../log-in/log-in?old_id=' + e.currentTarget.dataset.proid + '&user_id=' + user_id
        })
      } else {
        app.func.req('reserve_course', { openid: that.data.openid, bok_name: user_name, bok_mobile: user_phone, bok_user_id: user_id, }, 'POST', function (res) {
          if (res.code == 200) {
            wx.navigateTo({
              url: 'buy/reserve-success?old_id=' + e.currentTarget.dataset.proid + '&user_id=' + user_id,
            })
          }
        });
      }

    }
  },
  // 20200318 add end
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