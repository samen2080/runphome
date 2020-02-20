// pages/start/start.js
var http = require('../../utils/config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("onload===")
    console.log(http.hostUrl)
    that.appLogin();
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log("res1", res)
    //           var objz = {};
    //           objz.avatarUrl = res.userInfo.avatarUrl;
    //           objz.nickName = res.userInfo.nickName;
    //           console.log("objz", objz);
    //           wx.setStorageSync('userInfo', objz);//存储userInfo
    //         },
    //         fail: function (res) {
    //           console.log("res", res)
    //         }
    //       });
    //      // console.log('app', app)
    //       var d = app.globalData;//这里存储了appid、secret、token串  

    //       var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
    //       console.log("d", l)
    //       wx.request({
    //         url: l,
    //         data: {},
    //         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    //         // header: {}, // 设置请求的 header  
    //         success: function (res) {
    //           console.log("res", res)
    //           var obj = {};
    //           obj.openid = res.data.openid;
    //           console.log(res.data.openid);
    //           obj.expires_in = Date.now() + res.data.expires_in;
    //           //console.log(obj);
    //           wx.setStorageSync('openid', obj);//存储openid  
    //           wx.setStorage({
    //             key: 'openid',
    //             data: obj.openid,
    //           })
    //         }
    //       });
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
  },

  //20200109 系统升级为符合微信登录条件根据微信官方20190901文件 start
  redirectIndex: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  //20200109 系统升级为符合微信登录条件根据微信官方20190901文件 end

  appLogin: function () {
    wx.login({
      success(res) {
        if (res.code) {
          console.log("login success", app.globalData.host + '/home/get_openid')
          console.log("20200109 login res.code:", res.code)
          wx.request({
            url: app.globalData.host + '/home/get_openid',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log("20200109 login.res", res)
              var obj = {};
              obj.openid = res.data.openid;
              //console.log("openid",res.data.openid);
              obj.expires_in = Date.now() + res.data.expires_in;
              //console.log(obj);
              wx.setStorageSync('openid', obj.openid);//存储openid  
              wx.setStorage({
                key: 'openid',
                data: obj.openid,
              })
            }
          })
        } else {
          console.log("login failed" + res.errMsg)
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    console.log("20200109 bindGetUserInfo");
    var that = this;
    let openid = wx.getStorageSync('openid');
    if (e.detail.userInfo) {
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
        success: function () {
          console.log("openid", that.data.openid);
          app.func.req('login', { openid: openid, user_headimg: e.detail.userInfo.avatarUrl, user_nickname: e.detail.userInfo.nickName, user_sex: e.detail.userInfo.gender }, 'POST', function (res) {
            //20200213 start
            // console.log("login.res", res)
            // if (res.code == 200) {
            //   wx.redirectTo({
            //     url: '../index/index',
            //   })
            // }
            if (res.code == 200) {
              wx.setStorage({
                key: 'user_info',
                data: {
                  user_identity: res.user_identity,
                  user_id: res.user_id
                },
                success: function () {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            }
            //20200213 end
          });
        }
      })
    } else {
      wx.showToast({
        title: '请先授权登录！',
        icon: 'none'
      })
    }
  },

  onLaunch: function () {

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