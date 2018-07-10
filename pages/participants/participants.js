// pages/participants /participants .js
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
    private: [{ name: '联系人' }, { name: '联系电话' },{name: '联系地址' }],
    open: [
      {
        opename: '别名',
       
        placeholder:'别名（可点击命名：如家长姓名，学生姓名，楼层等）',
        checked:false
      },
      {
        opename:'编号',
     
        placeholder: '编号（可点击命名：如学号，工号，座号等）',
        checked: false
      }],
    ipp:'',
    opens:[],
    obx:''
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) { 
      for (var i = 0; i < app.globalData.gongkai.length;i++){
        console.log(this.data.open[i].opename)
        app.globalData.gongkai[i] = this.data.open[i].opename
        this.setData({
          opens: this.data.opens
        })
        if (app.globalData.gongkai[i] == this.data.open[i].opename){
          this.data.open[i].checked=true
          this.setData({
            open:this.data.open
          })
        }
      }   
    },
    onShow: function () {
      this.setData({
        ipp: app.globalData.tianjiaprivate
      })
      console.log(this.data.ipp)
    },
    checkboxChange1:function(e){
      console.log(e.detail.value)
      
      var that=this
      that.data.opens = e.detail.value
        that.setData({
          opens: that.data.opens
        })
      
        console.log(that.data.opens)
     
    
    },
    opename:function(e){
      console.log(e)
      var that=this
      var id = e.currentTarget.dataset.id
      that.data.open[id].opename = e.detail.value
      that.setData({
        open: that.data.open
      })
    },
    openumber:function(e){
      console.log(e.detail.value)
      this.setData({
        openumber: e.detail.value
      })
    },
    checkboxChange2:function(e){
      console.log(e.detail.value)
      var that = this
      that.data.obx = e.detail.value
      that.setData({
        obx: that.data.obx
      })
    },
    tianjiacustom:function(){
     wx.navigateTo({
       url: '../tianjiaprivate/tianjiaprivate',
     })
    },
    reset:function(){
      app.globalData.tianjiaprivate=[]
      this.setData({
        ipp:[]
      })
    },
    affirm:function(){
      console.log(this.data.opens)
     
     app.globalData.gongkai=this.data.opens
     app.globalData.gongkai.push(this.data.obx) 
      wx.navigateBack({
        delta:1
      })
    }
  }
})
