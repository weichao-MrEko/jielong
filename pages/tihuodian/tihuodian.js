// pages/tihuodian/tihuodian.js
const app=getApp()
var timer 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dored: true,
    site:'',
    text:[
      {name:'提货点编号:', title:'提货点编号'},
      { name:'提货点名称:',title:'请填写提货点名称'}
      ],
    tex:[
      {name:'联系人:',title:'姓名'},
      { name: '微信号:', title: '微信号'},
      { name: '电话号:', title: '联系方式'}],
    tihuodian: { bianhao: '', tiname: '', lianame: '', wx: '', cell: '', map: '', checked:true}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  tihuo:function(e){
   var id=e.target.dataset.id;
   if(id==0){
     this.data.tihuodian.bianhao= e.detail.value
   }
   else{
    this.data.tihuodian.tiname= e.detail.value
   }
   
  },
  lianxi:function(e){
    var id = e.target.dataset.id;
    if (id == 0) {
      this.data.tihuodian.lianame = e.detail.value
    }
    else if(id==1) {
      this.data.tihuodian.wx = e.detail.value 
    }
    else{
      this.data.tihuodian.cell = e.detail.value 
    }
  },
  map:function(){
    var that=this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          success: function (res) {
            that.data.tihuodian.map=res
            that.setData({
              tihuodian: that.data.tihuodian
            })
          },
        })
      }
    })
  },
  queren:function(){
    console.log(this.data.tihuodian)
    var num = 10
    var that=this
    if (that.data.tihuodian.tiname == "" || that.data.tihuodian.tiname == undefined) {
      that.setData({ dored: false })
      timer = setTimeout(function () {
        num--;
        that.setData({ dored: true })
      }, 2000)

    }
    else {
      app.globalData.tihuodian.push(that.data.tihuodian)
      wx:wx.navigateBack({
        delta: 1,
      })
    }
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