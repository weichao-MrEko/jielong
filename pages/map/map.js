var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();
// pages/meyaojl/meyaojl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../img/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    map:'',
    suosou:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    let that=this
    qqmapsdk = new QQMapWX({
      key: 'DV5BZ-3XWLD-IEY4T-PFISM-BXHCK-GVBAH'
    }),

    // 调用接口
    
      wx.getLocation({
      type: 'gcj02',
     
        success: function (res) { 
          that.setData({
            markers: [{
              iconPath: "../img/location.png",
              id: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 50,
              height: 50
            }],
          })
        }
      })
    
        console.log(1)
   /*  that.mapCtx = wx.createMapContext("map");
     that.mapCtx.getCenterLocation({
           success: function (res) {
             console.log(res)
             that.setData({
              markers: [{
                iconPath: "../img/location.png",
                 id: 0,
                 latitude: res.latitude,
                 longitude: res.longitude,
                 width: 50,
                 height: 50
               }],
             })
           }
         })
      */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
 getLngLat () {
    var that = this;
    console.log(1)
    that.mapCtx = wx.createMapContext("map");
    that.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          markers: [{
            iconPath: "../img/location.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 50,
            height: 50
          }],
        })
      }
    })
  },
  regionchange(e) {
  
    if (e.type == 'end') {
      this.getLngLat()
    }
  },


  shuru(e){
    let st=e.detail.value
    let that=this
    qqmapsdk.search({
      keyword: e.detail.value,
      success: function (res) {
        console.log(res)
        that.setData({
          map: res.data,  
        })

      },
      complete:function(res){
        console.log(res)
      }
    })
  },
  xuanzhe:function(e){
    console.log(e)
    let id = e.detail.value
   let that=this
   that.data.site = {
     title: that.data.map[id].title, address: that.data.map[id].address}
    
   that.setData({
     markers: [{
       iconPath: "../img/location.png",
       id: 0,
       latitude: that.data.map[id].location.lat,
       longitude: that.data.map[id].location.lng,
       width: 50,
       height: 50
     }],
     site: that.data.site
   })
  },
  finish:function(){
     let that=this
     console.log(that.data.site)
     if (that.data.site){
        var ditu = app.globalData.map
        ditu.push(that.data.site)
     }
     wx.navigateBack({
       delta:1
     })
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