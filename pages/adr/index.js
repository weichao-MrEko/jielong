// pages/adr/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    adrs:[{
      ad_id:'',
      name:'',
      mobile:'',
      area:'',
      address:'',
      code:''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (options.uid){
    //  that.setData({})
       that.data.user_id = options.uid
       wx.request({
         url: app.globalData.urlPrefix + 'address/searchAdr',
         data: {
           user_id: that.data.user_id,
         },
         success: function (res) {
          console.log(res.data)
           for(var i=0;i<res.data.length;i++){
             that.data.adrs.push({ad_id:res.data[i].id, name: res.data[i].name, mobile: res.data[i].phone,area:res.data[i].area,address:res.data[i].address,code:res.data[i].code});
             that.setData({
               adrs: that.data.adrs
             })   
           }
         }
       })
    }

  },
  ad2:function () {
    wx: wx.navigateTo({
      url: '../add_adr/index?uid=' + this.data.user_id,
      success: function (res) {

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  xuan_ad: function (e) {
    let that = this
    let eid = e.currentTarget.dataset.id  
    //console.log(that.data.adrs[eid]);
    wx.request({
      url: app.globalData.urlPrefix + 'address/xuanAdr',
      data: {
        ad_id: that.data.adrs[eid].ad_id,
        user_id:that.data.user_id
      },
      success: function (res) {
         if(res.data==1){
           wx.navigateBack({
             delta:1
           })
         }
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
    this.onLoad()
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