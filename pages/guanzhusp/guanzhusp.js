// pages/guanzhusp/guanzhusp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: ['../img/11.mp4', '../img/11.mp4', '../img/11.mp4', '../img/11.mp4', '../img/11.mp4', '../img/11.mp4', '../img/11.mp4', '../img/11.mp4'],
    oldi:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
boss:function(e){
  var i=e.detail.current
  var lsati = this.data.oldi
  
     this.videoContext = wx.createVideoContext('myVideo' + i)
     this.videoContext.play()
     this.setData({
       oldi:i
     })
  
     this.videoContext = wx.createVideoContext('myVideo' + lsati)
     this.videoContext.pause()
   
  
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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