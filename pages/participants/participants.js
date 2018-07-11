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
        name:'',
        placeholder:'别名（可点击命名：如家长姓名，学生姓名，楼层等）',
        checked:false
      },
      {
        opename:'编号',
        name: '',
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
      
        
     
        var opp = this.data.open
       
        
        if (app.globalData.gongkai[0] == opp[0].opename){
         opp[0].checked=true
          opp[0].name = app.globalData.gongkai[0]
              this.setData({
            open:opp
          })
        }
         if (app.globalData.gongkai[1] == opp[1].opename){
          opp[1].checked = true
          opp[1].name = app.globalData.gongkai[1]
          this.setData({
            open: opp
          })
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
      that.data.open[id].name = e.detail.value
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
