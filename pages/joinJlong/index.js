// pages/joinJlong/index
const app = getApp();
<<<<<<< HEAD
=======

>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
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
<<<<<<< HEAD
   hid:false,
   hid2:true,
   ad:true,
   tesu:true,
   pay:true,
   ad2:true,
   color:true,
   num:0,
   theme_id:'',
   user_id:'',
   act:'',
   address_info:'',
   self_info:'',
   self_data:[],
   item_info:'',
   adr_panduan:'',
   address:'',
   summation:{zongshu:0,jiage:[],zongjiage:0},
   beizhu:'',
    hzhifu:true,
    hqueren:true,
=======
    
    hid: false,
    hid2: true,
    ad: true,
    tesu: true,
    pay: true,
    ad2: true,
    color: true,
    num: 0,
    theme_id: '',
    user_id: '',
    act: '',
    address_info: '',
    self_info: '',
    self_data: [],
    item_info: '',
    adr_panduan: '',
    address: '',
    summation: {
      zongshu: 0,
      jiage: [],
      zongjiage: 0
    },
    beizhu: '',
    hzhifu: true,
    hqueren: true,
 
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },
  /**
   * 组件的方法列表
   */
  methods: {
<<<<<<< HEAD
    onLoad: function (options) {
      var that =this;
      that.setData({
        theme_id: options.theme_id,
        user_id:options.user_id
=======
    onLoad: function(options) {
      var that = this;
      that.setData({
        theme_id: options.theme_id,
        user_id: options.user_id
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      })
      console.log(that.data.act)
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/join_jl',
        data: {
          user_id: that.data.user_id,
<<<<<<< HEAD
          theme_id:that.data.theme_id
        },
        success: function (res) {
=======
          theme_id: that.data.theme_id
        },
        success: function(res) {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
          console.log(res)
          that.setData({
            address_info: res.data.address_info,
            self_info: res.data.self_info,
            item_info: res.data.item_info,
<<<<<<< HEAD
            adr_panduan:res.data.adr_panduan,
            act:res.data.act
          })
        }
      })
    },
    onShow:function(){
      var that=this;
     wx.request({
       url: app.globalData.urlPrefix + 'joinJl/xuanAdr',
       data: {
         user_id: that.data.user_id
       },
       success: function(res) {
         that.setData({
           address:res.data
         })
       },
     })
    },
    binddata:function(e){
      console.log(e)
      var id = e.currentTarget.dataset.id
      this.data.self_info[id].value=e.detail.value
=======
            adr_panduan: res.data.adr_panduan,
            act: res.data.act
          })
        }
      })
    
    },
    onShow: function() {
      var that = this;
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/xuanAdr',
        data: {
          user_id: that.data.user_id
        },
        success: function(res) {
          that.setData({
            address: res.data
          })
        },
      })
    },
    binddata: function(e) {
      console.log(e)
      var id = e.currentTarget.dataset.id
      this.data.self_info[id].value = e.detail.value
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      console.log(this.data.self_info)
      this.setData({
        self_info: this.data.self_info
      })
      console.log(this.data.self_info)
    },
<<<<<<< HEAD
  /**加号 */
    add:function(e){
     this.data.summation.zongshu=0  
     this.data.summation.zongjiage =0
      var id = e.currentTarget.dataset.id
      var aa = this.data.item_info[id].may_amount
     
      if (aa >= this.data.item_info[id].amount){}
      else{
        this.data.item_info[id].may_amount = aa + 1
        for (var i = 0; i < this.data.item_info.length;i++){         
          this.data.summation.zongshu += this.data.item_info[i].may_amount
          this.data.summation.jiage[i] = this.data.item_info[i].price * this.data.item_info[i].may_amount
          this.data.summation.zongjiage += this.data.summation.jiage[i]
          this.data.summation.zongjiage = Math.round(this.data.summation.zongjiage*100)/100 
         
          console.log(this.data.summation.zongjiage.toFixed(2) )
        }
        if (this.data.summation.zongjiage > 0) {
          this.data.hzhifu = false
        }
        else if (this.data.summation.zongshu > 0) {
=======
    /**加号 */
    add: function(e) {
      this.data.summation.zongshu = 0
      this.data.summation.zongjiage = 0
      var id = e.currentTarget.dataset.id
      var aa = this.data.item_info[id].may_amount

      if (aa >= this.data.item_info[id].amount) {
        wx.showToast({
          title: '库存不足！',
          icon:'none'
        })
      } else {
        this.data.item_info[id].may_amount = aa + 1
        for (var i = 0; i < this.data.item_info.length; i++) {
          this.data.summation.zongshu += this.data.item_info[i].may_amount
          this.data.summation.jiage[i] = this.data.item_info[i].price * this.data.item_info[i].may_amount
          this.data.summation.zongjiage += this.data.summation.jiage[i]
          this.data.summation.zongjiage = Math.round(this.data.summation.zongjiage * 100) / 100

          console.log(this.data.summation.zongjiage.toFixed(2))
        }
        if (this.data.summation.zongjiage > 0) {
          this.data.hzhifu = false
        } else if (this.data.summation.zongshu > 0) {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
          this.data.hqueren = false
        }
        this.setData({
          item_info: this.data.item_info,
          summation: this.data.summation,
          color: false,
          hzhifu: this.data.hzhifu,
          hqueren: this.data.hqueren
        })
<<<<<<< HEAD
        
      }
  
    },
    /**减号 */
    reduce: function (e) {
      this.data.summation.zongshu = 0
      this.data.summation.zongjiage = 0
      console.log(e.currentTarget.dataset.id)
     var that=this
     var id = e.currentTarget.dataset.id
     var aa = that.data.item_info[id].may_amount
     
     console.log(that.data.item_info)
     if (that.data.item_info[id].may_amount <=0 ) {
      that.data.item_info[id].may_amount = 0
         that.setData({
           item_info: that.data.item_info,
            color:true
          })
          }
         else{
          that.data.item_info[id].may_amount = aa-1
          for (var i = 0; i < this.data.item_info.length; i++) {
            this.data.summation.zongshu += this.data.item_info[i].may_amount 
            this.data.summation.jiage[i] = this.data.item_info[i].price * this.data.item_info[i].may_amount
            this.data.summation.zongjiage += this.data.summation.jiage[i]
            this.data.summation.zongjiage = Math.round(this.data.summation.zongjiage * 100) / 100 
          }
       if (this.data.summation.zongjiage==0){
         this.data.hzhifu = true
       }
       else if (this.data.summation.zongshu == 0) {
         this.data.hqueren = true
       }
    
         that.setData({
           item_info: that.data.item_info,
           summation: this.data.summation,
            color:false,
            hzhifu:this.data.hzhifu,
            hqueren:this.data.hqueren
          })
          }    
    },
    adr:function(){
      var that=this
      wx:wx.navigateTo({
=======

      }

    },
    /**减号 */
    reduce: function(e) {
      this.data.summation.zongshu = 0
      this.data.summation.zongjiage = 0
      console.log(e.currentTarget.dataset.id)
      var that = this
      var id = e.currentTarget.dataset.id
      var aa = that.data.item_info[id].may_amount

      console.log(that.data.item_info)
      if (that.data.item_info[id].may_amount <= 0) {
        that.data.item_info[id].may_amount = 0
        that.setData({
          item_info: that.data.item_info,
          color: true
        })
      } else {
        that.data.item_info[id].may_amount = aa - 1
        for (var i = 0; i < this.data.item_info.length; i++) {
          this.data.summation.zongshu += this.data.item_info[i].may_amount
          this.data.summation.jiage[i] = this.data.item_info[i].price * this.data.item_info[i].may_amount
          this.data.summation.zongjiage += this.data.summation.jiage[i]
          this.data.summation.zongjiage = Math.round(this.data.summation.zongjiage * 100) / 100
        }
        if (this.data.summation.zongjiage == 0) {
          this.data.hzhifu = true
        } else if (this.data.summation.zongshu == 0) {
          this.data.hqueren = true
        }

        that.setData({
          item_info: that.data.item_info,
          summation: this.data.summation,
          color: false,
          hzhifu: this.data.hzhifu,
          hqueren: this.data.hqueren
        })
      }
    },

    adr: function() {
      var that = this
      wx: wx.navigateTo({
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
        url: '../adr/index?uid=' + that.data.user_id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
<<<<<<< HEAD
    changcolro1:function(){
      this.setData({
        color:true
      })
    },
    changcolro2: function () {
=======
    changcolro1: function() {
      this.setData({
        color: true
      })
    },
    changcolro2: function() {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      this.setData({
        color: false
      })
    },
<<<<<<< HEAD
    tesu:function(){
=======
    tesu: function() {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      this.setData({
        tesu: false
      })
    },
<<<<<<< HEAD
    add_info:function(){
      var that=this;
=======
    add_info: function() {
      var that = this;
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/add_actor',
        data: {
          name: that.data.name,
          mobile: that.data.mobile,
          area: that.data.area,
          address: that.data.address,
<<<<<<< HEAD
          code:that.data.code
        },
        success: function (res) {
=======
          code: that.data.code
        },
        success: function(res) {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
          console.log(res.data.act)
          that.setData({
            address_info: res.data.address_info,
            self_info: res.data.self_info,
            item_info: res.data.item_info,
            adr_panduan: res.data.adr_panduan
          })
        }
      })
    },
<<<<<<< HEAD
    beizhu:function(e){
=======
    beizhu: function(e) {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      console.log(e.detail.value)
      this.setData({
        beizhu: e.detail.value
      })

<<<<<<< HEAD
    }, 
    zhifu:function(){
      var that=this;
=======
    },
    zhifu: function() {
      var that = this;
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      console.log(that.data.item_info)
      wx.request({
        url: app.globalData.urlPrefix + 'Joinjl/add_actor',
        data: {
          user_id: app.globalData.idda.uid,
          item: that.data.item_info,
          self_info: that.data.self_info,
          openid: app.globalData.idda.openid,
          price: that.data.summation.zongjiage,
          amount: that.data.summation.zongshu,
          desc: that.data.beizhu,
          act_id: that.data.act.id
        },
<<<<<<< HEAD
        success:function(res){
          var params = JSON.parse(res.data.params)
          var oid = res.data.oid 
    
          console.log(params)
          wx.requestPayment(
            {
              'timeStamp': params.timeStamp,
              'nonceStr': params.nonceStr,
              'package': params.package,
              'signType': params.signType,
              'paySign': params.paySign,
              'success': function (res) { 
                wx.request({
                  url: app.globalData.urlPrefix + 'Joinjl/sucf',
                  data:{
                    oid:oid,
                    theme_id: that.data.theme_id,
                    user_id: that.data.user_id,
                    price: that.data.summation.zongjiage
                  },
                  success: function(res) {
                    wx.redirectTo({
                      url: '../huodong/huodong'
                    })
                  },       
                })
              },
              'fail': function (res) { 
                console.log(res)            
              },
              'complete': function (res) {
                console.log(res)
               } 
            })
        }
      })
    },
    queren:function(){
=======
        success: function(res) {
          var params = JSON.parse(res.data.params)
          var oid = res.data.oid

          console.log(params)
          wx.requestPayment({
            'timeStamp': params.timeStamp,
            'nonceStr': params.nonceStr,
            'package': params.package,
            'signType': params.signType,
            'paySign': params.paySign,
            'success': function(res) {
              wx.request({
                url: app.globalData.urlPrefix + 'Joinjl/sucf',
                data: {
                  oid: oid,
                  theme_id: that.data.theme_id,
                  user_id: that.data.user_id,
                  price: that.data.summation.zongjiage
                },
                success: function(res) {
                  wx.redirectTo({
                    url: '../huodong/huodong'
                  })
                },
              })
            },
            'fail': function(res) {
              console.log(res)
            },
            'complete': function(res) {
              console.log(res)
            }
          })
        }
      })
    },
    queren: function() {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
      var that = this;
      console.log(that.data.item_info)
      wx.request({
        url: app.globalData.urlPrefix + 'Joinjl/qrjl',
        data: {
          user_id: app.globalData.idda.uid,
<<<<<<< HEAD
          item: that.data.item_info,//项目
          self_info: that.data.self_info,//别名
          openid: app.globalData.idda.openid,
          price: that.data.summation.zongjiage,
          amount: that.data.summation.zongshu,
          desc: that.data.beizhu,//备注
          act_id: that.data.act.id
        },
        success: function (res) {
=======
          item: that.data.item_info, //项目
          self_info: that.data.self_info, //别名
          openid: app.globalData.idda.openid,
          price: that.data.summation.zongjiage,
          amount: that.data.summation.zongshu,
          desc: that.data.beizhu, //备注
          act_id: that.data.act.id
        },
        success: function(res) {
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
          app.globalData.socket.send({
            data: app.globalData.idda.user_name + '刚刚参加了一个接龙'
          })
          wx.navigateBack({
<<<<<<< HEAD
            delta:1
          })
        }
      }) 
        
      }
      
  }
})

=======
            delta: 1
          })
        }
      })

    },
   

  }
})
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
