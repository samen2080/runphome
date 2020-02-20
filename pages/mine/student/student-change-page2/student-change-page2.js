const app = getApp()
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '请选择',
    dateColor: '#999999',
    stu_current_province: "",
    stu_current_city: "",
    stu_current_county: '',
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
      console.log('stu_current_province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        stu_current_province: this.data.provinces[val[0]],
        stu_current_city: cityData[val[0]].sub[0].name,
        citys: citys,
        stu_current_county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('stu_current_city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        stu_current_city: this.data.citys[val[1]],
        stu_current_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('stu_current_county no');
      this.setData({
        stu_current_county: this.data.countys[val[2]],
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
    console.log('stu_current_city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      host: host,
      user_id: user_id,
      user_identity: user_identity,
      stu_current_province: that.data.stu_current_province,
      stu_current_city: that.data.stu_current_city,
      stu_current_county: that.data.stu_current_county,
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
        app.func.req('get_student', { user_id: that.data.user_id }, 'GET', function (res) {
          // console.log(res);
          that.setData({
            userInfo: res
            // user_headimg: res.user_headimg
          })
          if (res.stu_sex == 1) {
            that.setData({
              id: 0
            })
          } else if (res.stu_sex == 2) {
            that.setData({
              id: 1
            })
          }
          if (res.user_birthday != '') {
            that.setData({
              // 20200213 start
              //dates: res.user_birthday,
              dates: res.stu_birthday,
              // 20200213 end
              dateColor: '#000000'
            })
          }
        });
      },
    })
  },

  // 保存
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.stu_political_status.length <= 0) {
      wx.showToast({
        title: '政治面貌不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_speciality.length <= 0) {
      wx.showToast({
        title: '特长不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_emergency_contact_name.length <= 0) {
      wx.showToast({
        title: '紧急联系人不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_emergency_contact_num.length <= 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.stu_current_province.length <= 0) {
      wx.showToast({
        title: '现住区域不能为空!',
        icon: 'none'
      })
    }
    else if (e.detail.value.stu_current_address.length <= 0) {
      wx.showToast({
        title: '现住地址不能为空!',
        icon: 'none'
      })
    }
    else {
      console.log("======20191113======")
      wx.setStorage({
        key: 'student_change_page2_data',
        data: {
          stu_political_status: e.detail.value.stu_political_status,
          stu_speciality: e.detail.value.stu_speciality,
          stu_emergency_contact_name: e.detail.value.stu_emergency_contact_name,
          stu_emergency_contact_num: e.detail.value.stu_emergency_contact_num,
          stu_current_province: that.data.stu_current_province,
          stu_current_city: that.data.stu_current_city,
          stu_current_county: that.data.stu_current_county,
          stu_current_address: e.detail.value.stu_current_address,
        },
        success: function (res) {
          wx.navigateTo({
            url: '../student-change-page3/student-change-page3',
          })
        },
      })
    }
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