// pages/mine/mine.js
const app = getApp()
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInShow : 'none',
    hydl: false,
    // 20200213 add start
    roleChooseShow: true,
    loginInShow: false,
    user_identity: 0,
    // 20200213 add end
    onShowCall: 0,
    user_phone_check: false
    // isSign: false
  },

  signIn:function(e){
    var that = this;
    app.func.req('checkin', { openid: that.data.openid }, 'POST', function (res) {
      // console.log(res);
      if(res.code == 200){
        that.setData({
          signInShow: 'block',
          day: res.day
        })
        that.getUser();
      } else if (res.code == 40004) {
        wx.showToast({
          title: '不能重复签到哦~',
          icon: 'none'
        })
      }
    });    
  },

  // 20200213 add start
  roleSwitch: function (e) {
    var that = this;
    var user_id = wx.getStorageSync("user_info").user_id;
    wx.navigateTo({
      url: 'login-role-choose/login-role-choose?user_id=' + user_id,
    })
  },
  // 20200213 add end
  verify: function (e) {
    var that = this;
    var user_id = wx.getStorageSync("user_info").user_id;
    var old_id = 0;
    wx.navigateTo({
      url: '../log-in/log-in?user_id=' + user_id + '&old_id=' + old_id + '&user_id=' + user_id,
    });
    that.setData({
      user_phone_check: true,
    }); 
  },
  // 20200318 start
  unlock: function (e) {
    var that = this;
    var user_id = wx.getStorageSync("user_info").user_id;
    app.func.req('update_user_phone_check', {
      user_id: user_id
    }, 'POST', function (res) {
      if (res.code == 200) {
        that.setData({
          user_phone_check: !that.data.user_phone_check,
        }) 
      }
    });
    
  },
  // 20200318 end
  closeSignIn: function (e) {
    var that = this;
    that.setData({
      signInShow: 'none',
      // isSign: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this);  
    // 20200213 add start
    this.changeData();
    // 20200213 add end
    var user_identity = wx.getStorageSync("user_info").user_identity;
    console.log("20200213user_identity", user_identity);
    this.setData({
      user_identity: user_identity
    });
    // 20200316 add start
    this.setData({
      old_id: options.old_id
    });
    // 20200316 add end
  },

   getUser: function () {
    var that = this;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    var user_id = wx.getStorageSync("user_info").user_id;
     console.log("getUserRoutine");
     console.log("20200213user_id", user_id);
    app.func.req('get_user', { openid: that.data.openid }, 'GET', function (res) {
      console.log("20200213user_identity",that.data.user_identity);
      that.setData({
        userInfo: res,
        user_identity: user_identity
      })
    });

     app.func.req('get_school', { user_id: user_id }, 'GET', function (res) {
       console.log("20200213res", res);
       that.setData({
         items: res
       })
       wx.setStorage({
         key: 'school_data',
         data: {
           sch_id: res.sch_id
         },
       })
     });
     
     app.func.req('get_teacher2', { user_id: user_id }, 'GET', function (res) {
       console.log("20200213res", res);
       that.setData({
         items: res
       })
       wx.setStorage({
         key: 'teacher_data',
         data: {
           tea_id: res.tea_id
         },
       })
     });
     
     app.func.req('get_company', { user_id: user_id }, 'GET', function (res) {
       console.log("20200213companyInfo", res);
       that.setData({
         companyInfo: res,
       })
       wx.setStorage({
         key: 'company_data',
         data: {
           com_id: res.com_id
         },
       })
     });

     app.func.req('get_student', { user_id: user_id }, 'GET', function (res) {
       console.log("20200213companyInfo", res);
       that.setData({
         companyInfo: res,
       })
       wx.setStorage({
         key: 'student_data',
         data: {
           stu_id: res.stu_id
         },
       })
     });
  },
  //20200109 系统升级为符合微信登录条件根据微信官方20190901文件 start
  // bindGetUserInfo: function (e) {
  //   console.log("20200109 bindGetUserInfo");
  //   var that = this;
  //   let openid = wx.getStorageSync('openid');
  //   if (e.detail.userInfo) {
  //     wx.setStorage({
  //       key: 'userInfo',
  //       data: e.detail.userInfo,
  //       success: function () {
  //         console.log("openid", that.data.openid);
  //         app.func.req('login', { openid: openid, user_headimg: e.detail.userInfo.avatarUrl, user_nickname: e.detail.userInfo.nickName, user_sex: e.detail.userInfo.gender }, 'POST', function (res) {
  //           // console.log("login.res", res)
  //           if (res.code == 200) {
  //             that.canIUse = false;
  //             console.log("用户信息res:", res);
  //           }
  //         });
  //       }
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '请先授权登录！',
  //       icon: 'none'
  //     })
  //   }
  // },
  bindGetUserInfo: function (t) {
    console.log("20200109 t:", t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
      hydl: !1
    }), this.changeData());
  },

  changeData: function () {
    var that = this;
    let openid = wx.getStorageSync('openid');
    // 20200213 add start
    let role_type = wx.getStorageSync('login_role');
    // 20200213 add end
    wx.getSetting({
      success: function (t) {
        console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function (t) {
            console.log(t), 
            // 20200213 add start
              app.func.req('login', { openid: openid, user_headimg: t.userInfo.avatarUrl, user_nickname: t.userInfo.nickName, user_sex: t.userInfo.gender, user_identity: role_type.role_type }, 'POST', function (res) {
            // app.func.req('login', { openid: openid, user_headimg: t.userInfo.avatarUrl, user_nickname: t.userInfo.nickName, user_sex: t.userInfo.gender }, 'POST', function (res) {
            // 20200213 add end
                if (res.code == 200) {
                  //20200318 start
                  //wx.setStorage({
                   // key: 'user_info',
                    //   data: {
                    //   user_identity: res.user_identity,
                    //   user_id: res.user_id,
                    //   user_phone_check: res.user_phone_check,
                    // },
                  console.log("20200318userPhoneCheck", res.user_phone_check);
                  if (res.user_phone_check == 0) {
                    that.setData({
                      user_phone_check: false
                    })
                  } else {
                    that.setData({
                      user_phone_check: true
                    })
                  };
                  wx.setStorage({
                    key: 'user_info',
                     data: { 
                       user_identity: res.user_identity,
                       user_id: res.user_id,
                      },
                  // 20200318 start end

                    success: function () {
                       //n.getUser(); 从onshow方法剪贴过来，实现img, nickname 从无到有的变化
                        console.log("20200316changedata");
                        that.getUser();
                      //  20200316 add start
                      console.log("20200213old_id", that.data.old_id);
                      if (that.data.old_id != null) {
                          var user_id = wx.getStorageSync("user_info").user_id;
                          wx.navigateTo({
                            url: '../log-in/log-in?old_id=' + that.data.old_id + '&user_id=' + user_id
                          })
                      };
                         // 20200316 add end
                    }
                  })
                  //20200213 end
                }
              });
          }
        }) : (console.log("未授权过"), that.setData({
          hydl: !0
        }));
      }
    });
  },

  // 20200213 add start
  loginRoleChoose: function () {
    console.log("20200213");
    wx.navigateTo({
      url: 'login-role-choose/login-role-choose',
    })
  },
    // 20200213 add end
//20200109 系统升级为符合微信登录条件根据微信官方20190901文件 end

  // getUser: function () {
  //   var that = this;
  //   app.func.req('get_user', { openid: that.data.openid }, 'GET', function (res) {
  //     // console.log(res);
  //     that.setData({
  //       userInfo: res
  //     })
  //   });
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // 20200316 add start
    that.setData({
      onShowCall: 1
    }); 
    //20200316 add end
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        
      },
      fail: function () {
        wx.redirectTo({
          url: '../start/start',
        })
      }
    });
    //  20200213 add start
    console.log("20200213 1.1");
    let role_type = wx.getStorageSync('login_role');
    if (role_type.role_type != null) {
      console.log("20200213 1.2");
      that.setData({
        roleChooseShow: false,
        loginInShow: true
      })
    };
  
    that.getUser();
    //  20200213 add end
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