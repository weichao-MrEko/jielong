// pages/sousuo/sousuo.js
var timer;
var x, y, x1, y1, x2, y2, index, currindex, n, yy;//拖拽
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
     move:{x:0,y:0},
     mainx:-1,
    height:122,
     uname:'',
     uimg:'',
     quantity:1,
     tianxuetj:0,
     upimg:[],
     pushurl: [],
     jieitem: [{ item_name: '', price: '', amount: '100',id:0}],
     group:[],
     groups: [
       
         {
            id: 0,
           title: '填写项',
           place: '输入填写项主题名称',
           iex: 0,
           ieb: 0,
          
         },
         {
           id: 1,
           title: '图片/视频',
           place: '输入图片/视频主题名称',
           iex: 0,
           ieb: 0,
          
         },
         {
           id: 2,
           title: '语音',
           place: '输入语音主题名称',
           iex: 0,
           ieb: 0,
        
         },
         {
           id: 3,
           title: '位置',
           place: '输入位置主题名称',
           iex: 0,
           ieb: 0,
         
         },
         {
           id: 4,
           title: '单选',
           place: '输入单选主题名称',
           iex: 0,
           ieb: 0,
           
         },
         {
           id: 5,
           title: '多选',
           place: '输入多选主题名称',
           iex: 0,
           ieb: 0,
         
         },
       
       ],
     qitaxiangmuneiy: [
        { xiangmu: '填写项',color:'' }, 
        { xiangmu: '图片/视频', color: ''  },
        { xiangmu: '语音', color: ''  },
        { xiangmu: '位置', color: '' },
        { xiangmu: '单选', color: '' }, 
        { xiangmu: '多选', color: '' }
        ],
     gongk:['公开','不公开'],
     bitian:['必填','非必填'],
     setPlnr: '',
     xname:'',
     descont: '', 
     jiage:'',
     shumu:'',
     shant:'',
     id:'',
     homepage:false,
     dianhua:true,
     qushe:true,
     dored:true,
     qitxiang:true,
     setime: true,
     xiantime: false,
     hometime:'',
     startime: {dadate:'', datime:'16:10'},
     endtime: { houdate: '2018-7-5', houtime: '00:00'},
     
     
     
     mofanzhut:'',
     mofanjieshao:'',
     ytianmap:'',
     Fill:'',
     kill:'',
     gill:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onReady:function(){
      this.zhuti = this.selectComponent("#zhuti")
       console.log(this.zhuti)
    },
    onLoad: function (options) {

     
      console.log(this.selectComponent)
      var Y = new Date().getFullYear()
      var M = new Date().getMonth()
      var D = new Date().getDate()
      var H = new Date().getHours()
      var F = new Date().getMinutes()
     
      D = D > 9 ? D : "0" + D
      var day3 = new Date();
      day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000*7);
      var s3 = day3.getFullYear() + "-" + ("0"+(day3.getMonth() + 1)).slice(-2) + "-" + day3.getDate();
      console.log(s3)

      let that=this
      that.data.jieitem[0].item_name = options.item
      that.data.jieitem[0].price = options.jiag
      that.data.jieitem[0].amount = options.renshu
      that.data.startime.dadate=Y + "-" +("0"+ (M + 1)).slice(-2) + "-" + D
      that.data.startime.datime=H + ":" + F
      that.data.endtime.houdate=s3
     
      that.setData({
        startime: that.data.startime,
        hometime: ("0"+(M + 1)).slice(-2) + "/" + D,
        endtime: that.data.endtime,
        setPlnr:options.zhu,
        descont:options.nei,
        jieitem: that.data.jieitem
       
      })
      
      wx.getStorage({
        key: 'key',
        success: function(res) {
          console.log(res)
          that.setData({
            shant: res.data,
          })
          },
      })
      console.log(that.data.jiage)
      
    },
    onShow: function () {
      this.setData({
        shant: app.globalData.tel,
        ytianmap: app.globalData.map,
        Fill: app.globalData.gongkai,
        kill: app.globalData.ongk,
        gill: app.globalData.ongks
      })
      console.log(app.globalData.tianjiaprivate)
      console.log(app.globalData.ongks)
    },
    kefu(){
      
    
      wx.navigateTo({
        url: '../kefu/kefu',
      })
    },
    bindGetUserInfo: function (e) {
      console.log(e.detail.userInfo)
      this.setData({
        uname: e.detail.userInfo.nickName,
        uimg: e.detail.userInfo.avatarUrl,
        
      })
    },
   
   
  
   
   
   //主题
    Plnr(e){
      this.setData({
        setPlnr:e.detail.value
      }) 
    },
    //内容
    desc(e){
      this.setData({
        descont: e.detail.value
      })
    },
    //项目名
   
    xiangname(e){
      let index = e.currentTarget.dataset.index
      console.log(index)
      this.data.jieitem[index].item_name=e.detail.value
      this.setData({
        jieitem: this.data.jieitem
      })
    },
    //价格
    jiag(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index
      this.data.jieitem[index].price = e.detail.value
      this.setData({
        jieitem: this.data.jieitem
      })
      console.log(this.data.jieitem)
    },
    //数量
    shum(e){
      let index = e.currentTarget.dataset.index
      this.data.jieitem[index].amount = e.detail.value
      this.setData({
        jieitem: this.data.jieitem
      })
    },
    fajielong(ev){

      console.log(ev)
      console.log(this.data.jieitem)
      var thgt = this;
      thgt.data.heti = { gong: thgt.data.Fill, bugong: thgt.data.kill,bugongs:thgt.data.gill}
     console.log(thgt.data.heti)
     

      var num = 10;
      if (thgt.zhuti.data.setPlnr == "" || thgt.zhuti.data.setPlnr == undefined) {
        thgt.setData({ dored: false })
        timer = setTimeout(function () {
          num--;
          thgt.setData({ dored: true })
        }, 2000)

      }
      else {
        // 2 是预览 ；1 是发布
        let status = ev.detail.formId == undefined ? 2:1;
      wx.request({
        url: app.globalData.urlPrefix + 'signup/saveInfo',
        data:{
          user_id:app.globalData.idda.uid,
          dragonTheme: this.zhuti.data.setPlnr,
          item:this.data.jieitem,
          img_path: this.zhuti.data.upimg,
          descInfo: this.zhuti.data.descont,
          user_img: app.globalData.userInfo.avatarUrl,
          user_name: app.globalData.userInfo.nickName,
          servPhone: this.data.shant,//电话
          address: app.globalData.map,
          actor_info: thgt.data.heti,
          start_time: this.data.startime,
          end_time:this.data.endtime,
          status:status
        },
        
        success:(res)=>{
          console.log(res.data)   

        // 消息提醒
          wx.request({
            url: "https://www.shequnxz.com/wxapi/smith",
            data: {
              form_id: ev.detail.formId,
              uname: app.globalData.idda.user_name,
              start_time: JSON.stringify(this.data.startime),
              address: JSON.stringify(app.globalData.map),
              uid: app.globalData.idda.uid,
              url: '/pages/huodong/huodong?id=' + res.data.theme_id + '&uid=' + app.globalData.idda.uid,
              dragonTheme: this.zhuti.data.setPlnr,
            },
            method: "POST",
            success: function (res) {
              console.log(res)
            },

          })

          wx.connectSocket({
            url: 'wss://www.shequnxz.com/wss'
          })
       
          app.globalData.socket.send({
            data: app.globalData.idda.user_name + '发布了一个报名接龙'
          })
          wx.navigateTo({

            url: '../huodong/huodong?id=' + res.data.theme_id + '&theme_uid=' + app.globalData.idda.uid+ '&uid=' + app.globalData.idda.uid 
          })
        }
      
        
      })
      }
     
    },
    //+新项目
    newitem:function(){
      let jieitem = this.data.jieitem
      jieitem.push({ item_name: '', price: '', amount: '100', id: this.data.jieitem.length})
      this.setData({ 
        quantity: ++this.data.quantity,
        jieitem: jieitem,
        height: this.data.height+139
        })
      console.log(this.data.jieitem)
    },
    delitem:function(e){    
      let id = e.currentTarget.dataset.id
      let jieitem = this.data.jieitem
      jieitem.splice(id,1)
      this.setData({
         quantity: --this.data.quantity ,
         jieitem: jieitem,
        height: this.data.height - 139
         })
    },
    qitmu:function(){
      if (this.data.qitxiang==true){
        this.setData({
          qitxiang:false
        })
      }
      else{
        this.setData({
          qitxiang:true
        })
      }
    },
    bindchangegk:function(e){
      this.data.group[e.currentTarget.dataset.id].iex = Number(e.detail.value)
      console.log(e.currentTarget.dataset.id)
      console.log(this.data.groups)
      this.setData({ 
        group: this.data.group,  
      })
    },
    bindchangebt: function (e) {
      this.data.group[e.currentTarget.dataset.id].ieb = Number(e.detail.value)
     
      this.setData({
        group: this.data.group,
      })
    },
    newtx:function(e){
      let id=e.currentTarget.dataset.id
      let that=this
      
      if (that.data.qitaxiangmuneiy[id]){
        if (that.data.qitaxiangmuneiy[id].color==""){
          that.data.group.push(that.data.groups[id])
          that.data.qitaxiangmuneiy[id].color = 'color:#999'
          that.setData({
            group: that.data.group,
            qitaxiangmuneiy: that.data.qitaxiangmuneiy
          })
        }
        else{
        that.setData({
          group: that.data.group,
          qitaxiangmuneiy: that.data.qitaxiangmuneiy
        })
        }
      }
    
      console.log(that.data.group)


    },
    newtup: function () { 
      this.data.group.push(this.data.groups[1])
      this.setData({ group: this.data.group})
      },
    deltx: function (e) {
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let that=this
      console.log(that.data.qitaxiangmuneiy.xiangmu)
          //项目数组内容                     按钮数组内容
      if (that.data.group[index].title == that.data.qitaxiangmuneiy[id].xiangmu) {
        //空数组
        //删除其他项目
        that.data.group.splice([index], 1)
        that.data.qitaxiangmuneiy[id].color=''
        this.setData({
          group: that.data.group ,
          qitaxiangmuneiy: that.data.qitaxiangmuneiy
           })
      }
      else{
        //删除默认项目
        that.data.group.splice([index], 1)
        this.setData({
          group: that.data.group,   
        })
      }
      
    },
    Tosetup:function(){
    //  this.setData({
      //  qushe:false,
        //homepage:true
     // })
     wx.navigateTo({
       url: '../participants/participants',
     })
    },
    quetoshe:function(){
      this.setData({
        qushe: true,
        homepage:false
      })
    },
    xianshitime:function(){
      this.setData({
        setime:false,
        xiantime:true
      })
    },
    bindDateChange:function(e){
      
      this.data.startime.dadate= e.detail.value
      this.setData({
        startime: this.data.startime
      })
    },
    bindTimeChange:function(e){
      this.data.startime.datime = e.detail.value
      this.setData({
        startime: this.data.startime
      })
    },
    DateChange:function(e){
      this.data.endtime.houdate = e.detail.value
      this.setData({
        endtime: this.data.endtime
      })
    },

   TimeChange:function(e){
     this.data.endtime.houtime = e.detail.value
     this.setData({
       endtime: this.data.endtime
     })
   },
    phone: function (e) {
      this.setData({
        shant: e.detail.value
      })
    },
    queren:function(){
      this.setData({
        dianhua:true,
        homepage:false
      })
    },
    Addplace:function(){
      wx.navigateTo({
        url: '../shedidian/shedidian',
      })
    },
    
    movestart:function(e){
      console.log(e)
      currindex = e.currentTarget.dataset.index
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      x1 = e.currentTarget.offsetLeft;
      y1 = e.currentTarget.offsetTop;
    },
    move:function(e){
      console.log(e)
      yy = e.currentTarget.offsetTop;
      x2 = e.touches[0].clientX - x +x1;
      y2 = e.touches[0].clientY - y +y1;
      console.log(x2,y2)
      this.setData({
        mainx: currindex,
  
        move: { x: x2, y: y2 }
      })
    },
    moveend:function(e){
      console.log(3)
      if (y2 != 0) {
        var arr = [];
        for (var i = 0; i < this.data.jieitem.length; i++) {
          arr.push(this.data.jieitem[i]);
        }
        var nx = this.data.jieitem.length;
        n = 1;
        for (var k = 2; k < nx; k++) {
          if (y2 > (139 * (k - 1) + k * 2 - 69.5)) {
            n = k;
          }
        }
        if (y2 > (139 * (nx - 1) + nx * 2 - 69.5)) {
          n = nx;
        }
        console.log(arr);
     
        arr.splice((currindex - 1), 1);
        arr.splice((n - 1), 0, this.data.jieitem[currindex - 1]);
        this.data.jieitem = [];
        for (var m = 0; m < this.data.jieitem.length; m++) {
          console.log(arr[m]);
          arr[m].id = m + 1;
          this.data.jieitem.push(arr[m]);
        }
        console.log(this.data.jieitem);
        this.setData({
          mainx: "",
          jieitem: arr,
          opacity: 1
        })
      }
    },

   
    
  }
})

