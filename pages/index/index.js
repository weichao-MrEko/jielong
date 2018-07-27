//index.js
//获取应用实例

const app = getApp()

Page({
  
  data: {
    motto: 'Hello World',
    userInfo:{},
    zhuti:'',
    xmu:'',
    turl: app.globalData.urlfix,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    idda:{},
    time:''
    
  },
  onPullDownRefresh: function () {
    console.log(1)
    wx.stopPullDownRefresh()
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
      url: '../suosou/suosou?uid=' + app.globalData.idda.uid
    })
  },
  pingzheng:function(){
      wx.navigateTo({
        url: '../pingzheng/pingzheng',
      })
  },
  jieneiyong:function(e){
    let that=this
    let eid= e.currentTarget.dataset.id  
    wx: wx.navigateTo({

      url: '../huodong/huodong?id=' + that.data.zhuti[eid].id + '&uid=' + app.globalData.idda.uid + '&theme_uid=' + that.data.zhuti[eid].user_id,


    })
    
  },
  
  onLoad: function () {
    console.log(app.globalData.idda)
    console.log(app.globalData.userInfo)
    var Time = new Date().getTime()
    console.log(Time)
    wx.showLoading({
      title: '加载中',
    })

    
    wx.request({
      url: app.globalData.urlPrefix + "qrcode/code",
      data: {
        path:'pages/huodong/huodong?id'
      },
      success: function (res) {
        console.log(res.data)
      }

    })
    var that=this
    wx.request({
      url: app.globalData.urlPrefix + "User/jl_index",
      data: '',
      success: function(res) {
        for (var i = 0; i < res.data.theme.length;i++){
          var sjcha = (Time - res.data.theme[i].add_time * 1000);
          //天
          var tian = Math.floor(sjcha /(24*3600*1000)) ;
          //小时
          var leave1=sjcha%(24*3600*1000);
          var xiaoshi=Math.floor(leave1/(3600*1000));
          //分钟
          var leave2=leave1%(3600*1000);
          var fenzhong=Math.floor(leave2/(60*1000));
          //秒
          var leave3=leave2%(60*1000);
          var miao=Math.floor(leave3/1000);
          console.log(tian+xiaoshi+fenzhong+miao)
          if(tian >0){
            res.data.theme[i].add_time=tian+'天前'
          }
          else if(xiaoshi>0){
            res.data.theme[i].add_time = xiaoshi+'小时前'
          }
          else if(fenzhong>0){
            res.data.theme[i].add_time = fenzhong+'分钟前'
          }
          else {
            res.data.theme[i].add_time = miao+'秒前'
          }
      }
        console.log(res.data.theme[16].add_time)
       that.setData({
         zhuti: res.data.theme,
         time:Time
       })
       setTimeout(function () {
         wx.hideLoading()
       }, 1000)
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
