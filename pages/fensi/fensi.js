// pages/fensi/fensi.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fensiType: [{ num: 2, Type: '所有粉丝' }, { num: 2, Type: '已参与的粉丝'}, { num: 2, Type: '最活跃的粉丝'}],
    curIndex: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.urlPrefix + "smith/fensi",
      success:(res)=>{
        this.data.fensiType[0].num = res.data.fensi_num
        this.data.fensiType[1].num = res.data.join_num
        this.data.fensiType[2].num = res.data.hot_num
        this.setData({
          fensiType: this.data.fensiType,
          user: app.globalData.idda,
          fensi_list: res.data.fensi_list
        })
      }
    })
   
    
  },
  fensi:function(){
    wx.showActionSheet({
      itemList: ['备注','设为总组管理员','设为团长','屏蔽该用户'],
    })
  },
  fensi_type:function(e){
    this.setData({
      curIndex: e.currentTarget.dataset.id
    })
  },
  //签到码
  qiandaoma:function(){
    wx.navigateTo({
      url: '../qianderwm/qianderwm',
    })
  },
  //通知码
  tongzhima: function () {
    wx.navigateTo({
      url: '../qianderwm/qianderwm',
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

  }, 
})