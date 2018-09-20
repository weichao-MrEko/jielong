// pages/liuyan/liuyan.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liuyan:'',
    theme_id:'',
    dored:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//    console.log(app.globalData.idda)  
    this.setData({
      theme_id: options.theme_id,
      to_id: options.to_id
  })
  },
  qux:function(){
    wx.navigateBack({
      delta:1
    })
  },
  fasong: function () {
    var that=this
    if (!that.data.liuyan){
      var num = 10, timer;
      that.setData({ dored: false })
      timer = setTimeout(function () {
        num--;
        that.setData({ dored: true })
      }, 2000)
    }
    else{
    wx:wx.request({
      url: app.globalData.urlPrefix +'Signup/add_comment',
      data: {
        theme_id: this.data.theme_id,
        to_id: this.data.to_id,
        user_id: app.globalData.idda.uid,
        user_name: app.globalData.idda.user_name,
        user_image: app.globalData.idda.uimg,
        comment:this.data.liuyan
      },
      success:function(res){     
        wx.navigateBack({
          delta: 1
        })
      }
    })
    }
  },
  liuyan:function(e){
  
    this.setData({
      liuyan: e.detail.value
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