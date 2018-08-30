// pages/pzManagement/pzManagement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    theme_id:'',
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // wx.request({
    //   url: app.globalData.urlPrefix + "Infoall/pzManagement",
    //   data:{
    //       user_id = options.user_id,
    //       theme_id = options.theme_id
    //   },
    //   success:function(res){
    //     console.log(1231231)
    //     that.setData({

    //     })
    //   },
    // })
=======
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
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
    wx.request({
      url: app.globalData.urlPrefix + 'Infoall/pzManagement',
      data: {
        theme_id: options.theme_id,
        user_id: app.globalData.idda.uid,
      },
<<<<<<< HEAD
      success: function (res) {
        console.log(res.data)

        that.setData({


        })
=======
      success: function(res) {
        that.setData({
          theme_id: options.theme_id,
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

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      }

    })
  },
<<<<<<< HEAD

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
=======
  // 搜索框失去焦点，进行查询
  chaxun: function (a) {
    var that = this
    console.log(a.detail.value)
    wx.request({
      url: app.globalData.urlPrefix + 'Infoall/search',
      data: {
        theme_id: this.data.theme_id,
        name: a.detail.value
      },
      success:function(res){
        that.setData({
          shuju: res.data.info,
          actor_user_info: res.data.info.actor_user_info,
        })
        console.log(res.data.info)
      }
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
  onShow: function () {
  
=======
  onShow: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
<<<<<<< HEAD
  onHide: function () {
  
=======
  onHide: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },

  /**
   * 生命周期函数--监听页面卸载
   */
<<<<<<< HEAD
  onUnload: function () {
  
=======
  onUnload: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
<<<<<<< HEAD
  onPullDownRefresh: function () {
  
=======
  onPullDownRefresh: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },

  /**
   * 页面上拉触底事件的处理函数
   */
<<<<<<< HEAD
  onReachBottom: function () {
  
=======
  onReachBottom: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },

  /**
   * 用户点击右上角分享
   */
<<<<<<< HEAD
  onShareAppMessage: function () {
  
=======
  onShareAppMessage: function() {

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  }
})