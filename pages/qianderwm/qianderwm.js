// pages/qianderwm/qianderwm.js
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
    let that=this
    let xingx = JSON.parse(options.xingx)
    console.log(xingx)
    wx.request({
      url: app.globalData.urlPrefix + "qrcode/code",
      data: {
        path: 'pages/huodong/huodong?id=' + xingx.theme_id + '&uid=' + xingx.uid + '&theme_uid=' + xingx.theme_uid + '&qiandao=' + true
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          erweima: app.globalData.urlfix + res.data.code_img
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