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
     map:'',
     huabu:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    console.log(scene)
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
          itimg:res.data.theme_imag,
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
  
  },
  eventDraw() {

    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    this.setData({
      huabu:false,
      painting: {
        width: 235,
        height: 355,
        clear: true,
        views: [
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
            top: 0,
            left: 0,
            width: 235,
            height: 355
          },
         
          {
            type: 'image',
            url: this.data.theme.user_img,
            top: 20.5,
            left: 22,
            width: 25,
            height: 25
          },
          {
            type: 'text',
            content: this.data.theme.user_name,
            fontSize: 12,
            color: '#402D16',
            textAlign: 'left',
            top: 20,
            left: 50,
            bolder: true
          },
          {
            type: 'text',
            content: this.data.theme.theme_name,
            fontSize: 12,
            color: '#563D20',
            textAlign: 'left',
            top: 85.5,
            left: 34
          },
          {
            type: 'image',
            url: app.globalData.urlfix + this.data.itimg[0],
            top: 116,
            left: 50.5,
            width: 130,
            height: 150
          },
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
            top: 13,
            left: 130,
            width: 40,
            height: 40
          },
          {
            type: 'text',
            content: this.data.theme.desc_info,
            fontSize: 12,
            lineHeight: 18,
            color: '#383549',
            textAlign: 'left',
            top: 275,
            left: 36,
            width: 147,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: '￥' + this.data.theme.btw_price,
            fontSize: 12,
            color: '#E62004',
            textAlign: 'left',
            top: 322,
            left: 114.5,
            bolder: true
          },
          {
            type: 'text',
            content: '原价:￥138.00',
            fontSize: 0,
            color: '#7E7E8B',
            textAlign: 'left',
            top: 391,
            left: 110,
            textDecoration: 'line-through'
          },
          {
            type: 'text',
            content: '长按识别图中二维码',
            fontSize: 10,
            color: '#383549',
            textAlign: 'left',
            top: 16,
            left: 175.5,
            lineHeight: 18,
            MaxLineNumber: 2,
            breakWord: true,
            width: 40
          }
        ]
      }
    })
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    this.setData({
      huabu:true
    })
  },
  fabujiel:function(){
    wx.navigateTo({
      url: '../jielong/jielong',
    })
  },
  yulan:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
   
    for (var i = 0; i < this.data.itimg.length;i++){
      var bb=[]
      var aa = app.globalData.urlfix + this.data.itimg[i] 
    
    wx.previewImage({
      current: app.globalData.urlfix + this.data.itimg[id],
      urls: [app.globalData.urlfix + this.data.itimg[id] ]
    })
    }
  },
  fenxinghidd:function(){
    this.setData({
      huabu: true
    })
  },
  eventGetImage(event) {
    wx.hideLoading()
    const { tempFilePath } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
  }
})