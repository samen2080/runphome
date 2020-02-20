const app = getApp()
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '请选择',
    dateColor: '#999999',
    stu_home_province: "",
    stu_home_city: "",
    stu_home_county: '',
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
      console.log('stu_home_province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        stu_home_province: this.data.provinces[val[0]],
        stu_home_city: cityData[val[0]].sub[0].name,
        citys: citys,
        stu_home_county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('stu_home_city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        stu_home_city: this.data.citys[val[1]],
        stu_home_county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('stu_home_county no');
      this.setData({
        stu_home_county: this.data.countys[val[2]],
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
    console.log('stu_home_city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      host: host,
      user_id: user_id,
      user_identity: user_identity,
      stu_home_province: that.data.stu_home_province,
      stu_home_city: that.data.stu_home_city,
      stu_home_county: that.data.stu_home_county,
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
    var stu_id = wx.getStorageSync("student_change_page1_data").stu_id;
    var stu_name = wx.getStorageSync("student_change_page1_data").stu_name;
    var stu_phone = wx.getStorageSync("student_change_page1_data").stu_phone;
    var stu_email_address = wx.getStorageSync("student_change_page1_data").stu_email_address;
    var stu_wetchat_id = wx.getStorageSync("student_change_page1_data").stu_wetchat_id;
    var stu_residence_province = wx.getStorageSync("student_change_page1_data").stu_residence_province;
    var stu_residence_city = wx.getStorageSync("student_change_page1_data").stu_residence_city;
    var stu_residence_county = wx.getStorageSync("student_change_page1_data").stu_residence_county;
    var stu_residence = wx.getStorageSync("student_change_page1_data").stu_residence;
   
    var stu_political_status = wx.getStorageSync("student_change_page2_data").stu_political_status;
    var stu_speciality = wx.getStorageSync("student_change_page2_data").stu_speciality;
    var stu_emergency_contact_name = wx.getStorageSync("student_change_page2_data").stu_emergency_contact_name;
    var stu_emergency_contact_num = wx.getStorageSync("student_change_page2_data").stu_emergency_contact_num;
    var stu_current_province = wx.getStorageSync("student_change_page2_data").stu_current_province;
    var stu_current_city = wx.getStorageSync("student_change_page2_data").stu_current_city;
    var stu_current_county = wx.getStorageSync("student_change_page2_data").stu_current_county;
    var stu_current_address = wx.getStorageSync("student_change_page2_data").stu_current_address;
    
    if (e.detail.value.stu_health_ind.length <= 0) {
      wx.showToast({
        title: '健康状况不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_family_member_name.length <= 0) {
      wx.showToast({
        title: '家庭成员不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_family_member_rel.length <= 0) {
      wx.showToast({
        title: '关系不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_familiy_member_phone.length <= 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.stu_home_province.length <= 0) {
      wx.showToast({
        title: '家庭区域不能为空!',
        icon: 'none'
      })
    }
    else if (e.detail.value.stu_home_address.length <= 0) {
      wx.showToast({
        title: '家庭地址不能为空!',
        icon: 'none'
      })
    }
    else {
      app.func.req('update_student', {
        stu_id: stu_id,
        stu_name: stu_name,
        stu_phone: stu_phone,
        stu_email_address: stu_email_address,
        stu_wetchat_id: stu_wetchat_id,
        stu_residence_province: stu_residence_province,
        stu_residence_city: stu_residence_city,
        stu_residence_county: stu_residence_county,
        stu_residence: stu_residence,

        stu_political_status: stu_political_status,
        stu_speciality: stu_speciality,
        stu_emergency_contact_name: stu_emergency_contact_name,
        stu_emergency_contact_num: stu_emergency_contact_num,
        stu_current_province: stu_current_province,
        stu_current_city: stu_current_city,
        stu_current_county: stu_current_county,
        stu_current_address: stu_current_address,

          stu_health_ind: e.detail.value.stu_health_ind,
          stu_family_member_name: e.detail.value.stu_family_member_name,
          stu_family_member_rel: e.detail.value.stu_family_member_rel,
          stu_familiy_member_phone: e.detail.value.stu_familiy_member_phone,
          stu_home_province: that.data.stu_home_province,
          stu_home_city: that.data.stu_home_city,
          stu_home_county: that.data.stu_home_county,
          stu_home_address: e.detail.value.stu_home_address}, 'POST', function (res) {
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