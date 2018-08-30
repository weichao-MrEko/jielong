// pages/shangchuantup/shangchuantup.js
const app = getApp();
var tpp=[]
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    pushurl:[],
  has_upload:false,
    upimg:"",
    img: app.globalData.urlfix,
    id:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(app.globalData.upimgs)
     console.log(app.globalData.img)
     this.setData({
       pushurl: app.globalData.upimgs,
       upimg: app.globalData.img,
       id: options.id
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
  box: function (e) {
    var that = this;
    var uppimg = [];
    console.log(e)
    var id=that.data.id
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        for (var j in tempFilePaths) {
          var index1 = tempFilePaths[j].lastIndexOf(".");
          var index2 = tempFilePaths[j].length;
          var postf = tempFilePaths[j].substring(index1, index2);
          console.log(postf)
          var gg = that.data.pushurl
    
          if (postf == ".jpg"||postf==".png") {
            gg[id].push(tempFilePaths[j])
            console.log(gg)
          }
        }
        wx.showLoading({
          title: '上传中',
        })
        that.data.upimg[id] = []
        for (var i = 0; i < gg[id].length; i++) {
          wx.uploadFile({
            url: app.globalData.urlPrefix + 'signup/uploadImg',
            filePath: gg[id][i],
            name: 'image',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              console.log(JSON.parse(res.data).imgPath)  
             that.data.upimg[id].push(JSON.parse(res.data).imgPath)
              console.log(uppimg)
              console.log(that.data.upimg)
              that.setData({
                upimg: that.data.upimg,
                pushurl:gg
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 800)
            }
          })
        }
        
        
      },
    })
   
  },
  infodel: function (ev) {
    var id = this.data.id
   
    let index = ev.currentTarget.dataset.index;
    let Img = this.data.pushurl;
    Img[id].splice(index, 1)
    this.data.upimg[id].splice(index, 1)
    this.setData({
       pushurl: Img,
       upimg: this.data.upimg
     })
  },
  tup: function (e) {
    let ind = e.currentTarget.dataset.index
    var id=this.data.id
    var that = this
    var uppimg = [];
    console.log(ind)
    wx.showActionSheet({
      itemList: ["替换图片", "删除"],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            sourceType: ['album','camera'],
            count: '1',
            success: function (res) {
              console.log(ind)
              var tempFilePaths = res.tempFilePaths
              var ss = that.data.pushurl
              for (var g in tempFilePaths){
                var index1 = tempFilePaths[g].lastIndexOf(".");
                var index2 = tempFilePaths[g].length;
                var postf = tempFilePaths[g].substring(index1, index2);
                console.log(postf)
        

                if (postf == ".jpg" || postf == ".png") {
                  ss[id].splice(ind, 1, tempFilePaths)
                  console.log(ss)
                }
              }
              wx.showLoading({
                title: '上传中',
              })
              that.data.upimg[id] = []
              for (var j = 0; j < ss[id].length; j++) {
                console.log(String(ss[j]) )
                wx.uploadFile({
                  url: app.globalData.urlPrefix + 'signup/uploadImg',
                  filePath: String(ss[id][j]) ,
                  name: 'image',
                  formData: {
                    'user': 'test'
                  },
                  success: function (res) {
                    //var data=res.data
                    console.log(res)
                    that.data.upimg[id].push(JSON.parse(res.data).imgPath)
                    uppimg.push(JSON.parse(res.data).imgPath)
                    console.log(that.data.upimg)
                    that.setData({
                      upimg: that.data.upimg,
                      pushurl: ss
                    })
                    setTimeout(function () {
                      wx.hideLoading()
                    }, 800)
                  }
                })
              }
            }
            
          })
        }
        
        else if (res.tapIndex == 1) {
          let aa = that.data.pushurl
          aa[id].splice(ind, 1)
          that.data.upimg[id].splice(ind, 1)
          that.setData({
            pushurl: aa,
            upimg: that.data.upimg
          })
        }
        console.log(that.data.upimg)
      }
    })
  },
  queding:function(){
    app.globalData.upimgs[this.data.id]=this.data.pushurl[this.data.id]
    app.globalData.img[this.data.id] = this.data.upimg[this.data.id]
    console.log(this.data.pushurl)
    console.log(this.data.upimg)
    console.log(app.globalData.img)
    console.log(app.globalData.upimgs)
   wx.navigateBack({
     delta:1
   })
    
  }
})