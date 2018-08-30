// pages/jielong/jielong.js
const app=getApp()
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
      xiangmu: [
          {
            bao:  '+报名接龙',
            time: '23个小时前发布过',
            wanf: '7种玩法',
            contion: '适用于多种活动类型报名，自动分类统计，简单高效。支持更多类型的接龙项目，让报名简单'
          },
          {
            bao: '+团购接龙',
            time: '23个小时前发布过',
            wanf: '1种玩法',
            contion: '专门满足团购活动的需要，轻松帮助您统计订单、收款。满足您发起别具特点的团购活动',
           
          },
          {
<<<<<<< HEAD
            bao: '打卡',
=======
            bao: '+打报告',
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
            time: '23个小时前发布过',
            wanf: '7种玩法',
            contion: '话题互动，信息收集，观点陈述等专用。自定义接龙内用，支持图片、文字、语音位置四类格式和单选、多选、费用项'
          },
          {
            bao: '+拼团接龙',
            time: '23个小时前发布过',
            wanf: '0种玩法',
            contion: '可按所有用户、同一个提货点、同一个微信群，以购买总数/交易总额等方式拼团，越多越优惠'
          },
          {
            bao: '+聚会报名',
            time: '23个小时前发布过',
            wanf: '0种玩法',
            contion: '支持各种线上聚会活动，可预收费'
          },
          {
            bao: '+课程预约',
            time: '23个小时前发布过',
            wanf: '0种玩法',
            contion: '编辑课程发给同学或者家长，支持收费'
          }
    ],
   info: {},
    send: 'home',
<<<<<<< HEAD
    show: true
=======
    show:true
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
  },
  /**
  * 组件的方法列表
  */
  methods: {
    onLoad: function () {
      // app.globalData.socket.onOpen((res) => {
        console.log(2)
        app.globalData.socket.send({
          data: 'home'
        })
      // })
      app.globalData.socket.onMessage((res) => {
        console.log('收到服务器内容：' + res.data)
        var rtnD = JSON.parse(res.data)
        this.setData({
          info: rtnD.info,
          send: rtnD.send,
        })

        if (rtnD.send != 'home') {
          setTimeout(() => {
            this.setData({
              send: 'home',
            })
          }, 5000)
        }


      })

      wx.request({
        url: app.globalData.urlPrefix + 'Socketi/show', 
        success:  (res)=> {
          this.setData({
            show:res.data
          })
        }
      })



    },
    baoming: function (e) {
      
      let i = e.currentTarget.dataset.index
    if(i==i){
      wx.showActionSheet({
        itemList: ["使用空模板", "使用模板并填入示范内容"],
        success: function (res) {
          console.log(i)
          if (res.tapIndex == 0) {
              wx: wx.navigateTo({
                  url: '../baoming'+i+'/baoming'+i+'?zhu='+'&nei=&item=&jiag=&renshu=',
               })
          }
          else if (res.tapIndex==1){
<<<<<<< HEAD
            wx: wx.navigateTo({
              url: '../baoming'+i+'/baoming'+i+'?zhu='+'同学聚会&nei=大家好久没有聚在一起了，一起出来叙叙旧。&item=聚餐&jiag=100&renshu=50',
=======
            let url  = ""
            if (i == 0){
              url = '../baoming' + i + '/baoming' + i + '?zhu=' + '聚会报名&nei=大家好久没有聚在一起了，一起出来叙叙旧。&item=聚餐&jiag=100&renshu=50'
            } else if (i == 1) {
              url = '../baoming' + i + '/baoming' + i + '?zhu=' + '鲜花&nei=产自云南香味芬芳，团购更优惠&item=玫瑰花&jiag=100&renshu=50'
            } else if (i == 2) {
              url = '../baoming' + i + '/baoming' + i + '?zhu=' + '作业打卡&nei=小明同学按时交作业哦&item=语文&jiag=100&renshu=50'
            } else if (i == 3) {
              url = '../baoming' + i + '/baoming' + i + '?zhu=' + '鲜花&nei=产自云南香味芬芳，拼团更优惠&item=玫瑰花&jiag=100&renshu=50'
            } else if (i ==4) {
              url = '../baoming' + i + '/baoming' + i + '?zhu=' + '同学聚会&nei=大家好久没有聚在一起了，一起出来叙叙旧。&item=聚餐&jiag=100&renshu=50'
            } else if (i == 5) {
              url = '../baoming' + i + '/baoming' + i + '?zhu=' + '周末英语&nei=英语加国语，学习一定行&item=English&jiag=100&renshu=50'
            }
            wx: wx.navigateTo({
              url: url,
>>>>>>> 54d48f04859407805c17cf9b893d738ea041de9f
            })
          }
        }
      })
    }
    },
  }
})
