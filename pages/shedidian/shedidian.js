// pages/shedidian/shedidian.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.map)
    var that=this
    that.setData({
      site: app.globalData.map
    })
    
    console.log(that.data.site)
    if (app.globalData.map==''){
      /*wx.navigateTo({
        url: '../map/map',
      })*/
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.chooseLocation({
            success: function(res) {
                console.log(res)
              that.data.site.push(res)
              that.setData({
                site: that.data.site
              })
              console.log(that.data.site)
            },
          })
        
        }
      })
      console.log(that.data.site)
    }
   
  
    console.log(that.data.site)
  },
 add:function(){
   var that=this
   wx.getLocation({
     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
     success: function (res) {
       var latitude = res.latitude
       var longitude = res.longitude
       wx.chooseLocation({
         success: function (res) {
           that.data.site.push(res)
           that.setData({
             site:that.data.site
           })
         },
       })

     }
   })
 },
 btn:function(){
   app.globalData.map=this.data.site
   wx.navigateBack({
     delta:1
   })
 },
  chamap:function(e){
    var id = e.currentTarget.dataset.id
    wx.openLocation({
      latitude: this.data.site[id].latitude,
      longitude: this.data.site[id].longitude,
      scale: 28,
      name: this.data.site[id].name,
      aaddress: this.data.site[id].address
    })
  },
 delmap:function(e){
   var id = e.currentTarget.dataset.id
   app.globalData.map.splice(id,1)
   this.data.site.splice(id, 1)
   this.setData({
     site:this.data.site
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
  onShow: function (e) {
  
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