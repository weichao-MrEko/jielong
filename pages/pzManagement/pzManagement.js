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
          theme_id: options.theme_id,
          shuju:res.data.info,
          // actor_user_info: res.data.info.actor_user_info,
          order_num: res.data.order_num,
          user_info:res.data.user_info,
          // participate_time: res.data.participate_time,
          // address_info: res.data.info.address_info,
          specifications: res.data.specifications,
          // actor_id:that.data.actor_id,
          // list_num:res.data.list_num
        })

      }

    })
  },

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

  },
  exportXls(){
    // theme_id: options.theme_id,
    // user_id
    wx.request({
      url: app.globalData.urlPrefix + "excel/dao",
      data:{
        theme_id: this.data.theme_id,
      },
      success:(res)=>{

        wx.downloadFile({
          url: 'https://www.shequnxz.com//public/uploads/excel/qunxiaoque_' + this.data.theme_id+'.xlsx',
          success: function (res) {
            var filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        }) 

      }
    })
   
  }
})