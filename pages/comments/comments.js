// pages/comments/comments.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.urlPrefix + "Infoall/comments",
      data:{
        uid:app.globalData.idda.uid
      },
      success:function(res){
        for (var i = 0; i < res.data.comments.length; i++) {
          var a = res.data.comments[i].time
          var time = new Date(a * 1000)
          var mon = time.getMonth() + 1;
          var day = time.getDate();
          var hour = time.getHours();
          var min = time.getMinutes();
          if (mon < 10) {
            mon = '0' + mon
          }
          if (day < 10) {
            day = '0' + day
          }
          if (hour < 10) {
            hour = '0' + hour
          } if (min < 10) {
            min = '0' + min
          }
          res.data.comments[i].time = mon + '-' + day + ' ' + hour + ':' + min
        }
        that.setData({
          comments:res.data.comments
        })


      },
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