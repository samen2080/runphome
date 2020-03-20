// pages/mine/my-book/my-book.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teaList: [],
    num: 0,
    hidden: true,
    bok_delete_ind: 0
  },

  // 查看详情
  showOldPage: function (e) {
    var that = this;
    console.log("20200320A", e.currentTarget.dataset.old_id)
    wx.navigateTo({
      url: '../product-show/product-show?pro_id=' + e.currentTarget.dataset.old_id,
    })
  },

  onLoad: function (options) {
    console.log("onload");
    var that = this;
    var host = app.globalData.host;
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        that.setData({
          user_id: res.data.user_id
        });
        that.getMyBook();
      },
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    });
    that.setData({
      host: host
    });
  },

  getMyBook: function () {
    var that = this;
    console.log("20200320that.data.user_id", that.data.user_id);
    app.func.req('my_book', { user_id: that.data.user_id }, 'GET', function (res) {
      console.log("20200320res", res);
      that.setData({
        items: res,
      })
    });
  },

  // 20200321 liao add start
  // 取消报名/删除报名
  removeBok: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var bok_id = e.currentTarget.dataset.bok_id;
    that.setData({
      num: index,
      hidden: false,
      bok_id: bok_id
    })
    if (index == 0) {
      that.setData({
        txt: "确定要取消吗？"
      })
    } else if (index == 1) {
      that.setData({
        txt: "确定要删除吗？"
      })
    }
  },

  // 再想想
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 确定
  removeSure: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    console.log("20200321", that.data.bok_id)
    if (num == 0) {
      app.func.req('update_reserve', { openid: that.data.openid, bok_id: that.data.bok_id, bok_delete_ind: 1 }, 'POST', function (res) {
        if (res.code == 200) {
          that.setData({
            hidden: true,
            cancel: true
          })
          that.getMyBook();
        }
      });
    }
  },

  rebook: function (e) {
    var that = this;
    console.log("20200319old_id", e.currentTarget.dataset.old_id);
    console.log("20200319bok_id", e.currentTarget.dataset.bok_id);
    app.func.req('update_reserve', { openid: that.data.openid, bok_id: e.currentTarget.dataset.bok_id, bok_delete_ind: 0 }, 'POST', function (res) {
      if (res.code == 200) {
          that.getMyBook();
      }
    });
  },
  // 20200321 liao add end

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    console.log("onshow");
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