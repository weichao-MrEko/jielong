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
     huabu:true,
     erweima:'',
     theme_id:'',
     user_id:'',
     comment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  var scene = decodeURIComponent(options.scene)
   // console.log(scene)
    var that=this
    that.setData({
      theme_id: options.id,
      user_id: options.uid
    }), 
    console.log(options)
    wx.request({
      url: app.globalData.urlPrefix + "qrcode/code",
      data: {
        path: 'pages/huodong/huodong?id' + that.data.theme_id + '&uid=' + that.data.user_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          erweima: app.globalData.urlfix + res.data.code_img
        })
      }


    }),
      wx.request({
      url: app.globalData.urlPrefix + "Carryuser/Carryuser",
        data: {
          theme_id: options.id,
          user_id: options.uid,
          theme_uid: options.theme_uid
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
          })
        }

      }),
    that.setData({
      theme_id: options.id,
      user_id: options.uid,
      theme_uid:options.theme_uid
    }), 

    console.log(options)  
     wx.request({
       url: app.globalData.urlPrefix + 'signup/findDragonItem',
       data: {
         theme_id: options.id,
         user_id: options.uid,  
       },
       success:function(res){
         
           var Time=new Date().getTime()
           var sjcha = (Time - res.data.theme_result.add_time * 1000);
           //天
           var tian = Math.floor(sjcha / (24 * 3600 * 1000));
           //小时
           var leave1 = sjcha % (24 * 3600 * 1000);
           var xiaoshi = Math.floor(leave1 / (3600 * 1000));
           //分钟
           var leave2 = leave1 % (3600 * 1000);
           var fenzhong = Math.floor(leave2 / (60 * 1000));
           //秒
           var leave3 = leave2 % (60 * 1000);
           var miao = Math.floor(leave3 / 1000);
           console.log(tian + xiaoshi + fenzhong + miao)
           if (tian > 0) {
             res.data.theme_result.add_time = tian + '天前'
           }
           else if (xiaoshi > 0) {
             res.data.theme_result.add_time = xiaoshi + '小时前'
           }
           else if (fenzhong > 0) {
             res.data.theme_result.add_time = fenzhong + '分钟前'
           }
           else {
             res.data.theme_result.add_time = miao + '秒前'
           }
         
         if (res.data.theme_imag){
           that.data.itimg = res.data.theme_imag
        }
         that.setData({
          xiangmu:res.data.item_result,
          itimg: that.data.itimg,
          theme:res.data.theme_result,
          map: JSON.parse(res.data.theme_result.address)
        })
       }
     })
    },
  zhuangfa:function(){
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
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
      url: '../joinJlong/index?theme_id=' + that.data.theme_id + '&user_id=' + that.data.user_id
    })

  },
  liuyan:function(){
    wx.navigateTo({
      url: '../liuyan/liuyan?theme_id=' + this.data.theme_id,
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
    var that=this
    wx.request({
      url: app.globalData.urlPrefix + 'signup/findDragonItem',
      data: {
        theme_id: that.data.theme_id ,
        user_id: that.data.user_id,
      },
      success: function (res) {
        
        that.setData({
           comment:res.data.comment
        })
      }
    })
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
    var vw = [
     /* {
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
        top: 0,
        left: 0,
        width: 335,
        height: 455
      },*/

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
        top: 65.5,
        left: 30
      },
      
      {
        type: 'image',
        url: this.data.erweima,
        top: 13,
        left: 170,
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
        width: 197,
        MaxLineNumber: 3,
        breakWord: true,
        bolder: true
      },
      {
        type: 'text',
        content: '￥' + this.data.theme.btw_price,
        fontSize: 12,
        color: '#E62004',
        textAlign: 'left',
        top: 352,
        left: 154.5,
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
        left: 215.5,
        lineHeight: 18,
        MaxLineNumber: 2,
        breakWord: true,
        width: 40
      }
    ]
    if (this.data.itimg[0]){
      vw.push({
        type: 'image',
        url: app.globalData.urlfix + this.data.itimg[0],
        top: 86,
        left: 60.5,
        width: 160,
        height: 185
      })
    }
    this.setData({
      huabu:false,
      painting: {
        width: 285,
        height: 385,
        clear: true,
        views: vw
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
    }
    wx.previewImage({
      current: app.globalData.urlfix + this.data.itimg[id],
      urls: [app.globalData.urlfix + this.data.itimg[id] ]
    })
    
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