// pages/kefu/kefu.js

const app = getApp();

Page({
  /** * 页面的初始数据*/
  data: {
      tel: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  queren(e) {
    console.log(this.data.tel)
    app.globalData.tel=this.data.tel
   
     wx.navigateBack ({
      delta:1
    })
  },
  phone(e) {
    this.setData({
      tel : e.detail.value,

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