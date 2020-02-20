// pages/mine/worker/new-contract-page1/new-contract-page1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    address_img: '',
    upHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    that.setData({
      host: host
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
              else{
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
    if (e.detail.value.user_name.length <= 0) {
      wx.showToast({
        title: '户主姓名不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.user_id.length <= 0) {
      wx.showToast({
        title: '用户ID不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.user_sex.length <= 0) {
      wx.showToast({
        title: '性别不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.user_city_id.length <= 0) {
      wx.showToast({
        title: '身份证号不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.user_mobile.length <= 0) {
      wx.showToast({
        title: '联系电话不能为空!',
        icon: 'none'
      })
    } else if (e.detail.value.user_address.length <= 0) {
      wx.showToast({
        title: '联系地址不能为空!',
        icon: 'none'
      })
    } else if (that.data.address_img.length <= 0) {
      wx.showToast({
        title: '图片不能为空!',
        icon: 'none'
      })
    } else {
      console.log("======20191113======")
      console.log(e.detail.value.address_img)
      wx.setStorage({
        key: 'contract_page1_data',
        data: {
          user_name: e.detail.value.user_name,
          user_id: e.detail.value.user_id,
          user_sex: e.detail.value.user_sex,
          user_mobile: e.detail.value.user_mobile,
          user_city_id: e.detail.value.user_city_id,
          user_address: e.detail.value.user_address,
          address_img: that.data.address_img},
        success: function(res) {
          wx.navigateTo({
            url: '../../worker/new-contract-page2/new-contract-page2',
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