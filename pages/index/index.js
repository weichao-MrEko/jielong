//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo:{},
    zhuti:'',
    xmu:'',
   
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    idda:{}
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jielong:function(){
    
    wx:wx.navigateTo({
      url: '../jielong/jielong',
   
    })
  },
  suosou:function(){
    wx.navigateTo({
      url: '../suosou/suosou',
    })
  },
  jieneiyong:function(e){
    let that=this
    let eid= e.currentTarget.dataset.id  
    wx: wx.navigateTo({
      url: '../huodong/huodong?id=' + that.data.zhuti[eid].id +'&uid='+ that.data.zhuti[eid].user_id,

    })
    
  },
  
  onLoad: function () {
    console.log(app.globalData.idda)
    console.log(app.globalData.userInfo)
    var that=this
    wx.request({
      url: app.globalData.urlPrefix + "User/jl_index",
      data: '',
      success: function(res) {
        console.log(res.data.theme)
       that.setData({
         zhuti: res.data.theme.reverse(),
         
       })
      },
    
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        idda: app.globalData.idda,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          idda: app.globalData.idda,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => { 
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
