
// var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    name: '',
    phone: '',
    code: '',
    second: 60,
    old_id: 0
  },

  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host,
      old_id: options.old_id,
      user_id: options.user_id,
      // 20200329 liao add start
      // 20200329 liao add start
      job_id: options.job_id,
      job_name: options.job_name,
      job_salary: options.job_salary,
      job_county: options.job_county,
      job_address: options.job_address
// 20200329 liao add end
      // 20200329 liao add end
    });
    console.log("job_name", that.data.job_name);
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        });
      }
    });
  },

  //姓名输入
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  //手机号输入
  bindPhoneInput(e) {
    console.log(e.detail.value);
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },

  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  //获取短信验证码
  getCode(e) {
    console.log('获取验证码');
    var that = this;
    // zhenzisms.client.init('https://sms_developer.zhenzikj.com', 'appId', 'appSecret');
    // zhenzisms.client.send(function (res) {
    //   if (res.data.code == 0) {
    //     that.timer();
    //     return;
    //   }
    app.func.req('send_sms/' + that.data.phone, {}, 'GET', function (res) {
      console.log("20200315", res);
      if (res != "400") {
        console.log("20200315A");
        that.setData({
          verfity_code: res
        });
        that.timer();
        return;
      }
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    });

  },

  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  //保存
  formSubmit(e) {
    var that = this;
    var myreg = /^1\d{10}$/;
    console.log('姓名: ' + that.data.name);
    console.log('手机号: ' + that.data.phone);
    console.log('验证码: ' + that.data.code);
    if (e.detail.value.user_name.length <= 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
    } else if (!myreg.test(e.detail.value.user_phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if 
     (that.data.verfity_code != that.data.code) {
      wx.showToast({
        title: "验证码错误",
        icon: 'none',
        duration: 2000
      });
    } else {
      // console.log('20200313A' + that.data.old_id);
      // 预约课程并且未验证点击过来
      if (that.data.old_id != 0){
        app.func.req('update_user', {
          user_id: that.data.user_id,
          user_name: that.data.name,
          user_phone: that.data.phone,
          user_phone_check: 1,
          openid: that.data.openid,
        }, 'POST', function (res) {
          if (res.code == 200) {
            // 20200320 start
            // app.func.req('new_reserve_course', { openid: that.data.openid, bok_name: that.data.name, bok_mobile: that.data.phone, bok_user_id: that.data.user_id, }, 'POST', function (res) {
            app.func.req('new_reserve_course', { openid: that.data.openid, old_id: that.data.old_id, bok_name: that.data.name, bok_mobile: that.data.phone, bok_user_id: that.data.user_id, }, 'POST', function (res) {
              // 20200320 end
              if (res.code == 200) {
                wx.setStorage({
                  key: 'index_user_info',
                  data: {
                    user_id: that.data.user_id,
                    user_phone_check: 1
                  }, 
                  success: function (res) {
                    that.setData({
                      bok_id: res.bok_id
                    });
                    wx.navigateTo({
                      url: '../index/transaction/buy/reserve-success?old_id' + that.data.old_id + '&bok_id=' + that.data.bok_id,
                    });
                  },
                });
              }
            });
         }
       })
        
      }
      // 20200329 liao add start 申请职位调用过来的
      else if (that.data.job_id != 0)
      {
        console.log("20200329 app-job");
        app.func.req('update_user', {
          user_id: that.data.user_id,
          user_name: that.data.name,
          user_phone: that.data.phone,
          user_phone_check: 1,
          openid: that.data.openid,
        }, 'POST', function (res) {
          if (res.code == 200) {
            wx.setStorage({
              key: 'index_user_info',
              data: {
                user_id: that.data.user_id,
                user_phone_check: 1
              },
              success: function (res) {
                wx.navigateTo({
                  url: '../company/company-show/app-job/app-job?job_id=' + that.data.job_id + '&job_name=' + that.data.job_name + '&job_salary=' + that.data.job_salary + '&job_county=' + that.data.job_county + '&job_address=' + that.data.job_address,
                });
              },
            })
          }
        })
      }
      // 20200329 liao add end
      else 
      {
         //点我的未验证点击过来
        app.func.req('update_user', {
          user_id: that.data.user_id,
          user_name: that.data.name,
          user_phone: that.data.phone,
          user_phone_check: 1,
          openid: that.data.openid,
        }, 'POST', function (res) {
          if (res.code == 200) {
            wx.setStorage({
              key: 'index_user_info',
              data: {
                user_id: that.data.user_id,
                user_phone_check: 1
              },
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })
      };
    }
  }
})