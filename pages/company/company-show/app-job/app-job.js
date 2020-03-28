// pages/company/company-show/app-job/app-job.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    onhidden: true,
    onbtnShow: true,
    rebtnShow: false,
    swiperCurrent: 0,
    img_arr: [],
    condition: true,
    id: null,
    selectArray1: [{
      "id": "1",
      "text": "1970"
    }, {
      "id": "2",
      "text": "1971"
    }, {
      "id": "3",
      "text": "1972"
    }, {
      "id": "4",
      "text": "1973"
    }, {
      "id": "5",
      "text": "1974"
      }, {
        "id": "6",
        "text": "1975"
      },  {
        "id": "7",
        "text": "1976"
      },  {
        "id": "8",
        "text": "1977"
      }, {
        "id": "9",
        "text": "1978"
      }, {
        "id": "10",
        "text": "1979"
      }, {
        "id": "11",
        "text": "1980"
      }, {
        "id": "12",
        "text": "1981"
      }, {
        "id": "13",
        "text": "1982"
      }, {
        "id": "14",
        "text": "1983"
      }, {
        "id": "15",
        "text": "1984"
      }, {
        "id": "16",
        "text": "1985"
      }, {
        "id": "17",
        "text": "1986"
      }, {
        "id": "18",
        "text": "1987"
      }, {
        "id": "19",
        "text": "1988"
      }, {
        "id": "20",
        "text": "1989"
      }, {
        "id": "21",
        "text": "1990"
      }, {
        "id": "22",
        "text": "1991"
      }, {
        "id": "23",
        "text": "1992"
      }, {
        "id": "24",
        "text": "1993"
      }, {
        "id": "25",
        "text": "1994"
      }, {
        "id": "26",
        "text": "1995"
      }, {
        "id": "27",
        "text": "1996"
      }, {
        "id": "28",
        "text": "1997"
      }, {
        "id": "29",
        "text": "1998"
      }, {
        "id": "30",
        "text": "1999"
      }, {
        "id": "31",
        "text": "2000"
      }, {
        "id": "32",
        "text": "2001"
      }, {
        "id": "33",
        "text": "2002"
      }, {
        "id": "34",
        "text": "2003"
      }, {
        "id": "35",
        "text": "2004"
      }, {
        "id": "36",
        "text": "2005"
      }, {
        "id": "37",
        "text": "2006"
      }, {
        "id": "38",
        "text": "2007"
      }, {
        "id": "39",
        "text": "2008"
      }, {
        "id": "40",
        "text": "2009"
      }, {
        "id": "41",
        "text": "2010"
      }, {
        "id": "42",
        "text": "2011"
      }, {
        "id": "43",
        "text": "2012"
      }, {
        "id": "44",
        "text": "2013"
      }, {
        "id": "45",
        "text": "2014"
      }, {
        "id": "46",
        "text": "2015"
      }, {
        "id": "47",
        "text": "2016"
      }, {
        "id": "48",
        "text": "2017"
      }, {
        "id": "49",
        "text": "2018"
      }, {
        "id": "50",
        "text": "2019"
      }],
    selectArray2: [{
      "id": "1",
      "text": "高中"
    }, {
      "id": "2",
      "text": "大专"
    }, {
      "id": "3",
      "text": "本科"
    }, {
        "id": "4",
        "text": "研究生"
    }, {
        "id": "5",
        "text": "博士生"
      }],
    selectArray3: [{
      "id": "1",
      "text": "无经验"
    }, {
      "id": "2",
      "text": "1-2年"
    }, {
      "id": "3",
      "text": "2-3年"
    }, {
      "id": "4",
      "text": "3-4年"
    }, {
      "id": "5",
      "text": "4年以上"
    }]
  },
 

  getData1: function (e) {
    this.setData({
      birth_year: e.detail.text
    })
  },
  getData2: function (e) {
    this.setData({
      qualification: e.detail.text
     })
  },
  getData3: function (e) {
    this.setData({
      work_years: e.detail.text
    })
  },
  genderSelect: function (e) {
    this.setData({
      id: e.target.dataset.id 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
     console.log("20200215res",  options.job_id);
    // console.log("20200216res", e.detail.value.apj_user_mobile);
    that.setData({
      host: host,
      job_name: options.job_name,
      job_salary: options.job_salary,
      job_county: options.job_county,
      job_address: options.job_address,
      job_id: options.job_id,
      res_id: options.res_id,
      user_id: user_id
    });

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        app.func.req('get_user', { openid: res.data }, 'GET', function (res) {
          console.log("2020=====", res);
          that.setData({
            userInfo: res,
            user_headimg: res.user_headimg
          });
          // 20200329 liao add start
          // if (res.user_sex == 1) {
          //   that.setData({
          //     id: 0
          //   });
          // } else if (res.user_sex == 2) {
          //   that.setData({
          //     id: 1
          //   });
          // };
          // 20200329 liao add end
          app.func.req('my_resume', { user_id: that.data.user_id }, 'GET', function (res) {
            console.log("20200213ifres", res);
            if (res.res_id){
              console.log("20200322IF");
            that.setData({
              // 20200329 liao start
              // resumeInfo: res,
              user_name: res.res_user_name,
              user_sex: res.res_user_sex,
              user_mobile: res.res_user_mobile,
              // 20200329 liao end
              res_id: res.res_id,
              birth_year: res.res_birth_year,
              qualification: res.res_qualification,
              work_years: res.res_work_years
            });
          // 20200329 liao add start
              if (that.data.user_sex == 0) {
                that.setData({
                  id: 0
                });
              } else if (that.data.user_sex == 1) {
                that.setData({
                  id: 1
                });
              };
          // 20200329 liao add end
            };
          });
        });
        
      },
    })

  },

  // 创建并投递
  // 20200321 start
  // formSubmit: function (e) {
  //   var that = this;
  //   // var num = e.currentTarget.dataset.num;
  //   console.log("20200215res",  e.detail.value.apj_user_mobile);
  //   console.log("20200215111that.data.res_id", that.data.res_id);

  //     if (that.data.res_id == null){
  //     console.log("addresume");
  //     app.func.req('add_resume', {
  //     res_user_name: e.detail.value.res_user_name,
  //     res_sex: that.data.id,
  //     res_birth_year: that.data.res_birth_year,
  //     res_qualification: that.data.res_qualification,
  //     res_work_years: that.data.res_work_years,
  //     res_position: that.data.job_name,
  //     res_salary_range: that.data.job_salary,
  //     res_work_location: that.data.job_address,
  //     res_user_id: that.data.user_id,

  //     openid: that.data.openid,
  //   }, 'POST', function (res) {
  //     if (res.code == 200) {
  //        console.log("20200213 add resume");
  //     }
  //   });
  // }
  //   app.func.req('apl_job', {
  //     apj_user_id: that.data.user_id,
  //     apj_job_id: that.data.job_id,
  //     apj_user_mobile: e.detail.value.apj_user_mobile,
  //     apj_user_id: that.data.user_id,

  //     openid: that.data.openid,
  //   }, 'POST', function (res) {
  //     console.log("20200310res", that.data.res_id);
  //     if (res.code == 200) {
  //       wx.navigateTo({
  //         url: '../job-app-resume/job-app-resume?job_id=' + e.currentTarget.dataset.jobid + '&res_id=' + that.data.res_id,
  //       })
      
  //     }
  //   });
  // },
  formSubmit: function (e) {
    var that = this;
    var myreg = /^1\d{10}$/;
    // var num = e.currentTarget.dataset.num;
    console.log("20200215111that.data.res_id", that.data.res_id);
    if (e.detail.value.user_name.length <= 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
    } else if (!myreg.test(e.detail.value.user_mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } 
    else if (that.data.id == '') {
      wx.showToast({
        title: '性别不能为空!',
        icon: 'none'
      })
    }
    else{
      that.setData({
        input_user_name: e.detail.value.user_name,
        input_user_mobile: e.detail.value.user_mobile
      });
    // 2020329 liao add start
    // if (that.data.res_id == null) {
    if (undefined != that.data.res_id) {
    // 2020329 liao add end
      console.log("addresume");
      app.func.req('add_resume', {
        res_user_name: that.data.input_user_name,
// 20200329 liao add start
        res_user_mobile: that.data.input_user_mobile,
// 20200329 liao add end
        res_user_sex: that.data.id,
        res_birth_year: that.data.birth_year,
        res_qualification: that.data.qualification,
        res_work_years: that.data.work_years,
        // 20200329 liao add start
        // res_position: that.data.job_name,
        // res_salary_range: that.data.job_salary,
        // res_work_location: that.data.job_address,
        // 20200329 liao add end
        res_user_id: that.data.user_id,

        openid: that.data.openid,
      }, 'POST', function (res) {
        if (res.code == 200) {
          that.setData({
            res_id: res.res_id
          });
          console.log("20200329res_id", that.data.res_id);
          that.appJob(); 
        }
      });
    }else{
      app.func.req('update_myresume', {
        res_id: that.data.res_id,
        // 20200329 liao add start
        res_user_name: that.data.input_user_name,
        res_user_mobile: that.data.input_user_mobile,
        res_user_sex: that.data.id,
        // 20200329 liao add end
        res_birth_year: that.data.birth_year,
        res_qualification: that.data.qualification,
        res_work_years: that.data.work_years,

      }, 'POST', function (res) {
        if (res.code == 200) {
          console.log("20200323 update resume");  
          that.appJob(); 
        }
      });
    };
  }
  },

  appJob: function () {
    var that = this;
    app.func.req('apl_job', {
      apj_user_id: that.data.user_id,
      apj_job_id: that.data.job_id,
      apj_user_mobile: that.data.input_user_mobile,

      openid: that.data.openid,
    }, 'POST', function (res) {
      console.log("20200310res", that.data.res_id);
      if (res.code == 200) {
        wx.navigateTo({
          // 20200329 liao add start
          // url: '../job-app-resume/job-app-resume?job_id=' + e.currentTarget.dataset.jobid + '&res_id=' + that.data.res_id,
          url: '../job-app-resume/job-app-resume?job_id=' + that.data.job_id + '&res_id=' + that.data.res_id,
          // 20200329 liao add end
        })

      }
    });
  },
  // 20200321 end
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