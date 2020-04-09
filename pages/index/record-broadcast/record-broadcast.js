// pages/index/master/master-home/master-home.js
const app = getApp()
var imgPostf = ["jpg", "png", "bmp", 'jpeg'];
var videoPostf = ['avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'dat', 'mov', 'qt', 'asf', 'wmv', 'mp4'];
Page({

// 20200319 liao add start
  /**
   * 页面的初始数据
   */
  // data: {
  //   currentTab: 0
  // },
    data: {
      currentTab: 0,
//       list: [{
//         id: 'view',
//         name: '机器人概述',
//         open: false,
//         courseIds: ['1', '1', '1'],
//         courseNames: ['认识机器人', '机器人应用范围', '机器人操作指南'],
//         pages: ['认识机器人', '机器人应用范围', '机器人操作指南']
//     }, {
//       id: 'content',
//       name: '工具坐标系原点',
//       open: false,
//       courseIds: ['1', '1', '1'],
//       courseNames: ['认识机器人', '机器人应用范围', '机器人操作指南'],
//       pages: ['坐标系原点原理', '坐标系原点分析']
// }, {
//     id: 'form',
//     name: '工作机器人坐标',
//     open: false,
//     courseIds: ['1', '1', '1'],
//     courseNames: ['认识机器人', '机器人应用范围', '机器人操作指南'],
//     pages: ['认识坐标系', '坐标系基本原理', '坐标系实习指南']
//   }],
  // 20200406 liao add start
     foldItems: [],
     videoUrl: '',
  // 20200406 liao add end
  },
// 20200319 liao add end

  /**
   * 收缩核心代码
   */
  kindToggle(e) {
    const id = e.currentTarget.id;
    const list = this.data.list;
    this.setData({
      courseSeriesIndex:id
    });
    console.log("20200406courseSeriesIndex", this.data.courseSeriesIndex);
    for(let i = 0, len = list.length; i<len; ++i) {
    // 20200406 liao add start, 读取原来拷贝的data: list ===可以使用，读取数据库的list，===不起作用
      // if (list[i].id === id) {
      if (list[i].id == id) {
    // 20200406 liao add end
          console.log("20200406equal");
          list[i].open = !list[i].open
        } else {
          list[i].open = false
        };
    };

    /**
     * key和value名称一样时，可以省略
     * 
     * list:list=>list
     */
      this.setData({
        list
      });
  },

// 20200406 liao add start
  urlToggle(e) {
    const id = e.currentTarget.id;
    this.setData({
      courseVideoIndex: id
    });
    console.log("20200406courseVideoIndex", this.data.courseVideoIndex);
    this.setData({
      videoUrl: this.data.list[this.data.courseSeriesIndex]['videoUrl'][this.data.courseVideoIndex],
      lesson_desc: this.data.list[this.data.courseSeriesIndex]['lesson_desc'][this.data.courseVideoIndex],
      teacher_photo: this.data.list[this.data.courseSeriesIndex]['teacher_photo'][this.data.courseVideoIndex],
      teacher_name: this.data.list[this.data.courseSeriesIndex]['teacher_name'][this.data.courseVideoIndex],
      total_courses: this.data.list[this.data.courseSeriesIndex]['total_courses'][this.data.courseVideoIndex],
      teacher_desc: this.data.list[this.data.courseSeriesIndex]['teacher_desc'][this.data.courseVideoIndex],

      lesson_main_name: this.data.list[this.data.courseSeriesIndex]['pages'][this.data.courseVideoIndex],
      teacher_class_level: this.data.list[this.data.courseSeriesIndex]['teacher_class_level'][this.data.courseVideoIndex],
      total_chapter: this.data.list[this.data.courseSeriesIndex]['total_chapter'][this.data.courseVideoIndex],
      total_hours: this.data.list[this.data.courseSeriesIndex]['total_hours'][this.data.courseVideoIndex],
    });
  // 20200406 liao add send
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = getApp().globalData.host;
    if (undefined != options.lsm_id) {
        that.setData({
          host: host,
          lsm_id: options.lsm_id,
        })
    };
    if (undefined != options.cate_index) {
      that.setData({
        host: host,
        cate_index: options.cate_index,
      })
    };
    if (undefined != options.cate_value) {
      that.setData({
        host: host,
        cate_value: options.cate_value,
      })
    };
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        // 20200406 liao add start undefined != that.data.res_id
        // that.getDetail();
        console.log("20200406lsm_id", options.lsm_id);
        console.log("20200406cate_index", options.cate_index);
        console.log("20200406cate_value", options.cate_value);

        if (undefined == that.data.lsm_id) {
            console.log("20200406getDetailList");
            that.getDetailList();       
        }else{
            console.log("20200406getDetail");
            that.getDetail();     
        }
        // 20200406 liao add end
      },
    })
  },

  getDetail: function () {
    var that = this;
    app.func.req('get_videos_chapter/' + that.data.lsm_id, {}, 'GET', function (res) {
      if (res) {
        that.setData({
          items: res,
          teacher_id: res.lsm_teacher_id,
          // 20200409 liao add start
          series_name: res.lsm_series_name,

          lesson_desc: res.lsm_lesson_desc,
          teacher_photo: res.tea_teacher_photo,
          teacher_name: res.tea_teacher_name,
          total_courses: res.tea_total_courses,
          teacher_desc: res.tea_teacher_desc,

          cate_index: 0,
          cate_value: 0,
         // 20200409 liao add end
        });
        that.getDetailList();
        that.getTeacherCourse();
      }
    });
  },
  // 20200213 end

  //20200406 liao add start
  getDetailList: function () {
    var that = this;
    app.func.req('get_videos_chapter_list', { series_name: that.data.series_name, cate_index: that.data.cate_index, cate_value: that.data.cate_value }, 'GET', function (res) {
      if (res) {
        that.setData({
          list: res,
          videoUrl: res[0]['videoUrl'][0],
          lesson_desc: res[0]['lesson_desc'][0],
          teacher_photo: res[0]['teacher_photo'][0],
          teacher_name: res[0]['teacher_name'][0],
          total_courses: res[0]['total_courses'][0],
          teacher_desc: res[0]['teacher_desc'][0],

          lesson_main_name: res[0]['pages'][0],
          teacher_class_level: res[0]['teacher_class_level'][0],
          total_chapter: res[0]['total_chapter'][0],
          total_hours: res[0]['total_hours'][0],
        });
        // console.log("20200406itemsList", that.data.itemsList);
        console.log("20200406list", that.data.list);
        console.log("20200406listitem", that.data.list[0]['videoUrl'][1]);

        // if (res.length > 0){
        //     for (var i = 0; i < res.length; i++) {
        //       that.setData({
        //         [str]: true
        //       })
        //     };
        // }
        // that.getTeacherCourse();
      }
    });
  },
  //20200406 liao add end

  // 20203019 liao add start
  getTeacherCourse: function () {
    var that = this;
    console.log("20200213getTeacherCourse", that.data.teacher_id);
    app.func.req('get_videos_main', { user_id: 0, teacher_id: that.data.teacher_id }, 'GET', function (res) {
      console.log("20200319videos_main res", res);
      that.setData({
        videosMainList: res
      })
    });
  },
    // 20200319 liao add end

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current == 0) {
        that.getDetail();
      } else {
      }
    }
  },


  // 关注/取消
  // focus: function (e) {
  //   var that = this;
  //   app.func.req('follow_user', { openid: that.data.openid, fo_followed_id: that.data.user_id }, 'POST', function (res) {
  //     that.getDetail();
  //   });
  // },
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