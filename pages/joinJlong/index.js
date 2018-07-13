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
   item_info:'',
   adr_panduan:'',
   address:''
  

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      var that =this;
     // console.log(options)
      that.setData({
        act: JSON.parse(options.act)
      })
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/join_jl',
        data: {
          act_id: that.data.act.id,
          user_id: that.data.act.user_id,
          theme_id:that.data.act.theme_id
        },
        success: function (res) {
          console.log(res.data)
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
       success: function(res) {
         that.setData({
           address:res.data
         })
       },
     })
    },
    binddata:function(e){
      console.log(e)
    },

    add:function(){
    var aa=  this.data.num
     this.setData({
     num:++aa,
     color:false
     })
    },
    reduce: function () {
     var that=this
     var aa=that.data.num
     if (aa <=0 ) {
         that.setData({
            num:0,
            color:true
          })
          }
         else{
         that.setData({
            num: --aa,
            color:false
          })
          }     
    },
    adr:function(){
      var that=this
      wx:wx.navigateTo({
        url: '../adr/index?uid=' + that.data.act.user_id,
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
    }
  }
})

