// pages/qiandaoqueren/qiandaoqueren.js
const app = new getApp()

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
    this.setData({
      id: options.id,
      uid: options.uid,
      theme_uid: options.theme_uid,
    })
    wx.request({
      url: app.globalData.urlPrefix + "qiandao/findself",
      data: {
        theme_id: options.id,
        uid: options.uid,
      },
      success: (res) => {
        this.setData({
          info: res.data,
        })
      }
    })
  },
  confirm(e){
    let id = e.target.dataset.index
    
    wx.request({
      url: app.globalData.urlPrefix + "qiandao/dodo",
      data: {
        id: id,
        qiandao_type:2,
      },
      success: (res) => {
        wx.showToast({
          title: '确认成功',
        })
        wx.navigateBack({
          delta:1
        })
      }
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