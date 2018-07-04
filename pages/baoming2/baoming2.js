// pages/sousuo/sousuo.js


const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },

  /**
   * 组件的初始数据
   */
  data: {
     sd:true,
     ds:true,
     animationData: {},
     bo:true,
     Content: true,
     Cont:false,
     uname:'',
     uimg:'',
     upimg:[],
     pushurl: [],
     setPlnr: '',
     xname:'',
     descont: '', 
     jiage:'',
     shumu:'',
     shant:null,
     left:0
   
  },
  
   
  
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function () {
      console.log(app.globalData.idda)
      console.log(app.globalData.userInfo)
      this.setData({
        shant: getApp().globalData.tel,
        
      })
    },
    left:function(){
      this.setData({left:0})
    },
    right: function () {
      this.setData({ left: 200 })
    },
    kefu(){
      console.log(app.globalData.tel)
      console.log(this.data.shant)
      wx.navigateTo({
        url: '../kefu/kefu',
      })
    },
    bindGetUserInfo: function (e) {
      console.log(e.detail.userInfo)
      this.setData({
        uname: e.detail.userInfo.nickName,
        uimg: e.detail.userInfo.avatarUrl,
        
      })
    },
    upper: function (e) {
      console.log(e)
      this.setData({
        Content: true,
        Cont: false,})
    },
    lower: function (e) {
      console.log(e)
      this.setData({
        Content: false,
        Cont: true,})
    },
    box: function () {
      
      this.setData({ sd: false
       })

      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.translateY(0).step()

      this.setData({
        animationData: animation.export()
      })   
    },
    infodel:function(ev){
      let index = ev.currentTarget.dataset.index;
      let Img = this.data.pushurl;
      Img.splice(index,1) 
      this.setData({ pushurl: Img})
    },
    boxK:function(){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.translateY(170).step()

      this.setData({
        animationData: animation.export()
      })   

      setTimeout(function(){
        this.setData({
          bo: true,
          sd: true,
          ds: true,
        }) 
      }.bind(this),500)
        
    },
    boxL: function () {
      
          this.setData({
            sd: true,
            bo: false
          })
   
    },

    boxH: function () {
      this.setData({ sd: true })

    },
   
    boxP:function(){
      var that = this;
      var uppimg=[];
      that.setData({ bo: true})
      console.log()
      wx.chooseImage({
        sourceType: ['album'],
        success: function(res) {
          console.log(res)
          var tempFilePaths = res.tempFilePaths
          var old_tp = that.data.pushurl
          for(var i in tempFilePaths){
            old_tp.push(tempFilePaths[i])
          }
          that.setData({
            pushurl: old_tp
          })
          for (var i = 0; i < old_tp.length;i++){
          wx.uploadFile({
            url: app.globalData.urlPrefix + 'signup/uploadImg',
            filePath: old_tp[i],
            name: 'image',
            formData:{
              'user':'test'
            },
            success:function(res){
              //var data=res.data
              console.log(res)
             
                uppimg.push(JSON.parse(res.data).imgPath) 
                that.setData({
                  upimg:uppimg
                })

            }
          })
          }
          
        },
      }) 
    }, 
    boxD:function(){
      this.setData({
        ds:false
      })
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.translateY(0).step()

      this.setData({
        animationData: animation.export()
      })

    },
    boxZ: function () {
      var that = this
      that.setData({ bo: true })
      wx.chooseImage({
        sourceType: ['camera'],
        success: function (res) {
          console.log(res)
          var tempFilePaths = res.tempFilePaths
          var old_tp = that.data.pushurl
          that.setData({
            pushurl: old_tp.concat(tempFilePaths),

          })
          for (var i = 0; i < pushurl.length; i++) {
            wx.uploadFile({
              url: app.globalData.urlPrefix + 'signup/uploadImg',
              filePath: pushurl[i],
              name: 'image',
              formData: {
                'user': 'test'
              },
              success: function (res) {
                //var data=res.data
                console.log(res)
              }
            })
          }
          
        },
      })
    },
   
    Plnr(e){
     
      this.setData({
        setPlnr:e.detail.value
      })
      
    },
    desc(e){
      this.setData({
        descont: e.detail.value
      })
    },
    xiangname(e){
      this.setData({
        xname: e.detail.value
      })
    },
    jiag(e) {
      this.setData({
        jiage: e.detail.value
      })
    },
    
    shum(e){
      this.setData({
        shumu:e.detail.value
      })
    },
    fajielong(ev){
      console.log(ev)
      wx.request({
        url: app.globalData.urlPrefix + 'signup/uploadImg',
        data:{
          user_id:app.globalData.idda.uid,
          dragonTheme: this.data.setPlnr,
          dragonItem:this.data.xname,
          img_path: this.data.upimg,
          descInfo: this.data.descont,
          price: this.data.jiage,
          count: this.data.shumu,
          servPhone: this.data.shant
        },
        success:function(res){
          console.log(res.data)
        }
        
      })
      wx.navigateTo({
        url: '../huodong/huodong',
      })
    },
    boxW: function () {
      var that = this
      that.setData({ ds: true })
      wx.chooseImage({
        sourceType: ['album'],
        success: function (res) {
          console.log(res)
          var tempFilePaths = res.tempFilePaths
          
          that.setData({
            pushurl: tempFilePaths
          })
        },
      })
    }


  }
})
