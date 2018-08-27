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
    private: [
      { name: '联系人', checked: false },
      { name: '联系电话', checked: false  },
      { name: '联系地址', checked: false  }],
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
        for (var i = 0; i < app.globalData.gongkai.length;i++){
            opp[i].opename = app.globalData.gongkai[i]
            opp[i].name = app.globalData.gongkai[i]
        if (app.globalData.gongkai[i] == opp[i].opename){
         opp[i].checked=true
          opp[i].name = app.globalData.gongkai[i]
              this.setData({
            open:opp
          })
        }
        }
        var fpp = this.data.private
        for (var i = 0; i < app.globalData.ongk.length; i++) {
          
          
          if (app.globalData.ongk[i] == fpp[i].name) {
            fpp[i].checked = true
           
            this.setData({
              private: fpp
            })
          }
        }
      /*   if (app.globalData.gongkai[1] == opp[1].opename){
          opp[1].checked = true
          opp[1].name = app.globalData.gongkai[1]
          this.setData({
            open: opp
          })
        }*/
         console.log(this.data.open)
        
    },
    onShow: function () {
      console.log(app.globalData.tianjiaprivate)
      
      this.setData({
        ipp: app.globalData.tianjiaprivate
      })
      console.log(this.data.private)
    },
    checkboxChange1:function(e){
      console.log(e)
      var that = this
      var id = e.currentTarget.dataset.id
      
   //     var aa = e.detail.value[i].split("|")
       if (that.data.open[id].checked==false){
          that.data.open[id].checked = true
          that.setData({
            open:that.data.open,
   
          })
        }
        else{
          that.data.open[id].checked = false
          that.setData({
            open: that.data.open
          })
        }
      
     
   //  var bb = e.detail.value[1].split("|")
     console.log(that.data.open)
  //   console.log(bb[1])
  //   that.data.open[aa[1]].checked = true
   //   that.data.opens = aa[0]
        
   //     console.log(that.data.opens)
      
    },
    opename:function(e){
      var that=this
      var id = e.currentTarget.dataset.id
      that.data.open[id].name = e.detail.value
      that.data.open[id].opename = e.detail.value
      that.data.open[id].checked=true
      that.setData({
        open: that.data.open
      })
    },
    openumber:function(e){
      this.setData({
        openumber: e.detail.value
      })
    },
    checkboxChange2:function(e){
      var that = this
      var id = e.currentTarget.dataset.id
      if (that.data.private[id].checked == false) {
        that.data.private[id].checked = true    
        that.setData({
          private: that.data.private,          
        })
      }
      else {
        that.data.private[id].checked = false
        that.setData({
          open: that.data.open
        })
      }
      that.data.obx = e.detail.value
      that.setData({
        obx: that.data.obx
      })
    },
    checkboxChange3:function(e){
      var that = this
      var id = e.currentTarget.dataset.id
      if (that.data.ipp[id].checked == false) {
        that.data.ipp[id].checked = true
        that.setData({
          ipp: that.data.ipp,
        })
      }
      else {
        that.data.ipp[id].checked = false
        that.setData({
          ipp: that.data.ipp
        })
      }
      console.log(that.data.ipp)
    },
    /**自定义 */
    tianjiacustom:function(){
     wx.navigateTo({
       url: '../tianjiaprivate/tianjiaprivate',
     })
    },
    /*重置 */
    reset:function(){
      app.globalData.tianjiaprivate=[]
      for (var i = 0; i < this.data.private.length; i++){
        this.data.private[i].checked = false
      }
      this.setData({
        ipp:[],
        private: this.data.private
      })
    },
    /*确认填写项 */
    affirm:function(){
      console.log(this.data.open)
        app.globalData.gongkai=[],
        app.globalData.ongk=[],
        app.globalData.ongks = []
      for (var i = 0; i < this.data.open.length;i++){
        if (this.data.open[i].checked==true){
          app.globalData.gongkai.push(this.data.open[i].opename)
        }
      }
      for (var i = 0; i < this.data.private.length; i++) {
        if (this.data.private[i].checked == true) {
          app.globalData.ongk.push(this.data.private[i].name)
      }
      }
      for (var i = 0; i < this.data.ipp.length; i++) {
        if (this.data.ipp[i].checked == true) {
          app.globalData.ongks.push(this.data.ipp[i].name)
        }
      }
    //  app.globalData.gongkai = [ this.data.opens] 
   //  app.globalData.gongkai.push(this.data.obx) 
      wx.navigateBack({
        delta:1
      })
    }
  }
})
