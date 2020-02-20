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
      stu_id:options.stu_id,
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
    if (e.detail.value.stu_name.length <= 0) {
      wx.showToast({
        title: '姓名不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_phone.length <= 0) {
      wx.showToast({
        title: '联系电话不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_email_address.length <= 0) {
      wx.showToast({
        title: '邮件地址不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_wetchat_id.length <= 0) {
      wx.showToast({
        title: '微信号不能为空!',
        icon: 'none'
      })
    } else if (that.data.stu_residence_province.length <= 0) {
      wx.showToast({
        title: '户口区域不能为空!',
        icon: 'none'
      })
    } 
    else if (e.detail.value.stu_residence.length <= 0) {
      wx.showToast({
        title: '户口地址不能为空!',
        icon: 'none'
      })
    } 
    else {
      console.log("======20191113======")
      wx.setStorage({
        key: 'student_change_page1_data',
        data: {
          stu_id: that.data.stu_id,
          stu_name: e.detail.value.stu_name,        
          stu_phone: e.detail.value.stu_phone,
          stu_email_address: e.detail.value.stu_email_address,
          stu_wetchat_id: e.detail.value.stu_wetchat_id,
          stu_residence_province: that.data.stu_residence_province,
          stu_residence_city: that.data.stu_residence_city,
          stu_residence_county: that.data.stu_residence_county,
          stu_residence: e.detail.value.stu_residence,
        },
        success: function (res) {
          wx.navigateTo({
            url: '../student-change-page2/student-change-page2',
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