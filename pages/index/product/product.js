
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
var routes = require('routes'); 
Page({

  /**
   * 页面的初始数据
   */

  data: {
    ellipsis1: true,
    ellipsis2: true,
    ellipsis3: true,
    currentTab: 0,
    routers: [
      {
        name: 'T1',
        url: '',
        icon: ''
      },
      {
        name: 'T2',
        url: '',
        icon: ''
      },
      {
        name: 'T3',
        url: '',
        icon: ''
      },
      {
        name: 'T4',
        url: '',
        icon: ''
      },
      {
        name: 'T5',
        url: '',
        icon: ''
      },
      {
        name: 'T6',
        url: '',
        icon: ''
      },
      {
        name: 'T7',
        url: '',
        icon: ''
      },
      {
        name: 'T8',
        url: '',
        icon: ''
      },
      {
        name: 'T9',
        url: '',
        icon: ''
      }
    ],
    userInfo: {},
    cellHeight: '120px',
    pageItems: [] ,
  },

// 20200308 add start
  ellipsis1: function () {
    var value = !this.data.ellipsis1;
    this.setData({
      ellipsis1: value
    })
  },
// 20200308 add end
// 20200325 liao add start
  ellipsis2: function () {
    var value = !this.data.ellipsis2;
    this.setData({
      ellipsis2: value
    })
  },

  ellipsis3: function () {
    var value = !this.data.ellipsis3;
    this.setData({
      ellipsis3: value
    })
  },
// 20200325 liao add end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    that.setData({
      host: host,
      // com_id: options.com_id,
      user_id: user_id
    });

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    });

    app.func.req('get_product', { user_id: that.data.user_id }, 'GET', function (res) {
      console.log("20200288 res", res);
      that.setData({
        productList: res
      })
    });

    app.func.req('get_sample', { user_id: that.data.user_id, pageSize: 9, page: 1 }, 'GET', function (res) {
      console.log("20200288 sample res", res);
      that.setData({
        sampleList: res
      });
      // for (var i = 0; i < that.data.sampleList.length; i++) {
      //   json.push({ routers.i['url']: rows[i]['ORDERFORM_NO'], SALE_NO: rows[i]['SALE_NO']});
      // };
      wx.setNavigationBarTitle({
        title: '案例展示-' + '九宫格',
        success: function (res) {
          // success 
        }
      })

      var pageItems = [];
      for (var i = 0; i < that.data.sampleList.length; i++) {
        routes.PageItems[i].icon = that.data.host + that.data.sampleList[i].smd_index_img;
        routes.PageItems[i].text = "案例" + that.data.sampleList[i].smd_id;
        routes.PageItems[i].route = "sample/sample?smd_id=" + that.data.sampleList[i].smd_id;
        console.log("20200302 pageitems:", routes.PageItems[i].icon);
      };



      var row = [];
      var len = routes.PageItems.length;//重组PageItems 
      // var len = that.data.sampleList.length;//重组PageItems 
      len = Math.floor((len + 2) / 3) * 3;
      for (var i = 0; i < len; i++) {
        if ((i + 1) % 3 == 0) {
          row.push(routes.PageItems[i]);
          // row.push(that.data.sampleList[i]);
          pageItems.push(row);
          row = [];
          continue;
        }
        else {
          row.push(routes.PageItems[i]);
          // row.push(that.data.sampleList[i]);
        }
      }
      wx.getSystemInfo({
        success: function (res) {
          var windowWidth = res.windowWidth;
          that.setData({
            cellHeight: (windowWidth / 3) + 'px'
          })
        },
        complete: function () {
          that.setData({
            pageItems: pageItems
          })
        }
      })
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