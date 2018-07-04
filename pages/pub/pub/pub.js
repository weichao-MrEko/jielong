Page({

  /**
   * 页面的初始数据
   */
  data: {
    pub_text:'',
    uname:'',
    productInfo: {}  
  },
//添加Banner  
bindChooiceProduct: function () {  
  var that = this;  
  
  wx.chooseImage({  
    count: 3,  //最多可以选择的图片总数  
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    success: function (res) {  
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
      var tempFilePaths = res.tempFilePaths;  
      //启动上传等待中...  
      wx.showToast({  
        title: '正在上传...',  
        icon: 'loading',  
        mask: true,  
        duration: 10000  
      })  
      var uploadImgCount = 0;  
      for (var i = 0, h = tempFilePaths.length; i < h; i++) {  
        wx.uploadFile({  
          url: 'https://www.bslxx.com/public/xcxapi/shequ/uploadfilenew',  
          filePath: tempFilePaths[i],  
          name: 'uploadfile_ant',  
          formData: {  
            'imgIndex': i  
          },  
          header: {  
            "Content-Type": "multipart/form-data"  
          },  
          success: function (res) {  
            uploadImgCount++;  
            var data = JSON.parse(res.data);  
            //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
            var productInfo = that.data.productInfo;  
            if (productInfo.bannerInfo == null) {  
              productInfo.bannerInfo = [];  
            }  
            productInfo.bannerInfo.push({   
              "url": data.Url  
            }); 
            console.log(productInfo) 
            that.setData({  
              productInfo: productInfo  
            });  
  
            //如果是最后一张,则隐藏等待中  
            if (uploadImgCount == tempFilePaths.length) {  
              wx.hideToast();  
            }  
          },  
          fail: function (res) {  
            wx.hideToast();  
            wx.showModal({  
              title: '错误提示',  
              content: '上传图片失败',  
              showCancel: false,  
              success: function (res) { }  
            })  
          }  
        });  
      }  
    }  
  })
}, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  setText:function(e){
    this.setData({
      pub_text: e.detail.value
    })
  },
  setUname:function(e){
    this.setData({
      uname: e.detail.value
    })
  },
  pub:function(){
   
   if (this.data.pub_text == '') {
        
          wx.showModal({  
              title: '错误提示',  
              content: '请输入面试经验',  
              showCancel: false,  
              success: function (res) { }  
            })  
   }else{
    var binfo = ""
    if (this.data.productInfo.bannerInfo) {
    binfo = JSON.stringify(this.data.productInfo.bannerInfo)

    }
      // 请求node保存内容的接口
    wx.request({
      url: 'https://www.bslxx.com/public/xcxapi/shequ/save',
      data:{
        pub_text: this.data.pub_text,
        uname: this.data.uname,
        img_path:binfo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:"post",
      success:function(rtb){
        wx.switchTab({
          url: '/pages/me/index',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
           }
             
        })
      }
    })
   }
  
    // 成功后，返回社区列表
  }
})