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
    stu_residence_province: "",
    stu_residence_city: "",
    stu_residence_county: '',
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
    console.log('stu_residence_city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    // 2020 / 1 / 21 end
    that.setData({
      host: host,
      stu_user_id: user_id,
      // 2020/1/21 start
      stu_residence_province: that.data.stu_residence_province,
      stu_residence_city: that.data.stu_residence_city,
      stu_residence_county: that.data.stu_residence_county,
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
    if (e.detail.value.stu_user_id.length <= 0) {
      wx.showToast({
        title: '学生ID不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_pro_code.length <= 0) {
      wx.showToast({
        title: '生源省代码不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_name.length <= 0) {
      wx.showToast({
        title: '姓名不能为空!',
        icon: 'none'
      })
    } else if (that.data.id == '') {
      wx.showToast({
        title: '性别不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_nationality.length <= 0) {
      wx.showToast({
        title: '国籍不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_birthday.length <= 0) {
      wx.showToast({
        title: '出生日期不能为空!',
        icon: 'none'
      })
    } else if (that.data.stu_residence_province.length <= 0) {
      wx.showToast({
        title: '户口区域不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_residence.length <= 0) {
      wx.showToast({
        title: '户口地址不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_political_status.length <= 0) {
      wx.showToast({
        title: '政治面貌不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.stu_nation.length <= 0) {
      wx.showToast({
        title: '民族不能为空!',
        icon: 'none'
      })
    } else {
      console.log("======20191113======")
      wx.setStorage({
        key: 'new_student_page1_data',
        data: {
          stu_user_id: e.detail.value.stu_user_id,
          stu_pro_code: e.detail.value.stu_pro_code,
          stu_name: e.detail.value.stu_name,
          stu_sex: that.data.id,
          stu_nationality: e.detail.value.stu_nationality,
          stu_birthday: e.detail.value.stu_birthday,
          stu_residence_province: that.data.stu_residence_province,
          stu_residence_city: that.data.stu_residence_city,
          stu_residence_county: that.data.stu_residence_county,
          stu_residence: e.detail.value.stu_residence,
          stu_political_status: e.detail.value.stu_political_status,
          stu_nation: e.detail.value.stu_nation,
        },
        success: function (res) {
          wx.navigateTo({
            url: '../new-student-page2/new-student-page2',
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