// pages/index/master/master-home/master-home.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

// 20200319 liao add start
  /**
   * 页面的初始数据
   */
  // data: {
  //   currentTab: 0
  // },
    data: {
      currentTab: 0,
      list: [{
        id: 'view',
        name: '机器人概述',
        open: false,
        pages: ['认识机器人', '机器人应用范围', '机器人操作指南']
    }, {
      id: 'content',
      name: '工具坐标系原点',
      open: false,
          pages: ['坐标系原点原理', '坐标系原点分析']
}, {
    id: 'form',
    name: '工作机器人坐标',
    open: false,
          pages: ['认识坐标系', '坐标系基本原理', '坐标系实习指南']
  }]
  },
// 20200319 liao add end
  /**
   * 收缩核心代码
   */
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for(let i = 0, len = list.length; i<len; ++i) {
  if (list[i].id === id) {
    list[i].open = !list[i].open
  } else {
    list[i].open = false
  }
}

/**
 * key和value名称一样时，可以省略
 * 
 * list:list=>list
 */
this.setData({
  list
})
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      lsm_id: options.lsm_id
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
  },


  getDetail: function () {
    var that = this;
    app.func.req('get_videos_chapter/' + that.data.lsm_id, {}, 'GET', function (res) {
      if (res) {
        that.setData({
          items: res,
          teacher_id: res.lsm_teacher_id
        });
        that.getTeacherCourse();
      }
    });
  },
  // 20200213 end

  // 20203019 liao add start
  getTeacherCourse: function () {
    var that = this;
    console.log("20200213getTeacherCourse", that.data.teacher_id);
    app.func.req('get_videos_main', { user_id: 0, teacher_id: that.data.teacher_id }, 'GET', function (res) {
      console.log("20200319videos_main res", res);
      that.setData({
        videosMainList: res
      })
    });
  },
    // 20200319 liao add end

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
      // 20200319 liao start
        // that.getIn();
      // 20200319 liao end
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
              // 20200319 liao start
              // that.getIn();
              // 20200319 liao end
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