// pages/sousuo/sousuo.js
var timer

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
     uname:'',
     uimg:'',
     quantity:1,
     tianxuetj:0,
     upimg:[],
     pushurl: [],
     jieitem:[{item_name:'',price:'',amount:''}],
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
    onLoad: function (options) {
      console.log(this.data.startime)
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
    box: function (e) {
      var that = this;
      var uppimg = [];
      console.log(e)
      wx.showActionSheet({
        itemList: [ '图片', '视频'],
        success: function (res) {
          if(res.tapIndex===0){ 
            wx.chooseImage({
              sourceType: ['album','camera'],
              success: function (res) {   
                var tempFilePaths = res.tempFilePaths
                console.log(that.data.pushurl)
                
                /*for (var i in tempFilePaths) {
                  tempFilePaths.push(tempFilePaths[i])
                }*/
                for (var j in tempFilePaths){
                  var index1 = tempFilePaths[j].lastIndexOf(".");
                  var index2 = tempFilePaths[j].length;
                  var postf = tempFilePaths[j].substring(index1, index2);
                  console.log(postf)
                
                if (postf==".jpg"){ 
                 var gg= that.data.pushurl
                
                 gg.push({ pic:tempFilePaths[j],video:''})
                  that.setData({
                    pushurl: gg
                  })
                  
                }
             
                
                }
                     
            
                for (var i = 0; i < gg.length; i++) {
                  console.log(gg[i].pic)
                  wx.uploadFile({
                    url: app.globalData.urlPrefix + 'signup/uploadImg',
                    filePath: gg[i].pic,
                    name: 'image',
                    formData: {
                      'user': 'test'
                    },
                    success: function (res) {
                      //var data=res.data
                      console.log(res)
                      uppimg.push(JSON.parse(res.data).imgPath)
                    
                      that.setData({
                        upimg: uppimg,
                      
                      })

                    }
                  })
                }

              },
            }) 
            console.log(that.data.pushurl)
          }
          else if(res.tapIndex===1){
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: 'back',
              success: function (res) {
                console.log(res.tempFilePath)
                var tempFilePaths = res.tempFilePath.split()
                var ovsrc = that.data.pushurl
                
                for (var j in tempFilePaths) {
                  var index1 = tempFilePaths[j].lastIndexOf(".");
                  var index2 = tempFilePaths[j].length;
                  var postf = tempFilePaths[j].substring(index1, index2);
                  console.log(postf)

                  if (postf == ".mp4") {

                    var gg = that.data.pushurl
                    gg.push({ pic: '', video: tempFilePaths[j]})
                    
                    that.setData({
                      pushurl: gg
                    })

                  }


                }
                console.log(that.data.pushurl)
                for (var i = 0; i < gg.length; i++) {
                  console.log(gg[i].video)
                  wx.uploadFile({
                    url: app.globalData.urlPrefix + 'signup/uploadImg',
                    filePath: gg[i].video,
                    name: 'image',
                    formData: {
                      'user': 'test'
                    },
                    success: function (res) {
                      //var data=res.data
                    console.log(res)
                    }
                  })
                }
              }
            })
          }
        }  
      })
      
  },
  tup:function(e){
    let ind=e.currentTarget.dataset.index
    var that=this
    console.log(ind)
    wx.showActionSheet({
      itemList: ["替换图片","替换成视频","删除"],
      success:function(res){
        if(res.tapIndex==0){
          wx.chooseImage({
            sourceType: ['album'],
            count:'1',
            success: function (res) {
              console.log(ind)
              var tempFilePaths = res.tempFilePaths
              var aa = that.data.pushurl
              aa.splice(ind, 1, { pic:tempFilePaths,video:''})
                 that.setData({
                   pushurl: aa
                 })
              }
                           })
                   }
                else if(res.tapIndex==1){     
                  wx.chooseVideo({
                    sourceType: ['album', 'camera'],
                    maxDuration: 60,
                    camera: 'back',
                    success: function (res) {
                      var tempFilePaths = res.tempFilePath
                      console.log(res)
                      var aa = that.data.pushurl
                      aa.splice(ind, 1, { pic: '', video:tempFilePaths })
                      that.setData({
                        pushurl: aa
                      })
                    }
                  })
                }
              else if (res.tapIndex == 2) {  
                let aa=that.data.pushurl
                aa.splice(ind, 1)    
                that.setData({
                  pushurl: aa
                })
             }   
               }
          })
  },
  ship:function(e){
  e.vioos=  wx.createVideoContext('sps')
  let ind = e.currentTarget.dataset.index
  var that = this
    console.log(ind)
    wx.showActionSheet({
      itemList: ['播放','替换视频','替换成图片','删除'],
      success:function(res){
        if(res.tapIndex==0){
          e.vioos.play({})
          e.vioos.requestFullScreen({})
        }
        else if (res.tapIndex === 1) {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function (res) {
              console.log(res.tempFilePath)
              var tempFilePaths = res.tempFilePath.split()
              var vsrc = that.data.pushurl
              vsrc.splice(ind, 1, {pic:'',video: tempFilePaths})
           
              
              that.setData({
                pushurl: vsrc
              })
              console.log(that.data.src.length)
            }
          })
        } 
        else if (res.tapIndex == 2) {
          wx.chooseImage({
            sourceType: ['album', 'camera'],
            count: '1',
            success: function (res) {
              console.log(ind)
              var tempFilePaths = res.tempFilePaths
              var aa = that.data.pushurl
              aa.splice(ind, 1, { pic: tempFilePaths, video: '' })
              that.setData({
                pushurl: aa
              })
            }
          })
        }
        else if(res.tapIndex==3){
          let vos = that.data.pushurl;
          vos.splice(ind, 1)
          that.setData({ pushurl: vos })
        }
      }
    })
  },
    infodel: function (ev) {
      let index = ev.currentTarget.dataset.index;
      let Img = this.data.pushurl;
      Img.splice(index, 1)
      
      this.setData({ pushurl: Img })
    },

   
    boxP:function(){
      var that = this;
      var uppimg=[];
      that.setData({ bo: true})
      console.log()
      
      wx.chooseImage({
        sourceType: ['album'],
        success: function(res) {
          console.log(res)
          var tempFilePaths = res.tempFilePaths
          var old_tp = that.data.pushurl
          for(var i in tempFilePaths){
            old_tp.push(tempFilePaths[i])
          }
          that.setData({
            pushurl: old_tp
          })
          for (var i = 0; i < old_tp.length;i++){
          wx.uploadFile({
            url: app.globalData.urlPrefix + 'signup/uploadImg',
            filePath: old_tp[i],
            name: 'image',
            formData:{
              'user':'test'
            },
            success:function(res){
              //var data=res.data
              console.log(res)
             
                uppimg.push(JSON.parse(res.data).imgPath) 
                that.setData({
                  upimg:uppimg
                })

            }
          })
          }
          
        },
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

      this.data.jieitem[index - 1].item_name=e.detail.value
      this.setData({
        jieitem: this.data.jieitem
      })
    },
    //价格
    jiag(e) {
      let index = e.currentTarget.dataset.index
      this.data.jieitem[index - 1].price = e.detail.value
 
      this.setData({
        jieitem: this.data.jieitem
      })
      console.log(this.data.jieitem)
    },
    //数量
    shum(e){
      let index = e.currentTarget.dataset.index
      this.data.jieitem[index - 1].amount = e.detail.value
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
      if (thgt.data.setPlnr == "" || thgt.data.setPlnr == undefined) {
        thgt.setData({ dored: false })
        timer = setTimeout(function () {
          num--;
          thgt.setData({ dored: true })
        }, 2000)

      }
      else {
      wx.request({
        url: app.globalData.urlPrefix + 'signup/saveInfo',
        data:{
          user_id:app.globalData.idda.uid,
          dragonTheme: this.data.setPlnr,
          item:this.data.jieitem,
          img_path: this.data.upimg,
          descInfo: this.data.descont,
          user_img: app.globalData.userInfo.avatarUrl,
          user_name: app.globalData.userInfo.nickName,
          servPhone: this.data.shant,//电话
          address: app.globalData.map,
          actor_info: thgt.data.heti,
          start_time: this.data.startime,
          end_time:this.data.endtime
        },
        
        success:function(res){
          console.log(res.data)    
          wx.navigateTo({
            url: '../huodong/huodong?id=' + res.data.theme_id + '&uid=' + app.globalData.idda.uid
          })
        }
      
        
      })
      }
     
    },
    //+新项目
    newitem:function(){
      let jieitem = this.data.jieitem
      jieitem.push({ item_name: '', price: '',amount:'' })
      this.setData({ 
        quantity: ++this.data.quantity,
        jieitem: jieitem
        })
      console.log(this.data.jieitem)
    },
    delitem:function(e){    
      let id = e.currentTarget.dataset.id
      let jieitem = this.data.jieitem
      jieitem.splice(id,1)
      this.setData({
         quantity: --this.data.quantity ,
         jieitem: jieitem
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
    }
  }
})

