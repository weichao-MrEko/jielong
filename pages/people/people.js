// pages/people/people.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme_id:'',
    user_id:'',
    fen_user_info:'',
    user_login:'',
    people:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.request({
      url: app.globalData.urlPrefix + 'People/cha',
      data: {
        theme_id: options.theme_id,
        user_id: app.globalData.idda.uid
      },
      success:function(res){
        console.log(res)
        that.setData({
          fen_user_info:res.data.fen_user_info,
          people:res.data.people,
        })
        wx.setNavigationBarTitle({
          title: '我带来的('+ that.data.people +')人'
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.oime = this.selectComponent("#time")
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