// pages/pintuanfs/pintuanfs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    num:0,
    content:[
      ['按所有用户', '按同一个提货点', '按同一个微信群'],
      ['购买总数拼团','交易总额拼团']
      ],
      text:[
        ["所有用户","同一个提货点","同一个微信群"],
        ["购买总数","交易总额"],
        ["","提货点","微信群"]
      ],
    index:0,
    id:0,
    color:[],
    colors:[],
    pintuanfs:'',
    clustersnum:[],
    way:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=this.data.index,idd=this.data.id
    this.data.way = [this.data.content[0][id], this.data.content[1][idd]]
  },
  bindchange:function(e){
    var id = e.detail.value[0]
    var idd = e.detail.value[1]
    this.data.way = [this.data.content[0][id], this.data.content[1][idd]]
    this.setData({
      index:id,
      id:idd
    })
  },
  juji:function(e){
    console.log(this.data.color)
    if (e.target.dataset.id == e.target.dataset.id){
      this.data.color[e.target.dataset.id]='#f34534'
      this.setData({
        color: this.data.color

      })
    }
    
  },
  shiqu:function(e){
    if (e.target.dataset.id == e.target.dataset.id) {
      this.data.color[e.target.dataset.id] = '#999'
      this.setData({
        color: this.data.color

      })
    }
  },
  jujis: function (e) {
    if (e.target.dataset.id == e.target.dataset.id) {
      this.data.colors[e.target.dataset.id] = '#f34534'
      this.setData({
        colors: this.data.colors

      })
    }
  },
  shiqus: function (e) {
    if (e.target.dataset.id == e.target.dataset.id) {
      this.data.colors[e.target.dataset.id] = '#999'
      this.setData({
        colors: this.data.colors

      })
    }
  },
  pintjia:function(e){
    var id = e.target.dataset.id
    var idx = e.target.dataset.idx
    this.data.array[idx][id].pintjia=e.detail.value
    this.setData({
      array:this.data.array
    })
  
  },
  newjieti:function(){
    this.data.array.push(app.globalData.pintuanfs)
    this.data.color.push('#999')
    this.data.colors.push('#999')
    this.data.clustersnum.push({num:''})
    this.setData({
      array: this.data.array,
      color: this.data.color,
      colors: this.data.colors,
      clustersnum: this.data.clustersnum
    })
  },
  deljieti:function(e){
    let id=e.target.dataset.id
    this.data.array.splice(id,1)
    this.data.color.splice(id,1)
    this.data.colors.splice(id,1)
    this.setData({
      array: this.data.array,
      color: this.data.color,
      colors: this.data.colors
    })
  },
  clustersnum:function(e){
    var id = e.target.dataset.id
    this.data.clustersnum[id].num = e.detail.value
    this.setData({ clustersnum: this.data.clustersnum})
  },
  queding:function(){
    app.globalData.way= this.data.way//拼团方式的类型
    app.globalData.pinfs= this.data.array//拼团方式的商品价格
    app.globalData.clustersnum = this.data.clustersnum//拼团方式的总数
 
     wx.navigateBack({
         delta:1
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