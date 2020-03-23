// pages/mine/my-resume/resume-change-page/resume-change-page.js
const app = getApp()
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '请选择',
    dateColor: '#999999',
    stu_id: 0,
    stu_residence_province: "",
    stu_residence_city: "",
    stu_residence_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true
  },
  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('stu_residence_province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        stu_residence_province: this.data.provinces[val[0]],
        stu_residence_city: cityData[val[0]].sub[0].name,
        citys: citys,
        stu_residence_county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('stu_residence_city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        stu_residence_city: this.data.citys[val[1]],
        stu_residence_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('stu_residence_county no');
      this.setData({
        stu_residence_county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  open: function () {
    console.log("20200118===open")
    this.setData({
      condition: !this.data.condition
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var host = app.globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    var user_identity = wx.getStorageSync("user_info").user_identity;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('stu_residence_city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    console.log("20200213stu_id", options.stu_id);
    that.setData({
      host: host,
      res_id: options.res_id,
      apj_id: options.apj_id,
      user_id: user_id,
      user_identity: user_identity,
      stu_residence_province: that.data.stu_residence_province,
      stu_residence_city: that.data.stu_residence_city,
      stu_residence_county: that.data.stu_residence_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
    })

    wx.getStorage({
      key: 'openid',

      success: function (res) {
        that.setData({
          openid: res.data
        })
        app.func.req('my_resume', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200213res", res);
          that.setData({
            userInfo: res
          })
        });
        app.func.req('get_apply_job', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200213res", res);
          that.setData({
            applyInfo: res
          })
        });
        app.func.req('my_eduExp', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200213res", res);
          that.setData({
            eduInfo: res
          })
        });
        app.func.req('my_workExp', { user_id: that.data.user_id }, 'GET', function (res) {
          console.log("20200213res", res);
          that.setData({
            workInfo: res
          })
        });
      },
    })
  },

  // 保存
  formSubmit: function (e) {
    var that = this;
    app.func.req('update_myresume', {
      res_id:that.data.res_id,
      res_user_name: e.detail.value.user_name,
      res_work_years: e.detail.value.work_years,
      res_intro: e.detail.value.intro,
      res_skills: e.detail.value.skills,

    }, 'POST', function (res) {
      if (res.code == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../../mine',
              })
            }, 2000);
          }

        })
      }
      });
   
    app.func.req('update_apply_job', {
      apj_id: that.data.apj_id,
      apj_user_mobile: e.detail.value.user_mobile,

    }, 'POST', function (res) {

      // console.log(res);
      if (res.code == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../../mine',
              })
            }, 2000);
          }

        })
      }

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