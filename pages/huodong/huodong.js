// pages/huodong/huodong.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangmu:"",
     itimg:"",
     theme:'',
     act: '',
     turl: app.globalData.urlfix,
     map:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
     wx.request({
       url: app.globalData.urlPrefix + 'signup/findDragonItem',
       data: {
         theme_id: options.id,
         user_id: options.uid,
         
       },
       success:function(res){
        
         that.setData({
          xiangmu:res.data.item_result,
          itimg:res.data.theme_img,
          theme:res.data.theme_result,
          act: res.data.act,
          map: JSON.parse(res.data.theme_result.address)
        })
       }
     })
     console.log(that.data.theme)
    },
  
  myhome:function(){
    console.log(this.data.map)
    wx.navigateTo({
      url: '../index/index',
    })
  } ,    
  joinjl: function () {
    var that = this
    //console.log(that.data.theme) 
    //console.log(that.data.xiangmu) 
    wx.navigateTo({
      url: '../joinJlong/index?act=' + JSON.stringify(that.data.act)
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