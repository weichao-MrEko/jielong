// pages/pzManagement/pzManagement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme_id: '',
    user_id: '',
    actor_user_info: '',
    order_num: '',
    user_info: '',
    participate_time: '',
    address_info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + 'Infoall/pzManagement',
      data: {
        theme_id: options.theme_id,
        user_id: app.globalData.idda.uid,
      },
      success: function(res) {
        that.setData({
          shuju:res.data.info,
          actor_user_info: res.data.info.actor_user_info,
          order_num: res.data.order_num,
          user_info:res.data.user_info,
          participate_time: res.data.participate_time,
          address_info: res.data.info.address_info,
          specifications: res.data.specifications,
          actor_id:that.data.actor_id,
          list_num:res.data.list_num
        })

      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})