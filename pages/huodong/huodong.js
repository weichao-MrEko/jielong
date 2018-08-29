// pages/huodong/huodong.js
const app = getApp();
var time = null,
  Time, Stime, Etime, Daojitime = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangmu: "",
    itimg: "",
    theme: '',
    act: '',
    turl: app.globalData.urlfix,
    map: '',
    huabu: true,
    erweima: '',
    theme_id: '',
    user_id: '',
    comment: '',
    baomingren: '',
    btn: 'woyao',
    apply: '我要接龙',
    shangpin:true,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    dataList: {},
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    guanli: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: app.globalData.urlPrefix + "Infoall/statistics",
    })
    if (options.theme_uid == app.globalData.idda.uid) {
      this.setData({
        guanli: false
      })
    }
    var that = this
    console.log(options)
    wx.request({
        url: app.globalData.urlPrefix + "qrcode/code",
        data: {
          path: 'pages/huodong/huodong?id=' + options.id + '&uid=' + options.uid + '&theme_uid=' + options.theme_uid
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            erweima: app.globalData.urlfix + res.data.code_img
          })
        }
      }),
      wx.request({
        url: app.globalData.urlPrefix + 'Infoall/lo',
        data: {
          theme_id: options.id,
          user_id: app.globalData.idda.uid,
          theme_uid: options.theme_uid
        },
        success: function(res) {
          console.log(res.data)

          that.setData({
            login_num: res.data.login_num,
            people: res.data.people

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
        success: function(res) {}

      }),
      that.setData({
        theme_id: options.id,
        user_id: options.uid,
        theme_uid: options.theme_uid,

      })
    wx.request({
      url: app.globalData.urlPrefix + 'Infoall/friend',
      data: {
        user_id: app.globalData.idda.uid,
        theme_id: options.id
      },
      success: function () {
        console.log(21321232132)
      }
    })
    app.globalData.socket.send({
      data: 'home'
    })

  },
  pzManagement:function(){
    wx.navigateTo({
      url: '../pzManagement/pzManagement?theme_id=' + this.data.theme_id + '&user_id=' + this.data.user_id
    })
  },
  FabuTime: function() {
    console.log(this.data.theme)
    var Time = new Date().getTime()
    var sjcha = (Time - this.data.theme.add_time * 1000);
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
    if (tian > 0) {
      this.data.theme.add_time = tian + '天前'
    } else if (xiaoshi > 0) {
      this.data.theme.add_time = xiaoshi + '小时前'
    } else if (fenzhong > 0) {
      this.data.theme.add_time = fenzhong + '分钟前'
    } else if (miao < 0) {
      console.log(20)
      this.data.theme.add_time = 1 + '秒前'
    } else {
      console.log(30)
      this.data.theme.add_time = miao + '秒前'
    }
    this.setData({
      theme: this.data.theme
    })
  },
  zhuangfa: function() {
    this.onShareAppMessage()
  },
  myhome: function() {
    console.log(this.data.map)
    wx.navigateTo({
      url: '../index/index',
    })
  },
  joinjl: function() {
    var that = this
    if (that.data.btn == 'woyao') {
      wx.navigateTo({
        url: '../joinJlong/index?theme_id=' + that.data.theme_id + '&user_id=' + that.data.user_id
      })
    }
  },
  chamap: function(e) {
    var id = e.currentTarget.dataset.id
    wx.openLocation({
      latitude: this.data.map[id].latitude,
      longitude: this.data.map[id].longitude,
      scale: 28,
      name: this.data.map[id].name,
      address: this.data.map[id].address
    })
  },
  liuyan: function() {
    wx.navigateTo({
      url: '../liuyan/liuyan?theme_id=' + this.data.theme_id,
    })
  },
  findDrag: function(callback) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.urlPrefix + 'signup/findDragonItem',
      data: {
        theme_id: that.data.theme_id,
        user_id: that.data.user_id,
      },
      success: function(res) {



        if (res.data.theme_imag) {
          that.data.itimg = res.data.theme_imag
        };
        if (res.data.theme_result.jl_type == 2) {
          that.setData({
            apply: '我要打卡'
          })
        }
        if (res.data.theme_result.jl_type == 3) {
          that.setData({
            apply: '我要聚会'
          })
        } else if (res.data.theme_result.jl_type == 5) {
          that.setData({
            apply: '报名课程'
          })
        } else if (res.data.theme_result.jl_type == 4) {

          that.setData({
            shangpin:false,
            xiangmu: that.data.xiangmu,
            apply: '我要拼团'
          })
        }

        for (var y = 0; y < res.data.all_ord.length; y++) {
          if (res.data.all_ord[y].user_id == app.globalData.idda.uid) {
            if (res.data.all_ord[y].status > 0) {
              that.setData({
                btn: 'buwoyao',
                apply: '已参与'
              })
            }
          }
        }
        if (!res.data.theme_result.address) {
          that.data.map = JSON.parse(res.data.theme_result.address)
        }

        for (var i = 0; i < res.data.item_result.length; i++) {
          if (res.data.item_result[i].p_goods_img){
          res.data.item_result[i].p_goods_img = JSON.parse(res.data.item_result[i].p_goods_img)
          }
        }
        console.log(res.data.item_result)
        that.setData({
          xiangmu: res.data.item_result,
          itimg: that.data.itimg,
          theme: res.data.theme_result,
          map: that.data.map,
        })
        that.FabuTime()
        setTimeout(function() {
          wx.hideLoading()
        }, 500)

        return callback(res)
      }
    })
  },
  //商品减号
  spjian:function(e){
    var i=e.currentTarget.dataset.id
    if (this.data.xiangmu[i].may_amount>0){
      this.data.xiangmu[i].may_amount--
      this.setData({
        xiangmu: this.data.xiangmu
      })
    }
   
  },
  //商品加号
  spjia:function(e){
    var i = e.currentTarget.dataset.id
    if (this.data.xiangmu[i].may_amount < this.data.xiangmu[i].amount) {
    this.data.xiangmu[i].may_amount++
      this.setData({
        xiangmu:this.data.xiangmu
      })
    }
      console.log(this.data.xiangmu)
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this

    console.log(1)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this

    that.findDrag(function(res){
      if (res.data.theme_result.jl_type == 2) {
        Stime = new Date(Y + '-' + M + '-' + D + ' ' + that.data.xiangmu[0].start).getTime();
        Etime = new Date(Y + '-' + M + '-' + D + ' ' + that.data.xiangmu[0].end).getTime();
        if (Time > Stime) {
          that.Dakat()
        } else {
          that.Daojis()
        }
      }
    })

   // that.FabuTime()
 
  

  },
  Daojis: function() {
    var that = this

    Daojitime = setInterval(function() {

      var Y = new Date().getFullYear()
      var M = new Date().getMonth() + 1
      var D = new Date().getDate()
      var ersi = 60 * 60 * 24
      var tomorrow = Y + '/' + M + '-' + (D + 1)
      if (tomorrow > ersi) {
        tomorrow = Y + '/' + M + '-' + D
      }
      var dangqian = new Date().getTime()
      var tie = new Date(tomorrow + ' ' + that.data.xiangmu[0].start)
      var mingt = tie.getTime()
      var leave = mingt - dangqian
      /**xi小时 */
      var leave1 = leave % (24 * 3600 * 1000)
      var hour = Math.floor(leave1 / (3600 * 1000))
      var hours = hour.toString()
      var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
      var minute = Math.floor(leave2 / (60 * 1000))
      var minutes = minute.toString()
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
      var second = Math.round(leave3 / 1000)
      var seconds = second.toString()
      if (hours == 0 && minutes == 0 && seconds == 0) {
        this.Dakat()
      }
      leave--;
      console.log(leave)
      that.setData({
        countDownHour: hours + ':',
        countDownMinute: minutes + ':',
        countDownSecond: seconds
      })
    }, 1000)
  },
  Dakat: function() {
    var that = this
    var Dakatime = (Etime - Time) / 1000
    time = setInterval(function() {
      var day = Math.floor(Dakatime / (60 * 60 * 24));
      var hour = Math.floor(Dakatime / (60 * 60)) - (day * 24);
      var minute = Math.floor(Dakatime / 60) - (day * 24 * 60) - (hour * 60);
      var second = Math.floor(Dakatime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      Dakatime--;
      that.setData({
        countDownHour: '打',
        countDownMinute: '',
        countDownSecond: '卡'
      })
      console.log(Dakatime)
      if (Dakatime <= 0) {
        clearInterval(time)
        that.Daojis()
        that.setData({
          dakacolor: 'border: 8rpx solid #999;color:#999',
        })
      }
    }, 1000)


  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log(12)
    clearInterval(time);
    clearInterval(Daojitime);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.urlPrefix + 'signup/findDragonItem',
      data: {
        theme_id: that.data.theme_id,
        user_id: that.data.user_id,
      },
      success: function(res) {
        var Time = new Date().getTime();
        for (var i = 0; i < res.data.comment.length; i++) {
          var sjcha = (Time - res.data.comment[i].time * 1000);
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

          if (tian > 0) {
            res.data.comment[i].time = tian + '天前'
          } else if (xiaoshi > 0) {
            res.data.comment[i].time = xiaoshi + '小时前'
          } else if (fenzhong > 0) {
            res.data.comment[i].time = fenzhong + '分钟前'
          } else if (miao < 0) {
            res.data.comment[i].time = 1 + '秒前'
          } else {
            res.data.comment[i].time = miao + '秒前'
          }
        }
        for (var y = 0; y < res.data.all_ord.length; y++) {
          if (res.data.all_ord[y].user_id == app.globalData.idda.uid) {
            if (res.data.all_ord[y].status > 0) {
              that.setData({
                btn: 'buwoyao',
                apply: '已参与'
              })
            }
          }
        }
        res.data.comment.reverse()
        that.setData({
          comment: res.data.comment,
          baomingren: res.data.all_ord
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 500)
      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(2)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log(this.data.itimg[0])
    return {
      title: this.data.theme.theme_name,
      imageUrl: this.data.turl + this.data.itimg[0],
      path: 'pages/huodong/huodong?id=' + this.data.theme_id + '&uid=' + this.data.uid + '&theme_uid=' + this.data.theme_uid
    }
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
    if (this.data.itimg[0]) {
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
      huabu: false,
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
      huabu: true
    })
  },
  fabujiel: function() {
    wx.navigateTo({
      url: '../jielong/jielong',
    })
  },
  yulan: function(e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id

    for (var i = 0; i < this.data.itimg.length; i++) {
      var bb = []
      var aa = app.globalData.urlfix + this.data.itimg[i]
    }
    wx.previewImage({
      current: app.globalData.urlfix + this.data.itimg[id],
      urls: [app.globalData.urlfix + this.data.itimg[id]]
    })

  },
  fenxinghidd: function() {
    this.setData({
      huabu: true
    })
  },
  eventGetImage(event) {
    wx.hideLoading()
    const {
      tempFilePath
    } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
  },
  renlaig: function() {
    wx.navigateTo({
      url: '../renlaig/renlaig?theme_id=' + this.data.theme_id + '&login_num=' + this.data.login_num,
    })
  },
  edit: function() {
    wx.navigateTo({
      url: '/pages/baoming0/edit?id=' + this.data.theme_id + '&uid=' + this.data.user_id + '&theme_uid=' + this.data.theme_uid,
    })
  },
})