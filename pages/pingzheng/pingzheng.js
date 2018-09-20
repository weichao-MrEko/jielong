  // pages/pingzheng/pingzheng.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head:["已参与","待支付","已完成"],
    curindex:0,
    pzAllInfo:'',
    pzNotPay:'',
    jl_type:['报名接龙','团购接龙','打卡','聚会报名','拼团接龙','课程预约']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
    wx.request({
      url: app.globalData.urlPrefix+'Infoall/findInfo',
      data:{
        uid: app.globalData.idda.uid,
      },
      success:function(res){  
        that.timer()

        for(var i=0;i<res.data.all_ord.length;i++){
          res.data.all_ord[i].address=JSON.parse(res.data.all_ord[i].address)
        }
        for(var i=0;i<res.data.not_pay.length;i++){
          res.data.not_pay[i].address = JSON.parse(res.data.not_pay[i].address)
        }
        console.log(res.data.all_ord)
        that.setData({
          pzAllInfo: res.data.all_ord,
          pzNotPay: res.data.not_pay,
          completed: res.data.completed,
          uid: app.globalData.idda.uid,
        })
      }
    })
  },
  head:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      curindex:id
    })
  },
   /**
   * 获取时间
   */
  timer:function(){
    var now_time = (new Date()).valueOf();
    console.log(now_time);
  },
  /**
   * 点击跳转到主题页面
   */
  jump:function(e){
    var i=e.currentTarget.dataset.id;
    var a =this.data.pzAllInfo[i].theme_id;

wx.navigateTo({
  url: '../huodong/huodong?uid=' + app.globalData.idda.uid + '&theme_uid=' + this.data.pzAllInfo[i].user_id+'&id='+a,
})

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  map:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.openLocation({
      latitude: this.data.pzAllInfo[id].address[0].latitude,
      longitude: this.data.pzAllInfo[id].address[0].longitude,
      scale: 28,
      name: this.data.pzAllInfo[id].address[0].name,
      address: this.data.pzAllInfo[id].address[0].address
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