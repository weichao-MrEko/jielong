// pages/wuliufs/wuliufs.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    xian:true,
    shi:true,
    angle:90,
    contacts:'',
    lianxi:[
      { name: '联系人', checked: false },
      { name: '联系电话', checked: false },
      { name: '联系地址', checked: false }
      ],
    wuliu:['没有物流','快递发货','提货点自提']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  picker:function(e){
    var that=this
    if (e.detail.value==0){
      that.setData({
        xian:true,
        shi: true
      })
    }
    else if (e.detail.value == 1){
      that.setData({
        xian: true,
        shi:false
      })
    }
    else if(e.detail.value==2){
      that.setData({
        xian: false,
        shi: true

      })
    }
    that.setData({
      index:e.detail.value,
    })
  },
  buchong:function(){
    if(this.data.shi==true){
    this.setData({
      shi:false,
      angle:270
    })
    }
    else{
      this.setData({
        shi: true,
        angle: 90
      })
    }
  },
  /**添加提货点 */
  tihuodian:function(){
    wx.navigateTo({
      url: '../tihuodian/tihuodian',
    })
  },
  tihuobox:function(e){
    var id=e.target.dataset.id
    if (this.data.tihuo[id].checked==true){
      this.data.tihuo[id].checked = false
    }
    else {
      this.data.tihuo[id].checked = true
      }
  },
  lianxf:function(e){
    this.setData({contacts:e.detail.value})
  },
  btn:function(){
    if(this.data.index==1){
      app.globalData.wuliufs.fangshi = this.data.wuliu[this.data.index] 
      app.globalData.wuliufs.contacts = this.data.contacts
    }
    else if(this.data.index == 2) {
      app.globalData.wuliufs.fangshi = this.data.wuliu[this.data.index]
      app.globalData.wuliufs.contacts = this.data.contacts
      for (var i = 0; i < this.data.tihuo.length;i++){
       
        if (this.data.tihuo[i].checked == true){
          app.globalData.wuliufs.fangshi = this.data.wuliu[this.data.index]
          app.globalData.wuliufs.contacts = this.data.contacts
          app.globalData.wuliufs.tihuo=[]
          app.globalData.wuliufs.tihuo.push(this.data.tihuo[i])
        }
      }
    }
    wx:wx.navigateBack({
      delta: 1,
    })
    console.log(app.globalData.wuliufs)
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
    this.setData({ tihuo: app.globalData.tihuodian})
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