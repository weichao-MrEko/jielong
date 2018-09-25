// pages/qiandao/qiandao.js

const app=new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.data.options = JSON.stringify(options) 
    this.setData({
      img: app.globalData.userInfo.avatarUrl,
      uinfo:app.globalData.userInfo,
      theme_name: options.theme_name,
      pz_num: options.pz_num,
      })
  
      wx.request({
        url: app.globalData.urlPrefix + "qiandao/index",
        data:{
          theme_id: options.theme_id
        },
        success:(res)=>{
          this.setData({ 
            rtnD: res.data.rtn,
            act_id_a:res.data.act_id_a
          })
        }
      })
  },
  qiandaoxq:function(){
    wx.navigateTo({
      url: '../qiandao_xiangq/qiandao_xiangq',
    })
  },
  qiandao(e){
    let id = e.target.dataset.index
    let typet = e.target.dataset.type
    wx.showActionSheet({
      itemList: ['签到','部分签到'],
      success:(res)=>{
        let t = res.tapIndex == 0?2:3
        this.data.act_id_a[id].qiandao_type = t
        if (typet + res.tapIndex == 1){
          --this.data.rtnD.w_qd
        } else if (typet == 3) {
          --this.data.rtnD.bf_qd
        } else if (typet == 2) {
          --this.data.rtnD.y_qd
        }
        let title = ''
        if (t == 2) {
          ++this.data.rtnD.y_qd
          title='签到成功'
        } else if (t == 3) {
          ++this.data.rtnD.bf_qd
          title = '部分签到成功'
          
        }

        this.setData({
          act_id_a: this.data.act_id_a,
          rtnD: this.data.rtnD
        })
         wx.request({
           url: app.globalData.urlPrefix + "qiandao/dodo",
           data:{
             id:id,
             qiandao_type:t
           },
           success(){
             wx.showToast({
               title: title,
             })
           }
         })
      }

    })
  },
  erweima:function(){
    wx.navigateTo({
      url: '../qianderwm/qianderwm?xingx=' + this.data.options,
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

  }
})