// pages/index/school/school.js
const app = getApp()
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bachelorSchoolList: [],
    collegeSchoolList: [],
// 20200213 add start
    companyList: [],
    swiperCurrentCollege: 0,
    swiperCurrentBachelor: 0,
    swiperCurrentEnterprise: 0,
    brand_intro:'网易 (NASDAQ: NTES)，1997年由丁磊先生在广州创办、2000年在美国NASDAQ股票交易所挂牌上市，是中国领先的互联网技术公司，在开发互联网应用、服务等方面始终保持中国业界领先地位。本着对中国互联网发展强烈的使命感，缔造美好生活的愿景。',
    // brand_album: [{ brand_id: "1", brand_img: 'storage/app/public/uploads/school/1.jpg'}, { brand_id: "2", brand_img: 'storage/app/public/uploads/school/2.jpg'}, { brand_id: "3", brand_img: 'storage/app/public/uploads/school/3.jpg'}, { brand_id: "4", brand_img: 'storage/app/public/uploads/school/4.jpg' }, { brand_id: "5", brand_img: 'storage/app/public/uploads/school/5.jpg'}]
    cooperate_brand_album: []
// 20200213 add end
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
        // 20200213 add start
        that.getCooperateImg();
        // 20200213 add end
        that.getCollegeList();
        that.getBachelorList();
        // 20200213 add start
        that.getCompany();
        // 20200213 add end
      },
    })    
  },

// 20200213 add start
  // getList:function(){
  //   var that = this;
  //   app.func.req('get_list', { query: 2, openid: that.data.openid, pageSize: 10, page: page }, 'GET', function (res) {
  //     // console.log(res);
  //     that.setData({
  //       schoolList: that.data.schoolList.concat(res)
  //     })
  //   });
  // },
  getCooperateImg: function () {
    var that = this;
    // 品牌广告
    app.func.req('get_list', { query: 5, openid: that.data.openid, pageSize: 15, page: page }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        cooperate_brand_album: that.data.cooperate_brand_album.concat(res)
      })
      console.log("20200213", that.data.cooperate_brand_album);
    });
  },

  getCollegeList: function () {
    var that = this;
    app.func.req('my_school', { category: 2, openid: that.data.openid, pageSize: 10, page: page }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        resItems: that.data.collegeSchoolList.concat(res)
      });
      var adCollegeSchoolList = [];
      var index = [];
      for (var i = 0; i < that.data.resItems.length; i++) {
        var num = Math.ceil((i + 1) / 3);
        if (index.indexOf(num) < 0) {
          index.push(num);
          adCollegeSchoolList.push({ index: num, list: [that.data.resItems[i]] });
        } else {
          for (var j = 0; j < adCollegeSchoolList.length; j++) {
            if (num == adCollegeSchoolList[j].index) {
              adCollegeSchoolList[j].list.push(that.data.resItems[i])
            }
          }
        }
      }
      console.log("20200218teacherlist", that.data.resItems);
      that.setData({
        collegeSchoolList: adCollegeSchoolList
      })
    });
  },

  getBachelorList: function () {
    var that = this;
    app.func.req('my_school', { category: 1, openid: that.data.openid, pageSize: 10, page: page }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        resItems: that.data.bachelorSchoolList.concat(res)
      });
      var adBachelorSchoolList = [];
      var index = [];
      for (var i = 0; i < that.data.resItems.length; i++) {
        var num = Math.ceil((i + 1) / 3);
        if (index.indexOf(num) < 0) {
          index.push(num);
          adBachelorSchoolList.push({ index: num, list: [that.data.resItems[i]] });
        } else {
          for (var j = 0; j < adBachelorSchoolList.length; j++) {
            if (num == adBachelorSchoolList[j].index) {
              adBachelorSchoolList[j].list.push(that.data.resItems[i])
            }
          }
        }
      }
      console.log("20200218teacherlist", that.data.resItems);
      that.setData({
        bachelorSchoolList: adBachelorSchoolList
      })
    });
  },

  getCompany: function () {
    var that = this;
    app.func.req('my_company', { openid: that.data.openid, pageSize: 1000, page: 1 }, 'GET', function (res) {
      that.setData({
        resItems: that.data.companyList.concat(res)
      });
      var adCompanyList = [];
      var index = [];
      for (var i = 0; i < that.data.resItems.length; i++) {
        var num = Math.ceil((i + 1) / 3);
        if (index.indexOf(num) < 0) {
          index.push(num);
          adCompanyList.push({ index: num, list: [that.data.resItems[i]] });
        } else {
          for (var j = 0; j < adCompanyList.length; j++) {
            if (num == adCompanyList[j].index) {
              adCompanyList[j].list.push(that.data.resItems[i])
            }
          }
        }
      }
      console.log("20200218companylist", that.data.resItems);
      that.setData({
        companyList: adCompanyList
      })
    });
  },

  // 20200213 add end
  
  // 搜索
  formSubmit:function(e){
    var that = this;
    that.search(e.detail.value.search);
  },
  bindconfirm: function (e) {
    var that = this;
    that.search(e.detail.value);
  },
  search: function (school_name) {
    var that = this;
    app.func.req('search_school', { school_name: school_name }, 'GET', function (res) {
      // console.log(res);
      that.setData({
        schoolList: res
      })
    });
  },


  // 20200213 add start
  // 轮播
  swiperCollegeChange: function (e) {
    this.setData({
      swiperCurrentCollege: e.detail.current
    })
  },

  swiperBachelorChange: function (e) {
    this.setData({
      swiperCurrentBachelor: e.detail.current
    })
  },

  swiperEnterpriseChange: function (e) {
    this.setData({
      swiperCurrentEnterprise: e.detail.current
    })
  },
  // 20200213 add end
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
    // 20200213 add start
    // page++;
    // this.getList();
    // 20200213 add start
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})