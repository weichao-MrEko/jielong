// pages/qiandao/qiandao.js

const app=new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.options = JSON.stringify(options) 
    this.setData({
      img:app.globalData.userInfo.avatarUrl
      })
  },
  qiandaoxq:function(){
    wx.navigateTo({
      url: '../qiandao_xiangq/qiandao_xiangq',
    })
  },
  qiandao(){
    wx.showActionSheet({
      itemList: ['签到','部分签到'],
      success:function(res){
          console.log(res)
      }

    })
  },
  erweima:function(){
    wx.navigateTo({
      url: '../qianderwm/qianderwm?xingx=' + this.data.options,
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