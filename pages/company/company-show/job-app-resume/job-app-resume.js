// pages/company/company-show/job-app-resume/job-app-resume.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumName: '',
    checked: false,
    state: "",
    show: false,
    num: 0,
    showID: "",
    inputValue: "",
    label: [],
    hidden: true, 
    obtnArry: [
      {
        name: "素质高端",
        num: 0,
        selected: false,
      },
      {
        name: "吃苦耐劳",
        num: 1,
        selected: false,
      },
      {
        name: "忠诚稳重",
        num: 2,
        selected: false,
      },
      {
        name: "坚守承诺",
        num: 3,
        selected: false,
      },
      {
        name: "正直阳刚",
        num: 4,
        selected: false,
      },
      {
        name: "勇于挑战",
        num: 5,
        selected: false,
      },
      {
        name: "积极热情",
        num: 6,
        selected: false,
      },
      {
        name: "乐于沟通",
        num: 7,
        selected: false,
      },
      {
        name: "善于学习",
        num: 8,
        selected: false,
      },
      {
        name: "适应力强",
        num: 9,
        selected: false,
      },
      {
        name: "善于创新",
        num: 10,
        selected: false,
      },
      {
        name: "创业经验",
        num: 11,
        selected: false,
      }
    ]
    
  },
  addWorkExp: function (e) {
    var that = this;
    console.log("20200310A",that.data.res_id)
    wx.navigateTo({
      url: '../work-exp/work-exp?job_id=' + e.currentTarget.dataset.jobid + '&res_id=' + that.data.res_id,
    })
  },

  addEduExp: function (e) {
    var that = this;
    console.log("20200310B", that.data.res_id)
    wx.navigateTo({
      url: '../edu-exp/edu-exp?job_id=' + e.currentTarget.dataset.jobid + '&res_id=' + that.data.res_id,
    })
  },
 
  //同步输入框内容
  bindKeyInput(e) {
    this.setData({
      albumName: e.detail.value
    })
  },
  // 选择标签并输入到label数组中
  dealTap: function (e) {
    let string = "obtnArry[" + e.target.dataset.index + "].selected";
    // const checkedicon = "obtnArry[" + e.target.dataset.index + "].selected"; 
    console.log(!this.data.obtnArry[e.target.dataset.index].selected);
    this.setData({
      [string]: !this.data.obtnArry[e.target.dataset.index].selected
    })
    let detailValue = this.data.obtnArry.filter(it => it.selected).map(it => it.name)
    this.setData({
       label: detailValue,

    })
    console.log(this.data.label)
  },
  addinput(e) {
    this.setData({
      show: true,
    });
  },
  //关闭弹出层，但是我这里有取消按钮，所以这个没用了
  //onClose() {
  // this.setData({ show: false });
  // },

  //实时获取输入框的值
  bindValue(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //确定按钮，添加数组达到添加标签的作用
  onInputValue() {
    this.setData({
      show: false,
      inputValue: this.data.inputValue
    });
    var obtnArry = this.data.obtnArry;
    console.log(this.data.inputValue)
    var newData = { num: obtnArry.length, name: this.data.inputValue, selected: false };
    obtnArry.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      obtnArry,
    })
    console.log(this.data.inputValue)
  },
  //取消按钮
  onCancel() {
    this.setData({ show: false });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    var user_id = wx.getStorageSync("user_info").user_id;
    console.log("202000310", options.res_id,)
    that.setData({
      host: host,
      job_id: options.job_id,
      res_id: options.res_id,
      user_id: user_id,
    })

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      }
    })

     if (that.data.res_id != "") {
       var res_id = that.data.res_id;
       that.getWorkExp(res_id);
     }

    if (that.data.res_id != "") {
      var res_id = that.data.res_id;
      that.getEduExp(res_id);
     }

  },
  // 删除工作经历
  cancelPro: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.wkeid;
    that.setData({
      num: index,
      hidden: false,
      qxTxt: '确定要删除吗？',
      way: 1
    })

  },
  
  getWorkExp: function (res_id) {
    var that = this;
    console.log("20200213 function parameter res_id", res_id);
    app.func.req('get_workexp', { res_id: that.data.res_id }, 'GET', function (res) {
      //  app.func.req('get_workexp/' + that.data.res_id, {}, 'GET', function (res) {
      console.log("20200213res", res);
      that.setData({
        workItems: res
      })
    });
  },

  getEduExp: function (res_id) {
      var that = this;
      app.func.req('get_eduexp', { res_id: that.data.res_id }, 'GET', function (res) {
        console.log("20200213res", res);
        that.setData({
          eduItems: res
        })
      });
  },

  // 取消取消交易
  removeCancel: function (e) {
    var that = this;
    that.setData({
      hidden: true
    })
  },

  // 删除
  cancelWork: function (e) {
    var that = this;
    console.log("20200213A", e.currentTarget.dataset.wkeid);
    app.func.req('del_workexp', { openid: that.data.openid, wke_id: e.currentTarget.dataset.wkeid }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
         that.getWorkExp();
      }
    });
  },
  cancelEdu: function (e) {
    var that = this;
    console.log("20200213A", e.currentTarget.dataset.eduid);
    app.func.req('del_eduexp', { openid: that.data.openid, edu_id: e.currentTarget.dataset.eduid }, 'POST', function (res) {
      // console.log(res);
      if (res.code == 200) {
        that.getEduExp();
      }
    });
  },
  //保存
  formSubmit: function (e) {
    var that = this;
    var a = this.data.label;
    var b = a.join(",");
    // var num = e.currentTarget.dataset.num;
    // console.log("20200215res", e.currentTarget.dataset.i['job_name']);
    app.func.req('update_resume', {
      res_user_id: that.data.user_id,
      res_personal_label: b,
      res_intro: e.detail.value.res_intro,
      
      openid: that.data.openid,
    }, 'POST', function (res) {
      // console.log("20200126", that.data.mnt_user_province);
      if (res.code == 200) {
        wx.navigateBack({
          delta: 1
        })
        
      }
    })
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        that.getWorkExp();
        that.getEduExp();
      },
    }) 


    // var that = this;
    // let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];
    // //当前页的options，啥意思呢，就是你可能某个函数需要刷新，但是他的参数正好是传过来的参数
    // console.log("currPage.options",that.data.wke_com_name); 
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