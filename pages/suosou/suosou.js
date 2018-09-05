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
    jieneiyong: function (e) {
      let that = this
      let eid = e.currentTarget.dataset.id
      wx: wx.request({
        url: app.globalData.urlPrefix + "Infoall/friend",
        data: {
          theme_id: that.data.zhuti[eid].id,
          user_id: app.globalData.idda.uid
        },

        success: function (res) {
          wx: wx.navigateTo({
            url: '../huodong/huodong?id=' + that.data.zhuti[eid].id + '&uid=' + app.globalData.idda.uid + '&theme_uid=' + that.data.zhuti[eid].user_id,

          })
        },

      })


    },
    search:function(e){
      var that =this
     wx.request({
       url: app.globalData.urlPrefix + 'Infoall/searchAll',
       data: {
      
         user_id: this.data.uid,
         theme_name: e.detail.value
       },
       success:function(res){
         var Time = new Date().getTime()
         console.log(res.data)
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
           time: Time
         })

       }
     })
    }
  }
})
