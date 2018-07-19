// pages/add_adr/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    name:'',
    mobile:'',
    area:'',
    address:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.data.user_id=options.uid
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  mobileInput(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  areaInput(e) {
    this.setData({
      area: e.detail.value
    })
  },
  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  add_adr:function ()
  {
    var that=this;
    wx.request({
      url: app.globalData.urlPrefix + 'address/saveAdr',
      data: {
        user_id:that.data.user_id,
        name: that.data.name,
        mobile: that.data.mobile,
        area: that.data.area,
        address: that.data.address,
        code: that.data.code
      },
      success: function (res) {
        // console.log(res.data)
        wx.navigateBack({
          delta: 1
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