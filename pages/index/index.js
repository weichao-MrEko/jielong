  //index.js
//获取应用实例

const app = getApp()

Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    zhuti: '',
    xmu: '',
    see_num:0,
    turl: app.globalData.urlfix,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    idda: {},
    time: '',
    show: true
  },
  onPullDownRefresh: function() {
    this.jlcon();
    wx.stopPullDownRefresh() //停止下拉刷新
    /*    wx.showNavigationBarLoading() //在标题栏中显示加载
      setTimeout(function () {
        // complete
      
        wx.hideNavigationBarLoading() //完成停止加载
      
      }, 1500);
        //模拟加载*/

  },
  onReachBottom: function() {
    

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jielong: function() {
    wx: wx.navigateTo({
      url: '../jielong/jielong',
    })
  },
  onShow: function() {
    // this.jlcon()

 

  },

  //主页搜索主题
  suosou: function() {
    wx.navigateTo({
      url: '../suosou/suosou?uid=' + app.globalData.idda.uid
    })
  },

  pingzheng: function() {
    wx.navigateTo({
      url: '../pingzheng/pingzheng',
    })
  },

  jieneiyong: function(e) {
    let that = this
    let eid = e.currentTarget.dataset.id
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx:wx.request({
      url: app.globalData.urlPrefix + "Infoall/friend",
      data: {
        theme_id: that.data.zhuti[eid].id ,
        user_id:app.globalData.idda.uid
      },
    
      success: function(res) {
        wx.hideLoading()
        wx: wx.navigateTo({
          url: '../huodong/huodong?id=' + that.data.zhuti[eid].id + '&uid=' + app.globalData.idda.uid + '&theme_uid=' + that.data.zhuti[eid].user_id,

        })
      },
   
    })
  

  },

  onLoad: function() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    if (app.globalData.idda) {
      this.setData({
        idda: app.globalData.idda,
        hasUserInfo: true
      })

      this.jlcon()

    }
    app.userInfoReadyCallback = res => {
      
      
      if (app.globalData.idda) {
          this.setData({
            idda: app.globalData.idda,
            hasUserInfo: true
          })
    
        this.jlcon()

      } 
        this.setData({
          userInfo: res.userInfo,
        })
          

     
        
       
    }
 
    wx.request({
      url: app.globalData.urlPrefix + 'Socketi/show',
      success: (res) => {
        this.setData({
          show: res.data
        })
      }
    })
    // if (app.globalData.userInfo) {
    //   
    
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     idda: app.globalData.idda,
    //     hasUserInfo: true
    //   }) 
    //   //  this.jlcon()
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   
    //   app.userInfoReadyCallback = res => {
    //     
      
    //     this.setData({
    //       userInfo: res.userInfo,
    //       idda: app.globalData.idda,
    //       hasUserInfo: true
    //     })
    //     this.jlcon()
    //   }

    // } else {
    //   

    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }


  },
  // 进入订阅
  dingyue: function () {
    wx.navigateTo({
      url: '../friend/friend?user_id=' + app.globalData.idda.uid

    })
  },
  getUserInfo: function(e) {
    

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
  comments: function() {
    wx.navigateTo({
      url: '../comments/comments'
    })
  },
  jlcon: function() {
    var Time = new Date().getTime()
  
    var that = this
    
    wx.request({
      url: app.globalData.urlPrefix + "User/jl_index",
      data: {
       uid:app.globalData.idda.uid
      },
      success: (res)=> {
      
        for (var i = 0; i < res.data.theme.length; i++) {
          var sjcha = (Time - res.data.theme[i].add_time * 1000);
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
            res.data.theme[i].add_time = tian + '天前'
          } else if (xiaoshi > 0) {
            res.data.theme[i].add_time = xiaoshi + '小时前'
          } else if (fenzhong > 0) {
            res.data.theme[i].add_time = fenzhong + '分钟前'
          } else if (miao < 0) {
            res.data.theme[i].time = 1 + '秒前'

          } else {
            res.data.theme[i].add_time = miao + '秒前'
          }
        }
      
        that.setData({
          zhuti: res.data.theme,
          see_num: res.data.see_num,
          time: Time
        })



       

      },


      


    })
    wx.request({
      url: app.globalData.urlPrefix + 'Infoall/first',
      data: {
        user_id: app.globalData.idda.uid,
      },
      success: function () {
        
      }
    })

  },
  yue(){
    wx.navigateTo({
      url: '../tixian/tixian',
    })
  }

})