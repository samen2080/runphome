const app = getApp()
var tcity = require("../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_birthday: '请选择',
    stu_birthday: 0,
    img_arr: [],
    address_img: '',
    upHidden: false,
    // 2020/1/21 start
    stu_current_province: "",
    stu_current_city: "",
    stu_current_county: '',
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true,
    // 2020/1/21 end
    selectArray: [{
      "id": "1",
      "text": "身份证"
    }, {
      "id": "2",
      "text": "其他"
    }]
  },
  getData: function (e) {
    console.log('20200202=== e:', e);
    console.log('20200131=== e.detail.id:', e.detail.id);
    console.log('20200131=== e.detail.text:', e.detail.text);
    this.setData({
      stu_pin_type: e.detail.id
    })
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      stu_birthday: e.detail.value,
      dateColor: '#000000'
    })
  },
  // 2020/1/21 start
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
  //20200131 添加 start
  genderSelect: function (e) {
    this.setData({
      id: e.target.dataset.id
    })
  },
  //20200131 end

  // 2020/1/21 start
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    // 2020 / 1 / 21 start
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
    // 2020 / 1 / 21 end
    that.setData({
      host: host,
      stu_user_id: user_id,
      // 2020/1/21 start
      stu_current_province: that.data.stu_current_province,
      stu_current_city: that.data.stu_current_city,
      stu_current_county: that.data.stu_current_county,
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      // 2020/1/21 end

    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
  },
  // 上传图片
  //=================================upload photo start 20191104
  uploadpic: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (ress) {
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
          console.log("==========="),
          console.log(that.data.host),
          console.log(ress.tempFilePaths[0]),
          wx.uploadFile({
            //url: app.siteurl + '/index.php?m=api&c=index&v=uploadpic', 
            url: that.data.host + '/upload_files/house',
            filePath: ress.tempFilePaths[0],
            name: 'house',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              'appkey': app.appkey
            },
            success: function (res) {
              if (res.statusCode == 200) {
                console.log("=====20191108===res");
                console.log(res);

                var img_arr = JSON.parse(res.data);
                that.setData({
                  address_img: that.data.img_arr.concat(img_arr[0]),
                  upHidden: true
                })
                console.log(that.data.address_img)
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            },
            complete: function () {
              wx.hideToast();
            }
          })
      }
    })
  },
  //=================================upload photo end 20191104
  // 取消
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 发布
  formSubmit: function (e) {
    var that = this;
    if (that.data.stu_pin_type == null) {
      wx.showToast({
        title: '证件类型不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_pin_code.length <= 0) {
      wx.showToast({
        title: '身份证号不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_speciality.length <= 0) {
      wx.showToast({
        title: '特长不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_health_ind.length <= 0) {
      wx.showToast({
        title: '健康状况不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_phone.length <= 0) {
      wx.showToast({
        title: '联系电话不能为空!',
        icon: 'none'
      })
    } else if (that.data.stu_current_province.length <= 0) {
      wx.showToast({
        title: '现住区域不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_current_address.length <= 0) {
      wx.showToast({
        title: '现住地址不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_post_code.length <= 0) {
      wx.showToast({
        title: '邮政编码不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_email_address.length <= 0) {
      wx.showToast({
        title: '电子邮件不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_wetchat_id.length <= 0) {
      wx.showToast({
        title: '微信号不能为空!',
        icon: 'none'
      })
    } else {
      console.log("======20191113======")
      wx.setStorage({
        key: 'new_student_page2_data',
        data: {
          stu_pin_type: e.detail.value.stu_pin_type,
          stu_pin_code: e.detail.value.stu_pin_code,
          stu_speciality: e.detail.value.stu_speciality,
          stu_health_ind: e.detail.value.stu_health_ind,
          stu_phone: e.detail.value.stu_phone,
          stu_current_province: that.data.stu_current_province,
          stu_current_city: that.data.stu_current_city,
          stu_current_county: that.data.stu_current_county,
          stu_current_address: e.detail.value.stu_current_address,
          stu_post_code: e.detail.value.stu_post_code,
          stu_email_address: e.detail.value.stu_email_address,
          stu_wetchat_id: e.detail.value.stu_wetchat_id,
        },
        success: function (res) {
          wx.navigateTo({
            url: '../new-student-page3/new-student-page3',
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