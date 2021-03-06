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
     jieitem: [{ item_name: '', price: '', amount: '',id:0}],
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
    theme_id:'',
     mofanzhut:'',
     mofanjieshao:'',
     ytianmap:'',
     Fill:'',
     kill:'',
     gill:'',
    edit_item:'',
    edit_theme:'',
    pinfs: true,
    wufs: true,
    hshangp:true,
    canxx: true,
    jlhong:true,
    spname:'',
    shangtu:[],
    dakaitem:true,
    newxia:true,
    newshang:true,
    qitxiang:true,
    baomingshe:false,
    group: [],
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

    ],
    qitaxiangmuneiy: [{
      xiangmu: '填写项',
      color: ''
    },
    {
      xiangmu: '图片/视频',
      color: ''
    },
    {
      xiangmu: '语音',
      color: ''
    },

    ],
    gongk: ['公开', '不公开'],
    bitian: ['必填', '非必填'],

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onReady:function(){
      this.zhuti = this.selectComponent("#zhuti")
      this.zhuti.data.upimg = this.data.upimg
       console.log(this.zhuti)
    },
    onLoad: function (options) {
      console.log(options)
    
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
    
   //   that.data.startime.dadate=Y + "-" +("0"+ (M + 1)).slice(-2) + "-" + D
      that.data.startime.datime=H + ":" + F
      that.data.endtime.houdate=s3
     
      that.setData({
        startime: that.data.startime,
        hometime: ("0"+(M + 1)).slice(-2) + "/" + D,
        endtime: that.data.endtime,
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
      wx.request({
        url: app.globalData.urlPrefix + 'signup/findDragonItem',
        data: {
          theme_id: options.id,
          user_id: options.uid,
        },
        success: function (res) { 
          var sjcha =new Date( res.data.theme_result.end_time * 1000);
          var sjtime = new Date(res.data.theme_result.start_time * 1000);
          var SR = sjtime.getDate()
          var SY = sjtime.getMonth()+1
          var SN = sjtime.getFullYear()
          var SS = sjtime.getHours() 
          var SF = sjtime.getMinutes()
          var ES = sjcha.getHours()
          var EF = sjcha.getMinutes()
          var ER = sjcha.getDate()
          var EY = sjcha.getMonth()+1
          var EN = sjcha.getFullYear()
          console.log(EN + '-' + EY + '-' + ER+'-'+SS)
          that.data.endtime.houtime=ES+':'+EF
          that.data.endtime.houdate = EN + '-' + EY + '-' + ER
          that.data.startime.dadate = SN + '-' + SY + '-' + SR
          that.data.startime.datime = SS+':'+SF
          app.globalData.map = JSON.parse(res.data.theme_result.address);

          if (res.data.theme_result.actor_info !== "null" && res.data.theme_result.actor_info !== null){
           that.data.Fill   = JSON.parse(res.data.theme_result.actor_info).gong;
            that.data.kill  = JSON.parse(res.data.theme_result.actor_info).bugong;
            that.data.gill  = JSON.parse(res.data.theme_result.actor_info).bugongs
            }
          that.data.shangtu=[]
          for (var i = 0; i < res.data.item_result.length;i++){
         
            if (res.data.item_result[i].p_goods_img !== '[]' && res.data.item_result[i].p_goods_img !== "") {
              that.data.shangtu.splice(i, i, JSON.parse(res.data.item_result[i].p_goods_img)) 
              app.globalData.img.splice(i, i, JSON.parse(res.data.item_result[i].p_goods_img)) 
            } else if (res.data.item_result[i].p_goods_img == ""){}
          }
          console.log(that.data.shangtu)
          console.log(app.globalData.img)
          
            for (var j in res.data.theme_img) {
              if (res.data.theme_img[j].img_path) {
              var index1 = res.data.theme_img[j].img_path.lastIndexOf(".");
              var index2 = res.data.theme_img[j].img_path.length;
              var postf = res.data.theme_img[j].img_path.substring(index1, index2);
              if (postf == '.jpg' || postf == '.png') {
                that.data.pushurl.push({ pic: app.globalData.urlfix + res.data.theme_img[j].img_path, video: '' })
              } else if (postf == '.mp4') {
                that.data.pushurl.push({ pic: '', video: app.globalData.urlfix + res.data.theme_img[j].img_path })
              }
              
                that.data.upimg.push(res.data.theme_img[j].img_path)  
              }
          
            }
          app.globalData.wuliufs = JSON.parse(res.data.theme_result.actor_info) || { fangshi:null,contacts:''}
          console.log(that.zhuti)
          
          console.log(that.data.pushurl)
          
          if (res.data.theme_result.jl_type == 0) { 
            that.setData({ jlhong: false, canxx: false, newxia:false})
            }
          if (res.data.theme_result.jl_type == 1) {
            that.setData({ 
              hshangp: false,
               spname:'团购',
               wufs: false,
             newshang:false
               })
             }
          if (res.data.theme_result.jl_type == 2) {
              that.setData({
              group: JSON.parse(res.data.daka_info),
              qitxiang:false,
              dakaitem:false,
              spname:'打卡',
              baomingshe:true,
              canxx: false
            })
           }
          if (res.data.theme_result.jl_type == 3) {
          
           }
          if (res.data.theme_result.jl_type == 4) {
        
            that.setData({
              hshangp: false,
               spname: '拼团', 
               pinfs: false, 
               wufs: false, 
               newshang:false
            })
           }
          if (res.data.theme_result.jl_type == 5) { }
          if (res.data.item_result[0].checked==''){
            that.data.checked=false;
          } else if(res.data.item_result[0].checked == '1'){
            that.data.checked = true;
          }
          that.setData({
            checked: that.data.checked,
            theme_id:options.id,
            jieitem: res.data.item_result,
            edit_theme: res.data.theme_result,
            ytianmap: JSON.parse(res.data.theme_result.address),
            Fill: that.data.Fill,
            kill: that.data.kill,
            gill: that.data.gill,
            jl_type: res.data.theme_result.jl_type, 
            endtime: that.data.endtime,
            startime: that.data.startime,
            shangtu: that.data.shangtu,
            pushurl:that.data.pushurl,
            wuliu:JSON.parse(res.data.theme_result.actor_info) 
         })
   
        }
      })
    },
    onShow: function () {
      for (var i = 0; i < this.data.jieitem.length; i++) {

        this.data.jieitem[i].p_goods_img = app.globalData.img[i]
      }
      this.setData({
        shangtu: app.globalData.img,
        shant: app.globalData.tel,
        ytianmap: app.globalData.map,
        Fill: app.globalData.gongkai,
        kill: app.globalData.ongk,
        gill: app.globalData.ongks,
        way: app.globalData.way,
        wuliu: app.globalData.wuliufs
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
  //  上传图片
    shangchuantup: function (e) {
      console.log(e.target.dataset.id)
      wx: wx.navigateTo({
        url: '../shangchuantup/shangchuantup?id=' + e.target.dataset.id + '&Qk=true&edit_img=' + this.data.jieitem[e.target.dataset.id].p_goods_img,
      })
    },
    //规格
    size: function (e) {
      let index = e.currentTarget.dataset.index
      console.log(index)

      console.log(this.data.jieitem)
      this.data.jieitem[index].size_or_color = e.detail.value

      this.setData({
        jieitem: this.data.jieitem
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
    stime: function (e) {
      var i = e.currentTarget.dataset.id
      this.data.jieitem[i].start = e.detail.value
      this.setData({ jieitem: this.data.jieitem })
    },
    etime: function (e) {
      var i = e.currentTarget.dataset.id
      this.data.jieitem[i].end = e.detail.value
      console.log(this.data.checked)
      this.setData({ jieitem: this.data.jieitem })
    },
    notime: function (e) {
      var i = e.currentTarget.dataset.id
      this.data.jieitem[i].checked = this.data.jieitem[i].checked == false ? true : false
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

    Tosetups: function () {
      for (var i = 0; i < this.data.jieitem.length; i++) {
        app.globalData.pintuanfs[i] = ({
          'name': this.data.jieitem[i].item_name,
          'original': this.data.jieitem[i].price, pintjia: ''
        })
      }
      wx.navigateTo({
        url: '../pintuanfs/pintuanfs',
      })
    },
    Towuliu: function () {
      wx.navigateTo({
        url: '../wuliufs/wuliufs',
      })
    },
    fajielong(ev){

      console.log(ev)
      console.log(this.data.upimg)
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
        let status = ev.detail.formId == undefined ? 2:1;
        console.log(this.data.jieitem)
      wx.request({
        url: app.globalData.urlPrefix + 'signup/updateInfo',
        data:{
          edit_id:this.data.theme_id,
          jl_type:this.data.jl_type,
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
          status: status,
          end_time:this.data.endtime,
          actor_info: thgt.data.wuliu,
          daka_info: thgt.data.group
        },
        
        success:function(res){
          wx.navigateBack({
            delta:1
          })  
          // wx.navigateTo({
          //   url: '../huodong/huodong?id=' + thgt.data.theme_id + '&uid=' + app.globalData.idda.uid
          // })
        }
      
        
      })
      }
     
    },
    //+新项目

    newitem:function(){
      let jieitem = this.data.jieitem
      jieitem.push({ item_name: '', price: '', amount: '', id: this.data.jieitem.length})
      this.data.shangtu.push([])
      this.setData({ 
        quantity: ++this.data.quantity,
        jieitem: jieitem,
        shangtu: this.data.shangtu,
        height: this.data.height+139
        })
      console.log(this.data.shangtu)
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
    groupinp: function (e) {
      var i = e.currentTarget.dataset.id
      this.data.group[i].place = e.detail.value
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
    
  },  
  

})

