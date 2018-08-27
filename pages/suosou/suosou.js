// pages/suosou/suosou.js
const app = getApp()
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
   uid:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (op) {
      this.setData({
        uid:op.uid
      })
    },
    search:function(e){
     console.log(e.detail.value)
     wx.request({
       url: app.globalData.urlPrefix + 'signup/findDragonItem',
       data: {
      
         user_id: this.data.uid,
         theme_name: e.detail.value
       },
       success:function(res){
          console.log(res)
       }
     })
    }
  }
})
