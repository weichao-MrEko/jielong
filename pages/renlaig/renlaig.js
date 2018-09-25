// pages/renlaig/renlaig.js
const app = getApp()
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
    var that = this;
    console.log(options)
    wx.request({
        url: app.globalData.urlPrefix + 'Infoall/activityStatistics',
        data:{
          user_id:app.globalData.idda.uid,
          theme_id:options.theme_id
        },
        success:function(res){
          that.setData({
            may_amount: res.data.may_amount,
            people:res.data.people,
            people_list: res.data.people_list,
            login_num: options.login_num,
            price:res.data.price,
            login_time:res.data.login_time,
            come_people: res.data.come_people,
            conversion: res.data.come_people / res.data.people
          })
          console.log(that.data.conversion)
          that.setData({conversion  : (that.data.conversion * 100).toFixed(2)})
          
          if (that.data.login_time<60){
            that.setData({
              login_time: that.data.login_time+'秒'
            })         
             }else{
            that.setData({
              login_time: parseInt(that.data.login_time/60) + '分钟'
            })         
             }
          
        },
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.oime = this.selectComponent("#time")
    console.log(1)
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