// pages/index/master/master-home/master-home.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },
  // 申请职位
  apply: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;

    that.setData({
      job_name: e.currentTarget.dataset.i.job_name,
      job_salary: e.currentTarget.dataset.i.job_salary,
      job_county: e.currentTarget.dataset.i.job_county,
      job_address: e.currentTarget.dataset.i.job_address,
      job_id: e.currentTarget.dataset.job_id
    });

    that.getResume();
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
    console.log("20200213options.com_id", options.com_id);
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
   // app.func.req('my_company_show', {id: that.data.com_id }, 'GET', function (res) {
    console.log("20200213 that.data.com_id", that.data.com_id);
    app.func.req('my_company_show/' + that.data.com_id, {}, 'GET', function (res) {
      that.setData({
        items: res,
        com_img: res.com_img
      })
    });
  },

  getResume: function () {
    var that = this;
    app.func.req('get_resume', { user_id:that.data.user_id }, 'GET', function (res) {
      console.log("20200213resumeInfos", that.data.jobid);
      console.log("20200213res_id", res.res_id);
      wx.navigateTo({
        url: 'app-job/app-job?job_id=' + that.data.job_id + '&job_name=' + that.data.job_name + '&job_salary=' + that.data.job_salary + '&job_county=' + that.data.job_county + '&job_address=' + that.data.job_address + '&res_id=' + res.res_id,
      })
    });
  },
  

  getIn: function () {
    var that = this;
    app.func.req('my_company_job/' + that.data.com_id, {}, 'GET', function (res) {
      console.log("20200214res", res.job_address);
      that.setData({
        inList: res,
      })
      // wx.setStorage({
      //   key: 'companyJob_data',
      //   data: {
      //     job_id: res.job_id,
      //     job_name: res.job_name,
      //     job_salary: res.job_salary,
      //     job_county: res.job_county,
      //     job_address: res.data.job_address,
      //   },
      // })
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