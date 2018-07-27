// pages/shedidian/shedidian.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.map)
    var that=this
    var sites = that.data.site
    if (app.globalData.map==''){
      wx.navigateTo({
        url: '../map/map',
      })
    }
    that.setData({
      site: app.globalData.map
    })
  
    console.log(that.data.site)
  },
 add:function(){
   wx.navigateTo({
     url: '../map/map',
   })
 },
 btn:function(){
   wx.navigateBack({
     delta:1
   })

 },
 delmap:function(e){
   console.log(e.currentTarget.dataset.id)
   var id = e.currentTarget.dataset.id
   app.globalData.map.splice(id,1)
   this.data.site.splice(id, 1)
   this.setData({
     site:this.data.site
   })
   console.log(app.globalData.map)
   console.log(this.data.site)
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
    this.setData({
      site: app.globalData.map
    })
    console.log(this.data.site)
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