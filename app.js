//app.js

App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    // 登录
    wx.login({   
      success: res => {
        var that=this;
        var code=res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: data => {
            console.log(data)
            var rawData=data.rawData;
            var signature=data.signature;
            var encryptedData=data.encryptedData;
            var iv= data.iv;
            wx.request({
              url: this.globalData.urlPrefix + "user/login",
              data:{
                "code": code,
                "rawData": rawData,
                "signature": signature,
                'iv': iv,
                'encryptedData': encryptedData
              },
              success: ev => {
                
                this.globalData.idda=ev.data;
              
              }
            })
          }
        })
      }
      
    })
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    tel: null,
    userInfo:null,
    idda: null,
    gongkai:[],
    ongk:[],
    ongks:[],
    tianjiaprivate:[],
    map:[],
    urlPrefix : 'http://192.168.1.112/dragon/public/wxapi/'
  }
})
