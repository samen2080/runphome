//app.js
//this is a comment
var http = require('utils/config.js'); //接口配置
console.log("http:", http)
var userInfo = {};
App({
  onLaunch: function () {
    console.log("hello")
  },
  
  globalData: {
    userInfo: null,
    host: 'https://www.xqtechinfo.com/runphome/',
    appid: 'wxbb7cac615c7d818f',
    secret: '2cae490036da6a0212ae4e6aa95ff228',
  },

  func: {
    req: http.req
  },
})