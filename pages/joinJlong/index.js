// pages/joinJlong/index
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
   beizhu:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      var that =this;
      that.setData({
        theme_id: options.theme_id,
        user_id:options.user_id
      })
      console.log(that.data.act)
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/join_jl',
        data: {
          user_id: that.data.user_id,
          theme_id:that.data.theme_id
        },
        success: function (res) {
          console.log(res)
          that.setData({
            address_info: res.data.address_info,
            self_info: res.data.self_info,
            item_info: res.data.item_info,
            adr_panduan:res.data.adr_panduan
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
      this.setData({
        self_info: this.data.self_info
      })
      console.log(this.data.self_info)
    },
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
          console.log(this.data.summation.zongjiage )
        }
        this.setData({
          item_info: this.data.item_info,
          summation: this.data.summation,
          color: false
        })
        
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
          }
         that.setData({
           item_info: that.data.item_info,
           summation: this.data.summation,
            color:false
          })
          }    
    },
    adr:function(){
      var that=this
      wx:wx.navigateTo({
        url: '../adr/index?uid=' + that.data.user_id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    changcolro1:function(){
      this.setData({
        color:true
      })
    },
    changcolro2: function () {
      this.setData({
        color: false
      })
    },
    tesu:function(){
      this.setData({
        tesu: false
      })
    },
    add_info:function(){
      var that=this;
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/add_actor',
        data: {
          name: that.data.name,
          mobile: that.data.mobile,
          area: that.data.area,
          address: that.data.address,
          code:that.data.code
        },
        success: function (res) {
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
    beizhu:function(e){
      console.log(e.detail.value)
      this.setData({
        beizhu: e.detail.value
      })

    },
    zhifu:function(){
      console.log(this.data.self_info)
      var that=this;
      wx.request({
        url: app.globalData.urlPrefix+'Joinjl/add_actor',
        data:{
          user_id: app.globalData.idda.uid,
          item: that.data.item_info,
          self_info: that.data.self_info,
          openid: app.globalData.idda.openid,
          price: that.data.summation.zongjiage,
          amount: that.data.summation.zongshu,
          desc: that.data.beizhu,
          act_id: that.data.act.id
        },
        success:function(res){
          var params = JSON.parse(res.data.params)
          var oid=res.data.oid
          console.log(params)
          wx.requestPayment(
            {
              'timeStamp': params.timeStamp,
              'nonceStr': params.nonceStr,
              'package': params.package,
              'signType': params.signType,
              'paySign': params.paySign,
              'success': function (res) {
                console.log(res) 
                wx:wx.request({
                  url: app.globalData.urlPrefix + 'Joinjl/sucf',
                  data:{
                    oid:oid
                  },
                  success: function(res) {},

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
    }
  }
})

